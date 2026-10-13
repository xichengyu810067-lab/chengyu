import { useState } from "react";
import { Link } from "react-router";
import { getSubject, hasTrack, loadTrack, parseContentId, SUBJECTS } from "../content/registry";
import type { Question } from "../content/types";
import { dateKey, seededRandom, shuffle } from "../lib/date";
import { useAsync } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { EmptyState, PageTitle, Spinner } from "../ui";
import QuestionRunner from "../widgets/QuestionRunner";

async function buildDaily(stage: "junior" | "senior", day: string): Promise<Question[]> {
  const rand = seededRandom(`${day}-${stage}`);
  const available = SUBJECTS.filter((s) => hasTrack(s.id, stage));
  const picked = shuffle(available, rand).slice(0, 3);
  const tracks = await Promise.all(picked.map((s) => loadTrack(s.id, stage)));
  const pool = tracks.flatMap((t) => shuffle(t.questions, rand).slice(0, 3));
  return shuffle(pool, rand).slice(0, 5);
}

export default function DailyPage() {
  const stage = useProgress((s) => s.profile.stage);
  const today = dateKey();
  const { data: questions, loading } = useAsync(
    () => buildDaily(stage, today),
    `${stage}-${today}`,
  );
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const recordDaily = useProgress((s) => s.recordDaily);
  const doneScore = useProgress((s) => s.daily[today]);
  const [result, setResult] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  if (loading) return <Spinner />;
  if (!questions?.length) {
    return (
      <EmptyState icon="📅" title="今天的挑戰還在準備中">
        <Link to="/" className="btn-primary mt-4">
          回首頁
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <PageTitle sub={`${today}・跨科隨機 5 題，每天更新。完成可得 30 XP！`}>⚡ 每日挑戰</PageTitle>
      {result !== null ? (
        <div className="card animate-pop space-y-3 p-6 text-center" data-testid="daily-done">
          <p className="text-5xl">{result === 5 ? "🏆" : result >= 3 ? "🌟" : "💪"}</p>
          <p className="text-xl font-bold">答對 {result} / 5 題</p>
          <p className="text-sm text-slate-500">明天再來挑戰新題目！答錯的題已加入錯題本。</p>
          <div className="flex justify-center gap-2">
            <Link to="/review" className="btn-secondary">
              📝 去錯題本
            </Link>
            <Link to="/" className="btn-primary">
              回首頁
            </Link>
          </div>
        </div>
      ) : !started ? (
        <div className="card space-y-3 p-6 text-center">
          {doneScore !== undefined && (
            <p className="chip mx-auto">今天已完成（答對 {doneScore} 題），可以再練一次</p>
          )}
          <p className="text-slate-600 dark:text-slate-300">
            今天的題目來自：
            {[...new Set(questions.map((q) => parseContentId(q.id)?.subject))]
              .map((s) => (s ? getSubject(s)?.name : ""))
              .join("、")}
          </p>
          <button
            type="button"
            className="btn-primary mx-auto"
            onClick={() => setStarted(true)}
            data-testid="daily-start"
          >
            開始挑戰
          </button>
        </div>
      ) : (
        <QuestionRunner
          questions={questions}
          labelFor={(q) => {
            const p = parseContentId(q.id);
            return p ? getSubject(p.subject)?.name : undefined;
          }}
          onAnswer={(q, ok) => recordAnswer(q.id, ok)}
          onDone={(c) => {
            recordDaily(c);
            setResult(c);
          }}
        />
      )}
    </div>
  );
}
