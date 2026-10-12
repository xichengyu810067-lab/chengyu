import { useEffect, useRef, useState } from "react";
import { loadScenario } from "../content/registry";
import type { DialogueActivity, Scenario } from "../content/types";
import {
  type AiError,
  aiErrorText,
  type ChatMessage,
  nonEmptyReply,
  prepareHistory,
  streamTutor,
  useAiStatus,
} from "../lib/ai";
import { useAsync } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { Spinner } from "../ui";
import ChatPanel, { type Bubble } from "./ChatPanel";
import { CompleteBar } from "./kit";
import { Rich } from "./RichText";
import type { WidgetProps } from "./types";

export default function Dialogue({
  activity,
  done,
  onComplete,
  ctx,
}: WidgetProps<DialogueActivity>) {
  const { data: scenario, loading } = useAsync(
    () => loadScenario(activity.scenarioId),
    activity.scenarioId,
  );
  const status = useAiStatus();
  const [mode, setMode] = useState<"ai" | "script" | null>(null);
  const bumpUsage = useProgress((s) => s.bumpUsage);

  if (loading || !status) return <Spinner />;
  if (!scenario)
    return <p className="text-sm text-rose-600">找不到這個對話情境（{activity.scenarioId}）。</p>;
  const current = mode ?? (status.available ? "ai" : "script");

  const complete = (score?: number) => {
    bumpUsage("dialogue");
    onComplete(score);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-slate-100 p-4 text-sm dark:bg-slate-800">
        <p className="text-base font-bold">
          {scenario.aiAvatar ?? "🎭"} {scenario.title}
        </p>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          <Rich text={scenario.setting} />
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="chip">你：{scenario.userRole}</span>
          <span className="chip">對方：{scenario.aiRole}</span>
          <span className="chip">
            🎯 <Rich text={scenario.goal} />
          </span>
        </div>
      </div>
      <fieldset className="flex w-fit rounded-lg bg-slate-100 p-0.5 text-sm dark:bg-slate-800">
        <legend className="sr-only">對話模式</legend>
        <button
          type="button"
          aria-pressed={current === "ai"}
          disabled={!status.available}
          onClick={() => setMode("ai")}
          className={`rounded-md px-3 py-1 ${current === "ai" ? "bg-white font-semibold shadow-sm dark:bg-slate-950" : "text-slate-500"}`}
          title={status.available ? undefined : "AI 家教尚未開啟"}
        >
          🤖 AI 自由對話
        </button>
        <button
          type="button"
          aria-pressed={current === "script"}
          onClick={() => setMode("script")}
          className={`rounded-md px-3 py-1 ${current === "script" ? "bg-white font-semibold shadow-sm dark:bg-slate-950" : "text-slate-500"}`}
        >
          📜 選項練習
        </button>
      </fieldset>
      {current === "ai" ? (
        <AiDialogue
          key="ai"
          scenario={scenario}
          done={done}
          onComplete={complete}
          onFallback={() => setMode("script")}
          color={ctx.color}
        />
      ) : (
        <ScriptDialogue key="script" scenario={scenario} done={done} onComplete={complete} />
      )}
    </div>
  );
}

