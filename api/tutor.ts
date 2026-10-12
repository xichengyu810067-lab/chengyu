export function GET(): Response {
  return Response.json({ available: false, accessCodeRequired: false });
}

export function POST(): Response {
  return Response.json({ error: "ai_unavailable" }, { status: 503 });
}
