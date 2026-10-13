import { useState } from "react";
import { DEMO_ACTIVITIES, DEMO_QUESTIONS } from "../gallery/fixtures";
import { PageTitle } from "../ui";
import ActivityHost, { KIND_META } from "../widgets/ActivityHost";
import QuizGame from "../widgets/QuizGame";
import { RichText } from "../widgets/RichText";

export default function GalleryPage() {
  const [done, setDone] = useState<Record<string, number | true>>({});
  const [round, setRound] = useState(0);
  return (
    <div className="space-y-6">
      <PageTitle sub="這裡展示平台所有互動形式，每堂課會組合使用這些元件。">
        🧪 互動元件展示
      </PageTitle>
      <nav className="flex flex-wrap gap-2" aria-label="元件目錄">
        {DEMO_ACTIVITIES.map((a) => (
          <a
            key={a.id}
            href={`#demo-${a.id}`}
            className="chip hover:bg-brand-100 dark:hover:bg-brand-900"
          >
            {KIND_META[a.kind].icon} {a.title.split("：")[0]}
          </a>
        ))}
        <a href="#demo-game" className="chip hover:bg-brand-100 dark:hover:bg-brand-900">
          🎮 闖關遊戲
        </a>
      </nav>
      {DEMO_ACTIVITIES.map((a) => (
        <section
          key={a.id}
          id={`demo-${a.id}`}
          className="card scroll-mt-20 p-4 sm:p-6"
          data-testid={`demo-${a.id}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold">
              {KIND_META[a.kind].icon} {a.title}
            </h2>
            {done[a.id] !== undefined && (
              <span
                className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                data-testid={`done-${a.id}`}
              >
                ✅ 完成
                {typeof done[a.id] === "number"
                  ? `（${Math.round((done[a.id] as number) * 100)}%）`
                  : ""}
              </span>
            )}
          </div>
          {a.prompt && (
            <RichText text={a.prompt} className="mt-1 text-sm text-slate-600 dark:text-slate-300" />
          )}
          <div className="mt-4">
            <ActivityHost
              activity={a}
              done={false}
              onComplete={(s) => setDone((d) => ({ ...d, [a.id]: s ?? true }))}
              ctx={{
                subject: "math",
                stage: "junior",
                color: "#4f46e5",
                questions: DEMO_QUESTIONS,
              }}
            />
          </div>
        </section>
      ))}
      <section id="demo-game" className="card scroll-mt-20 p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">🎮 闖關小遊戲</h2>
        <QuizGame
          key={round}
          questions={DEMO_QUESTIONS}
          title="示範闖關"
          onRestart={() => setRound((r) => r + 1)}
        />
      </section>
    </div>
  );
}
