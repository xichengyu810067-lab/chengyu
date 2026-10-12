import type { Scenario } from "../../src/content/types.js";
import {
  type ChatMessage,
  checkAccessCode,
  checkOrigin,
  clientKey,
  HttpError,
  LIMITS,
  normalizeConversation,
  parseBody,
  type RateLimiter,
  type TutorBody,
} from "./guard.js";
import {
  CRISIS_REPLY,
  canvasSystem,
  detectCrisis,
  FINISH_INSTRUCTION,
  STABLE_SYSTEM,
  scenarioSystem,
  tutorSystem,
} from "./prompts.js";

export const DEFAULT_MODEL = "claude-opus-5-5";

type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "base64"; media_type: "image/png"; data: string } };

export interface TutorRequestParams {
  model: string;
  max_tokens: number;
  system: { type: "text"; text: string; cache_control?: { type: "ephemeral" } }[];
  messages: { role: "user" | "assistant"; content: string | ContentBlock[] }[];
}

/** SDK 串流的最小介面（方便測試時替換） */
export interface TextStream
  extends AsyncIterable<{ type: string; delta?: { type: string; text?: string } }> {
  finalMessage(): Promise<{ stop_reason: string | null }>;
}

export interface TutorEnv {
  ANTHROPIC_API_KEY?: string;
  TUTOR_MODEL?: string;
  AI_ACCESS_CODE?: string;
  ALLOWED_ORIGINS?: string;
}

export interface TutorDeps {
  env: TutorEnv;
  limiter: RateLimiter;
  findScenario: (id: string) => Scenario | undefined;
  openStream: (params: TutorRequestParams, signal: AbortSignal) => TextStream;
}

const json = (status: number, body: unknown) =>
  Response.json(body, { status, headers: { "cache-control": "no-store" } });

export function buildRequest(
  body: TutorBody,
  findScenario: TutorDeps["findScenario"],
  model: string,
): TutorRequestParams {
  const stable = {
    type: "text" as const,
    text: STABLE_SYSTEM,
    cache_control: { type: "ephemeral" as const },
  };
  if (body.mode === "scenario") {
    const scenario = findScenario(body.scenarioId);
    if (!scenario) throw new HttpError(404, "bad_request", "找不到這個情境");
    let messages: ChatMessage[] = body.messages;
    if (body.finish) messages = [...messages, { role: "user", content: FINISH_INSTRUCTION }];
    return {
      model,
      max_tokens: 3000,
      system: [stable, { type: "text", text: scenarioSystem(scenario) }],
      messages: normalizeConversation(
        messages,
        scenario.language === "en" ? "(The student enters the scene.)" : "（學生進入情境）",
      ),
    };
  }
  if (body.mode === "tutor") {
    return {
      model,
      max_tokens: 3000,
      system: [stable, { type: "text", text: tutorSystem(body.subject, body.stage) }],
      messages: normalizeConversation(body.messages),
    };
  }
  return {
    model,
    max_tokens: 2000,
    system: [stable, { type: "text", text: canvasSystem(body.subject, body.stage) }],
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/png", data: body.image } },
          { type: "text", text: `我的任務：${body.task}\n請看看我的畫布作品並給我回饋。` },
        ],
      },
    ],
  };
}

function lastUserText(body: TutorBody): string {
  if (body.mode === "canvas") return body.task;
  const users = body.messages.filter((m) => m.role === "user");
  return users[users.length - 1]?.content ?? "";
}

const encoder = new TextEncoder();
const line = (o: unknown) => encoder.encode(`${JSON.stringify(o)}\n`);

function ndjson(stream: ReadableStream<Uint8Array>) {
  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}

export function createTutorHandler(deps: TutorDeps) {
  const GET = () =>
    json(200, {
      available: Boolean(deps.env.ANTHROPIC_API_KEY),
      accessCodeRequired: Boolean(deps.env.AI_ACCESS_CODE),
    });

  const POST = async (req: Request): Promise<Response> => {
    try {
      if (!deps.env.ANTHROPIC_API_KEY)
        throw new HttpError(503, "ai_unavailable", "AI 家教目前尚未開啟。");
      checkOrigin(req, deps.env.ALLOWED_ORIGINS);
      checkAccessCode(req, deps.env.AI_ACCESS_CODE);
      const len = Number(req.headers.get("content-length") ?? 0);
      if (len > LIMITS.maxBodyBytes) throw new HttpError(413, "too_large", "內容太大了。");
      const text = await req.text();
      if (text.length > LIMITS.maxBodyBytes) throw new HttpError(413, "too_large", "內容太大了。");
      let raw: unknown;
      try {
        raw = JSON.parse(text);
      } catch {
        throw new HttpError(400, "bad_request", "請求不是有效的 JSON");
      }
      const body = parseBody(raw);

      // 危機訊息：不呼叫模型，直接提供求助資訊
      if (detectCrisis(lastUserText(body))) {
        return ndjson(
          new ReadableStream({
            start(c) {
              c.enqueue(line({ t: "text", v: CRISIS_REPLY }));
              c.enqueue(line({ t: "done", stop: "crisis" }));
              c.close();
            },
          }),
        );
      }

      const params = buildRequest(body, deps.findScenario, deps.env.TUTOR_MODEL || DEFAULT_MODEL);
      deps.limiter.take(clientKey(req));
      const abort = new AbortController();
      req.signal?.addEventListener("abort", () => abort.abort());
      const upstream = deps.openStream(params, abort.signal);

      return ndjson(
        new ReadableStream({
          async start(c) {
            try {
              for await (const ev of upstream) {
                if (
                  ev.type === "content_block_delta" &&
                  ev.delta?.type === "text_delta" &&
                  ev.delta.text
                ) {
                  c.enqueue(line({ t: "text", v: ev.delta.text }));
                }
              }
              const final = await upstream.finalMessage();
              if (final.stop_reason === "refusal") {
                c.enqueue(
                  line({
                    t: "error",
                    code: "refusal",
                    message: "這個問題我沒辦法回答，換個學科問題試試看吧！",
                  }),
                );
              } else if (final.stop_reason === "max_tokens") {
                c.enqueue(line({ t: "text", v: "\n\n（回覆太長被截斷了，可以請我說得更精簡。）" }));
              }
              c.enqueue(line({ t: "done", stop: final.stop_reason }));
            } catch (e) {
              if (!abort.signal.aborted) {
                console.error("[tutor] upstream error", (e as Error).name, (e as Error).message);
                c.enqueue(
                  line({ t: "error", code: "upstream", message: "AI 服務暫時忙碌，請稍後再試。" }),
                );
              }
            } finally {
              c.close();
            }
          },
          cancel() {
            abort.abort();
          },
        }),
      );
    } catch (e) {
      if (e instanceof HttpError) return json(e.status, { error: e.code, message: e.message });
      console.error("[tutor] unexpected", e);
      return json(500, { error: "upstream", message: "伺服器發生錯誤。" });
    }
  };

  return { GET, POST };
}
