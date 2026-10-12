/**
 * AI 家教 API 客戶端。伺服器以 NDJSON 串流回傳：
 *   {"t":"text","v":"..."}  文字片段
 *   {"t":"done"}             結束
 *   {"t":"error","code":"...","message":"..."}
 */
import { useEffect, useState } from "react";
import type { Stage, SubjectId } from "../content/types";
import { useProgress } from "./progress";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AiStatus {
  available: boolean;
  accessCodeRequired: boolean;
}

export type TutorRequest =
  | { mode: "scenario"; scenarioId: string; messages: ChatMessage[]; finish?: boolean }
  | { mode: "tutor"; subject: SubjectId; stage: Stage; messages: ChatMessage[] }
  | {
      mode: "canvas";
      subject?: SubjectId;
      stage?: Stage;
      task: string;
      image: string;
      note?: string;
    };

export class AiError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

const ERROR_TEXT: Record<string, string> = {
  ai_unavailable: "AI 家教目前尚未開啟，先用腳本模式練習吧！",
  access_code: "需要老師提供的 AI 通行碼，請到「我的」頁面輸入。",
  rate_limited: "使用太頻繁了，休息一下再試。",
  too_large: "內容太長了，請精簡後再試。",
  bad_request: "請求格式有誤。",
  crisis: "",
  refusal: "這個問題 AI 無法回答，換個學科問題試試看。",
  network: "網路連線不穩，請稍後再試。",
  upstream: "AI 服務暫時忙碌，請稍後再試。",
};

export function aiErrorText(code: string, fallback?: string) {
  return ERROR_TEXT[code] || fallback || "發生錯誤，請稍後再試。";
}

let statusPromise: Promise<AiStatus> | null = null;

export function fetchAiStatus(): Promise<AiStatus> {
  if (!statusPromise) {
    statusPromise = fetch("/api/tutor", { headers: { accept: "application/json" } })
      .then(async (r) => {
        if (!r.ok || !r.headers.get("content-type")?.includes("json")) throw new Error("no api");
        const j = (await r.json()) as Partial<AiStatus>;
        return {
          available: Boolean(j.available),
          accessCodeRequired: Boolean(j.accessCodeRequired),
        };
      })
      .catch(() => ({ available: false, accessCodeRequired: false }));
  }
  return statusPromise;
}

export function useAiStatus(): AiStatus | null {
  const [s, setS] = useState<AiStatus | null>(null);
  useEffect(() => {
    let alive = true;
    fetchAiStatus().then((x) => alive && setS(x));
    return () => {
      alive = false;
    };
  }, []);
  return s;
}

/** 呼叫 AI，逐段回呼文字；回傳完整文字 */
export async function streamTutor(
  req: TutorRequest,
  onText: (chunk: string, full: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const code = useProgress.getState().aiAccessCode;
  let res: Response;
  try {
    res = await fetch("/api/tutor", {
      method: "POST",
      headers: { "content-type": "application/json", ...(code ? { "x-access-code": code } : {}) },
      body: JSON.stringify(req),
      signal,
    });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new AiError("network", aiErrorText("network"));
  }
  if (!res.ok || !res.body) {
    let errCode =
      res.status === 503 ? "ai_unavailable" : res.status === 429 ? "rate_limited" : "upstream";
    let message = "";
    try {
      const j = (await res.json()) as { error?: string; message?: string };
      if (j.error) errCode = j.error;
      message = j.message ?? "";
    } catch {
      /* 非 JSON */
    }
    throw new AiError(errCode, message || aiErrorText(errCode));
  }
  useProgress.getState().bumpAiUsage();
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let full = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl = buf.indexOf("\n");
    while (nl >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      nl = buf.indexOf("\n");
      if (!line) continue;
      let evt: { t: string; v?: string; code?: string; message?: string };
      try {
        evt = JSON.parse(line);
      } catch {
        continue;
      }
      if (evt.t === "text" && evt.v) {
        full += evt.v;
        onText(evt.v, full);
      } else if (evt.t === "error") {
        throw new AiError(
          evt.code ?? "upstream",
          evt.message || aiErrorText(evt.code ?? "upstream"),
        );
      }
    }
  }
  return full;
}
