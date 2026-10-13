import Anthropic from "@anthropic-ai/sdk";
import { findScenario } from "../src/content/scenarios.server.js";
import { RateLimiter } from "./_lib/guard.js";
import { createTutorHandler, type TextStream } from "./_lib/handler.js";

const env = {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  TUTOR_MODEL: process.env.TUTOR_MODEL,
  AI_ACCESS_CODE: process.env.AI_ACCESS_CODE,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
};

const limiter = new RateLimiter({
  burst: Number(process.env.AI_BURST ?? 8),
  refillPerMinute: Number(process.env.AI_REFILL_PER_MINUTE ?? 2),
  perDay: Number(process.env.AI_DAILY_LIMIT ?? 60),
  globalPerDay: Number(process.env.AI_GLOBAL_DAILY_LIMIT ?? 3000),
});

let client: Anthropic | null = null;

const handler = createTutorHandler({
  env,
  limiter,
  findScenario,
  openStream: (params, signal) => {
    client ??= new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 55_000 });
    return client.beta.messages.stream(
      {
        ...params,
        // 自動快取：固定的系統提示＋對話前綴可重複利用
        cache_control: { type: "ephemeral" },
        output_config: { effort: "low" },
        // 安全分類器婉拒時，由伺服器自動改用建議的備援模型
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      },
      { signal },
    ) as unknown as TextStream;
  },
});

export const GET = handler.GET;
export const POST = handler.POST;
