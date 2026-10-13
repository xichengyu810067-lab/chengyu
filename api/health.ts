import { ALL_SCENARIOS } from "../src/content/scenarios.server.js";

export function GET(): Response {
  return Response.json(
    {
      ok: true,
      scenarios: ALL_SCENARIOS.length,
      ai: Boolean(process.env.ANTHROPIC_API_KEY),
      time: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
