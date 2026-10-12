// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { RateLimiter } from "../../api/_lib/guard";
import {
  createTutorHandler,
  type TextStream,
  type TutorRequestParams,
} from "../../api/_lib/handler";
import { findScenario } from "../../src/content/scenarios.server";

function fakeStream(texts: string[], stop: string | null = "end_turn"): TextStream {
  return {
    async *[Symbol.asyncIterator]() {
      for (const t of texts)
        yield { type: "content_block_delta", delta: { type: "text_delta", text: t } };
    },
    finalMessage: async () => ({ stop_reason: stop }),
  };
}

function setup(
  opts: {
    key?: string;
    code?: string;
    texts?: string[];
    stop?: string | null;
    perDay?: number;
  } = {},
) {
  const calls: TutorRequestParams[] = [];
  const openStream = vi.fn((p: TutorRequestParams) => {
    calls.push(p);
    return fakeStream(opts.texts ?? ["你好", "！"], opts.stop);
  });
  const handler = createTutorHandler({
    env: { ANTHROPIC_API_KEY: "key" in opts ? opts.key : "sk-test", AI_ACCESS_CODE: opts.code },
    limiter: new RateLimiter({
      burst: 3,
      refillPerMinute: 0,
      perDay: opts.perDay ?? 100,
      globalPerDay: 1000,
    }),
    findScenario,
    openStream,
  });
  return { handler, calls, openStream };
}

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://lp.example/api/tutor", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://lp.example",
      host: "lp.example",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function readNdjson(res: Response) {
  const text = await res.text();
  return text
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l) as { t: string; v?: string; code?: string });
}

const tutorBody = {
  mode: "tutor",
  subject: "math",
  stage: "junior",
  messages: [{ role: "user", content: "什麼是質數？" }],
};

describe("AI 家教 API", () => {
  it("GET 回報是否可用", async () => {
    const { handler } = setup({ code: "abc" });
    expect(await handler.GET().json()).toEqual({ available: true, accessCodeRequired: true });
    const off = setup({ key: undefined });
    expect(await off.handler.GET().json()).toEqual({ available: false, accessCodeRequired: false });
  });

  it("沒有金鑰時回 503", async () => {
    const { handler } = setup({ key: undefined });
    const res = await handler.POST(post(tutorBody));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("ai_unavailable");
  });

  it("拒絕其他網域來源", async () => {
    const { handler, openStream } = setup();
    expect((await handler.POST(post(tutorBody, { origin: "https://evil.example" }))).status).toBe(
      403,
    );
    const noOrigin = new Request("https://lp.example/api/tutor", {
      method: "POST",
      body: JSON.stringify(tutorBody),
    });
    expect((await handler.POST(noOrigin)).status).toBe(403);
    expect(openStream).not.toHaveBeenCalled();
  });

  it("需要通行碼時檢查 x-access-code", async () => {
    const { handler } = setup({ code: "class-2026" });
    expect((await handler.POST(post(tutorBody))).status).toBe(401);
    expect((await handler.POST(post(tutorBody, { "x-access-code": "class-2026" }))).status).toBe(
      200,
    );
  });

  it("驗證輸入：格式錯誤 400、過長 413", async () => {
    const { handler } = setup();
    expect((await handler.POST(post("not json"))).status).toBe(400);
    expect(
      (await handler.POST(post({ mode: "tutor", subject: "xx", stage: "junior", messages: [] })))
        .status,
    ).toBe(400);
    const long = { ...tutorBody, messages: [{ role: "user", content: "字".repeat(601) }] };
    expect((await handler.POST(post(long))).status).toBe(413);
    const many = {
      ...tutorBody,
      messages: Array.from({ length: 17 }, (_, i) => ({
        role: i % 2 ? "assistant" : "user",
        content: "hi",
      })),
    };
    expect((await handler.POST(post(many))).status).toBe(413);
  });

  it("串流回傳 NDJSON，系統提示有快取標記", async () => {
    const { handler, calls } = setup({ texts: ["質數是", "只有 1 和自己兩個因數的數。"] });
    const res = await handler.POST(post(tutorBody));
    expect(res.headers.get("content-type")).toContain("ndjson");
    const evts = await readNdjson(res);
    expect(
      evts
        .filter((e) => e.t === "text")
        .map((e) => e.v)
        .join(""),
    ).toBe("質數是只有 1 和自己兩個因數的數。");
    expect(evts.at(-1)?.t).toBe("done");
    expect(calls[0].model).toBe("claude-opus-5-5");
    expect(calls[0].system[0].cache_control).toEqual({ type: "ephemeral" });
    expect(calls[0].system[1].text).toContain("國中");
  });

  it("情境模式：開場白由 AI 開始時補上使用者訊息，結束時加入回饋指示", async () => {
    const { handler, calls } = setup();
    const body = {
      mode: "scenario",
      scenarioId: "math.junior.s-market",
      messages: [
        { role: "assistant", content: "來來來！同學要買什麼？" },
        { role: "user", content: "蘋果怎麼賣？" },
      ],
    };
    await (await handler.POST(post(body))).text();
    expect(calls[0].messages[0].role).toBe("user");
    expect(calls[0].messages.map((m) => m.role)).toEqual(["user", "assistant", "user"]);
    expect(calls[0].system[1].text).toContain("水果攤阿姨");

    await (
      await handler.POST(
        post({
          ...body,
          finish: true,
          messages: [...body.messages, { role: "assistant", content: "25 元" }],
        }),
      )
    ).text();
    const last = calls[1].messages.at(-1);
    expect(last?.role).toBe("user");
    expect(String(last?.content)).toContain("回饋");
  });

  it("不存在的情境回 404", async () => {
    const { handler } = setup();
    const res = await handler.POST(
      post({
        mode: "scenario",
        scenarioId: "math.junior.s-nope",
        messages: [{ role: "user", content: "hi" }],
      }),
    );
    expect(res.status).toBe(404);
  });

  it("危機關鍵字直接回覆求助資訊，不呼叫模型", async () => {
    const { handler, openStream } = setup();
    const res = await handler.POST(
      post({ ...tutorBody, messages: [{ role: "user", content: "我覺得好累，不想活了" }] }),
    );
    const evts = await readNdjson(res);
    expect(evts[0].v).toContain("1925");
    expect(openStream).not.toHaveBeenCalled();
  });

  it("refusal 轉成友善的錯誤事件", async () => {
    const { handler } = setup({ texts: [], stop: "refusal" });
    const evts = await readNdjson(await handler.POST(post(tutorBody)));
    expect(evts.some((e) => e.t === "error" && e.code === "refusal")).toBe(true);
  });

  it("限流：短時間太多次回 429", async () => {
    const { handler } = setup();
    for (let i = 0; i < 3; i++)
      await (await handler.POST(post(tutorBody, { "x-forwarded-for": "1.2.3.4" }))).text();
    const res = await handler.POST(post(tutorBody, { "x-forwarded-for": "1.2.3.4" }));
    expect(res.status).toBe(429);
    const other = await handler.POST(post(tutorBody, { "x-forwarded-for": "5.6.7.8" }));
    expect(other.status).toBe(200);
  });

  it("畫布模式附上圖片", async () => {
    const { handler, calls } = setup();
    await (
      await handler.POST(post({ mode: "canvas", task: "畫出 y = 2x - 1", image: "iVBORw0KGgo=" }))
    ).text();
    const content = calls[0].messages[0].content;
    expect(Array.isArray(content) && content[0].type).toBe("image");
  });
});
