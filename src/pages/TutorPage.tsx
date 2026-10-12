import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { isStage, isSubjectId, SUBJECTS } from "../content/registry";
import { STAGE_LABEL, type Stage, type SubjectId } from "../content/types";
import {
  type AiError,
  aiErrorText,
  type ChatMessage,
  nonEmptyReply,
  prepareHistory,
  streamTutor,
  useAiStatus,
} from "../lib/ai";
import { useProgress } from "../lib/progress";
import { PageTitle, Spinner } from "../ui";
import ChatPanel, { type Bubble } from "../widgets/ChatPanel";

const STARTERS: Record<string, string[]> = {
  default: ["這個觀念我看不懂，可以舉例嗎？", "幫我出一題練習題", "可以用生活例子解釋嗎？"],
  math: ["為什麼負負得正？", "二次函數的頂點怎麼找？", "幫我出一題畢氏定理的題目"],
  english: [
    "現在完成式什麼時候用？",
    "Can we practice ordering food in English?",
    "幫我分辨 affect 和 effect",
  ],
  physics: ["為什麼會有浮力？", "牛頓第三定律的例子", "電壓和電流有什麼不同？"],
  chemistry: ["莫耳到底是什麼？", "酸鹼中和的原理", "怎麼平衡化學方程式？"],
  chinese: ["什麼是轉化修辭？", "〈出師表〉的重點是什麼？", "議論文怎麼寫論點？"],
};

export default function TutorPage() {
  const [params, setParams] = useSearchParams();
  const profileStage = useProgress((s) => s.profile.stage);
  const p = params.get("subject") ?? "math";
  const s = params.get("stage") ?? profileStage;
  const subject: SubjectId = isSubjectId(p) ? p : "math";
  const stage: Stage = isStage(s) ? s : profileStage;
  const status = useAiStatus();
  const accessCode = useProgress((st) => st.aiAccessCode);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [streaming, setStreaming] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const meta = SUBJECTS.find((x) => x.id === subject);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 換科目時清空對話
  useEffect(() => {
    abort.current?.abort();
    setMessages([]);
    setNotes([]);
  }, [subject, stage]);

  const send = async (text: string) => {
    const msgs: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(msgs);
    setStreaming("");
    abort.current = new AbortController();
    try {
      const full = await streamTutor(
        { mode: "tutor", subject, stage, messages: prepareHistory(msgs) },
        (_c, all) => setStreaming(all),
        abort.current.signal,
      );
      setMessages([...msgs, { role: "assistant", content: nonEmptyReply(full) }]);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      const err = e as AiError;
      setMessages(messages);
      setNotes((n) => [...n, `⚠️ ${err.message || aiErrorText(err.code)}`]);
    } finally {
      setStreaming(null);
    }
  };

  const bubbles: Bubble[] = [
    {
      role: "assistant",
      content: `嗨！我是你的${meta?.stageLabels[stage] ?? ""}AI 家教 👋\n\n我不會直接給答案，而是一步步問問題陪你想清楚。今天想弄懂什麼呢？`,
    },
    ...messages,
    ...notes.map((n) => ({ role: "note" as const, content: n })),
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <PageTitle sub="蘇格拉底式引導：用提問帶你自己想出答案。">🤖 AI 家教</PageTitle>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm">
          科目{" "}
          <select
            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900"
            value={subject}
            onChange={(e) => setParams({ subject: e.target.value, stage })}
          >
            {SUBJECTS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.icon} {x.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          學段{" "}
          <select
            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900"
            value={stage}
            onChange={(e) => setParams({ subject, stage: e.target.value })}
          >
            {(["junior", "senior"] as const).map((x) => (
              <option key={x} value={x}>
                {STAGE_LABEL[x]}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!status ? (
        <Spinner />
      ) : !status.available ? (
        <div className="card space-y-2 p-5 text-sm" data-testid="ai-unavailable">
          <p className="text-base font-bold">AI 家教尚未開啟</p>
          <p className="text-slate-600 dark:text-slate-300">
            網站管理者設定 AI 金鑰後就能使用。在那之前，可以先到各科課程中的「💬
            情境對話」用選項模式練習，或使用錯題本與闖關遊戲複習。
          </p>
          <Link to="/" className="btn-primary">
            去上課
          </Link>
        </div>
      ) : (
        <>
          {status.accessCodeRequired && !accessCode && (
            <p className="rounded-xl bg-amber-50 p-3 text-sm dark:bg-amber-950/40">
              🔑 需要老師提供的 AI 通行碼，請到{" "}
              <Link to="/me" className="underline">
                我的
              </Link>{" "}
              頁面輸入。
            </p>
          )}
          <ChatPanel
            bubbles={bubbles}
            streaming={streaming}
            aiName="AI 家教"
            onSend={send}
            disabled={streaming !== null}
            suggestions={
              messages.length === 0 ? (STARTERS[subject] ?? STARTERS.default) : undefined
            }
            placeholder="問一個學科問題…（Enter 送出，Shift+Enter 換行）"
            footer={
              <p className="text-xs text-slate-500">
                AI 回覆可能有誤，請與課本、老師確認。對話內容不會被儲存。請勿輸入個人資料。
              </p>
            }
          />
        </>
      )}
    </div>
  );
}