function ScriptDialogue({
  scenario,
  done,
  onComplete,
}: {
  scenario: Scenario;
  done: boolean;
  onComplete: (s?: number) => void;
}) {
  const [nodeId, setNodeId] = useState(scenario.start);
  const [bubbles, setBubbles] = useState<Bubble[]>([
    { role: "assistant", content: scenario.script[scenario.start]?.say ?? "" },
  ]);
  const [good, setGood] = useState(0);
  const [choices, setChoices] = useState(0);
  const [finished, setFinished] = useState(false);
  const node = scenario.script[nodeId];

  const choose = (idx: number) => {
    const opt = node?.options?.[idx];
    if (!opt) return;
    const next = scenario.script[opt.next];
    const add: Bubble[] = [{ role: "user", content: opt.label, rich: true }];
    if (opt.feedback)
      add.push({
        role: "note",
        content: `${opt.good ? "👍 " : opt.good === false ? "💡 " : ""}${opt.feedback}`,
      });
    if (next) add.push({ role: "assistant", content: next.say });
    setBubbles((b) => [...b, ...add]);
    setChoices((c) => c + 1);
    if (opt.good !== false) setGood((g) => g + 1);
    setNodeId(opt.next);
    if (!next || next.end || !next.options?.length) setFinished(true);
  };

  const score = choices ? good / choices : 1;
  return (
    <ChatPanel
      bubbles={bubbles}
      aiName={scenario.aiRole}
      aiAvatar={scenario.aiAvatar}
      footer={
        finished ? (
          <div className="space-y-2">
            <p className="text-sm">
              🏁 對話結束！你做了 {choices} 次選擇，其中 {good} 次是好的回應。
            </p>
            <CompleteBar done={done} onComplete={() => onComplete(score)} label="完成這段對話" />
          </div>
        ) : (
          <div className="grid gap-2" data-testid="script-options">
            <p className="text-xs text-slate-500">選擇你的回應：</p>
            {node?.options?.map((o, i) => (
              <button
                key={i}
                type="button"
                className="rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-sm hover:border-brand-400 dark:border-slate-700"
                onClick={() => choose(i)}
              >
                <Rich text={o.label} />
              </button>
            ))}
          </div>
        )
      }
    />
  );
}

function AiDialogue({
  scenario,
  done,
  onComplete,
  onFallback,
  color,
}: {
  scenario: Scenario;
  done: boolean;
  onComplete: (s?: number) => void;
  onFallback: () => void;
  color: string;
}) {
  const opening = scenario.script[scenario.start]?.say ?? "";
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: opening },
  ]);
  const [notes, setNotes] = useState<{ at: number; text: string }[]>([]);
  const [streaming, setStreaming] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const maxTurns = Math.min(scenario.maxTurns ?? 8, 9);
  const userTurns = messages.filter((m) => m.role === "user").length;

  useEffect(() => () => abort.current?.abort(), []);

  const run = async (msgs: ChatMessage[], finish = false) => {
    abort.current = new AbortController();
    setStreaming("");
    try {
      const full = await streamTutor(
        { mode: "scenario", scenarioId: scenario.id, messages: prepareHistory(msgs), finish },
        (_c, all) => setStreaming(all),
        abort.current.signal,
      );
      setMessages([...msgs, { role: "assistant", content: nonEmptyReply(full) }]);
      if (finish) setFinished(true);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      const err = e as AiError;
      // 送出失敗：把剛剛那句移除，避免對話出現連續兩則使用者訊息
      const kept = finish ? msgs : msgs.slice(0, -1);
      setMessages(kept);
      setNotes((n) => [
        ...n,
        { at: kept.length, text: `⚠️ ${err.message || aiErrorText(err.code)}` },
      ]);
      if (err.code === "ai_unavailable") setTimeout(onFallback, 1500);
    } finally {
      setStreaming(null);
    }
  };

  const send = (text: string) => {
    const msgs: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(msgs);
    void run(msgs);
  };

  const bubbles: Bubble[] = [];
  messages.forEach((m, i) => {
    for (const n of notes) if (n.at === i) bubbles.push({ role: "note", content: n.text });
    bubbles.push(m);
  });
  for (const n of notes)
    if (n.at >= messages.length) bubbles.push({ role: "note", content: n.text });

  const busy = streaming !== null;
  return (
    <ChatPanel
      bubbles={bubbles}
      streaming={streaming}
      aiName={scenario.aiRole}
      aiAvatar={scenario.aiAvatar}
      onSend={finished || userTurns >= maxTurns ? undefined : send}
      disabled={busy}
      suggestions={userTurns === 0 ? scenario.suggestions : undefined}
      placeholder={scenario.language === "en" ? "Type in English…" : "輸入你想說的話…"}
      footer={
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>
            回合 {userTurns}/{maxTurns}　·　AI 回覆可能有誤，請以課本為準
          </span>
          {!finished && userTurns >= 2 && (
            <button
              type="button"
              className="btn-secondary ml-auto min-h-8 py-1"
              disabled={busy}
              onClick={() => run(messages, true)}
              style={{ borderColor: color }}
            >
              結束對話並看回饋
            </button>
          )}
          {finished && (
            <span className="ml-auto">
              <CompleteBar done={done} onComplete={() => onComplete(1)} label="完成這段對話" />
            </span>
          )}
        </div>
      }
    />
  );
}
