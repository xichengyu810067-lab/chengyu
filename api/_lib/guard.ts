import { timingSafeEqual } from "node:crypto";
import { type Stage, SUBJECT_IDS, type SubjectId } from "../../src/content/types.js";

export const LIMITS = {
  maxBodyBytes: 2_000_000,
  maxMessages: 24,
  maxUserChars: 600,
  maxAssistantChars: 8000,
  maxImageBytes: 1_500_000,
  maxTaskChars: 300,
};

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type TutorBody =
  | { mode: "scenario"; scenarioId: string; messages: ChatMessage[]; finish: boolean }
  | { mode: "tutor"; subject: SubjectId; stage: Stage; messages: ChatMessage[] }
  | { mode: "canvas"; task: string; image: string; subject?: SubjectId; stage?: Stage };

export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

const isStage = (s: unknown): s is Stage => s === "junior" || s === "senior";
const isSubject = (s: unknown): s is SubjectId =>
  typeof s === "string" && (SUBJECT_IDS as readonly string[]).includes(s);

function parseMessages(v: unknown, allowEndWithAssistant: boolean): ChatMessage[] {
  if (!Array.isArray(v) || v.length === 0)
    throw new HttpError(400, "bad_request", "messages 必須是非空陣列");
  if (v.length > LIMITS.maxMessages)
    throw new HttpError(413, "too_large", "對話太長了，請開始新的對話。");
  const out: ChatMessage[] = [];
  for (const m of v) {
    if (!m || typeof m !== "object") throw new HttpError(400, "bad_request", "訊息格式錯誤");
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      throw new HttpError(400, "bad_request", "訊息格式錯誤");
    }
    const text = content.trim();
    if (!text) throw new HttpError(400, "bad_request", "訊息不可為空");
    const max = role === "user" ? LIMITS.maxUserChars : LIMITS.maxAssistantChars;
    if (text.length > max) throw new HttpError(413, "too_large", "訊息太長了，請精簡後再試。");
    out.push({ role, content: text });
  }
  if (!allowEndWithAssistant && out[out.length - 1].role !== "user") {
    throw new HttpError(400, "bad_request", "最後一則訊息必須是學生的發言");
  }
  return out;
}

export function parseBody(raw: unknown): TutorBody {
  if (!raw || typeof raw !== "object") throw new HttpError(400, "bad_request", "請求格式錯誤");
  const b = raw as Record<string, unknown>;
  if (b.mode === "scenario") {
    if (typeof b.scenarioId !== "string" || b.scenarioId.length > 120) {
      throw new HttpError(400, "bad_request", "缺少 scenarioId");
    }
    const finish = b.finish === true;
    return {
      mode: "scenario",
      scenarioId: b.scenarioId,
      messages: parseMessages(b.messages, finish),
      finish,
    };
  }
  if (b.mode === "tutor") {
    if (!isSubject(b.subject) || !isStage(b.stage))
      throw new HttpError(400, "bad_request", "科目或學段錯誤");
    return {
      mode: "tutor",
      subject: b.subject,
      stage: b.stage,
      messages: parseMessages(b.messages, false),
    };
  }
  if (b.mode === "canvas") {
    if (typeof b.image !== "string" || !/^[A-Za-z0-9+/=]+$/.test(b.image)) {
      throw new HttpError(400, "bad_request", "圖片格式錯誤");
    }
    if ((b.image.length * 3) / 4 > LIMITS.maxImageBytes)
      throw new HttpError(413, "too_large", "圖片太大了。");
    const task =
      typeof b.task === "string" ? b.task.trim().slice(0, LIMITS.maxTaskChars) : "自由創作";
    return {
      mode: "canvas",
      task: task || "自由創作",
      image: b.image,
      subject: isSubject(b.subject) ? b.subject : undefined,
      stage: isStage(b.stage) ? b.stage : undefined,
    };
  }
  throw new HttpError(400, "bad_request", "未知的模式");
}

/** API 要求訊息由使用者開始、且角色交替：補上開頭並合併連續同角色訊息 */
export function normalizeConversation(
  messages: ChatMessage[],
  opener = "（開始對話）",
): ChatMessage[] {
  const seq =
    messages[0]?.role === "assistant"
      ? [{ role: "user" as const, content: opener }, ...messages]
      : messages;
  const out: ChatMessage[] = [];
  for (const m of seq) {
    const last = out[out.length - 1];
    if (last && last.role === m.role) last.content = `${last.content}\n\n${m.content}`;
    else out.push({ ...m });
  }
  return out;
}

/* ───────── 來源檢查 ───────── */

export function checkOrigin(req: Request, allowed?: string): void {
  const origin = req.headers.get("origin");
  if (!origin) throw new HttpError(403, "forbidden", "不允許的來源");
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    throw new HttpError(403, "forbidden", "不允許的來源");
  }
  const selfHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const extra = (allowed ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (host !== selfHost && !extra.includes(origin) && !extra.includes(host)) {
    throw new HttpError(403, "forbidden", "不允許的來源");
  }
}

export function checkAccessCode(req: Request, expected?: string): void {
  if (!expected) return;
  const got = req.headers.get("x-access-code") ?? "";
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new HttpError(401, "access_code", "需要正確的 AI 通行碼");
  }
}

/* ───────── 盡力而為的限流（每個 function 執行個體各自計算） ───────── */

interface Bucket {
  tokens: number;
  updated: number;
  day: string;
  dayCount: number;
}

export class RateLimiter {
  private buckets = new Map<string, Bucket>();
  private globalDay = "";
  private globalCount = 0;

  constructor(
    private opts: { burst: number; refillPerMinute: number; perDay: number; globalPerDay: number },
    private now: () => number = Date.now,
  ) {}

  take(key: string): void {
    const t = this.now();
    const day = new Date(t + 8 * 3600_000).toISOString().slice(0, 10); // 臺北日期
    if (this.globalDay !== day) {
      this.globalDay = day;
      this.globalCount = 0;
    }
    if (this.globalCount >= this.opts.globalPerDay) {
      throw new HttpError(429, "rate_limited", "今天的 AI 使用量已達上限，明天再來吧！");
    }
    let b = this.buckets.get(key);
    if (!b || b.day !== day) {
      b = { tokens: this.opts.burst, updated: t, day, dayCount: 0 };
      this.buckets.set(key, b);
    }
    b.tokens = Math.min(
      this.opts.burst,
      b.tokens + ((t - b.updated) / 60_000) * this.opts.refillPerMinute,
    );
    b.updated = t;
    if (b.dayCount >= this.opts.perDay)
      throw new HttpError(429, "rate_limited", "你今天已經問了很多問題，明天再繼續吧！");
    if (b.tokens < 1) throw new HttpError(429, "rate_limited", "問得太快了，休息一下再試。");
    b.tokens -= 1;
    b.dayCount += 1;
    this.globalCount += 1;
    if (this.buckets.size > 5000) {
      for (const [k, v] of this.buckets) if (v.day !== day) this.buckets.delete(k);
    }
  }
}

export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}
