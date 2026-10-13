import { useMemo, useState } from "react";
import { Link } from "react-router";
import { getSubject, loadQuestions, parseContentId } from "../content/registry";
import type { Question } from "../content/types";
import { dateKey } from "../lib/date";
import { dueReviewIds, REVIEW_INTERVALS } from "../lib/gamification";
import { useAsync } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { EmptyState, PageTitle, Spinner } from "../ui";
import QuestionRunner from "../widgets/QuestionRunner";
import { Rich } from "../widgets/RichText";

export default function ReviewPage() {
  const review = useProgress((s) => s.review);
  const mastered = useProgress((s) => s.mastered);
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const removeReview = useProgress((s) => s.removeReview);
  // 開始複習時固定題目清單，避免題目畢業後清單變動導致重來
  const [session, setSession] = useState<Question[] | null>(null);
  const [result, setResult] = useState<{ c: number; t: number } | null>(null);
  const today = dateKey();
  const due = useMemo(() => dueReviewIds(review, today), [review, today]);
  const allIds = useMemo(() => Object.keys(review).sort(), [review]);
  const { data: qmap, loading } = useAsync(() => loadQuestions(allIds), allIds.join("|"));

  if (loading && !qmap) return <Spinner />;

  const start = (ids: string[]) => {
    if (!qmap) return;
    setResult(null);
    setSession(ids.map((id) => qmap.get(id)).filter((q) => q !== undefined));
  };

  if (session) {
    const qs = session;
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <PageTitle sub="答對會延後下次複習時間；連續答對 5 次就畢業！">📝 錯題複習</PageTitle>
        {result ? (
          <div className="card space-y-3 p-6 text-center">
            <p className="text-5xl">🛡️</p>
            <p className="text-lg font-bold">
              複習完成：答對 {result.c} / {result.t}
            </p>
            <button
              type="button"
              className="btn-primary mx-auto"
              onClick={() => {
                setSession(null);
                setResult(null);
              }}
            >
              回錯題本
            </button>
          </div>
        ) : (
          <QuestionRunner
            questions={qs}
            labelFor={(q) => {
              const p = parseContentId(q.id);
              return p ? getSubject(p.subject)?.name : undefined;
            }}
            onAnswer={(q, ok) => recordAnswer(q.id, ok, { review: true })}
            onDone={(c, t) => setResult({ c, t })}
          />
        )}
      </div>
    );
  }

  if (allIds.length === 0) {
    return (
      <div className="space-y-4">
        <PageTitle>📝 錯題本</PageTitle>
        <EmptyState icon="🌈" title="目前沒有錯題">
          <p>練習題、闖關或每日挑戰答錯的題目會自動收進這裡，並依遺忘曲線安排複習。</p>
          {mastered > 0 && <p className="mt-2">已經有 {mastered} 題成功畢業 🎓</p>}
          <Link to="/daily" className="btn-primary mt-4">
            去做每日挑戰
          </Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageTitle sub="依間隔重複（1→3→7→14→30 天）安排複習，把不會的變成會的。">
        📝 錯題本
      </PageTitle>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-sm text-slate-500">今天該複習</p>
          <p className="text-3xl font-extrabold text-rose-600">{due.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-slate-500">錯題總數</p>
          <p className="text-3xl font-extrabold">{allIds.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-slate-500">已畢業</p>
          <p className="text-3xl font-extrabold text-emerald-600">{mastered}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          disabled={!due.length}
          onClick={() => start(due)}
          data-testid="review-start"
        >
          開始複習到期的 {due.length} 題
        </button>
        <button type="button" className="btn-secondary" onClick={() => start(allIds)}>
          全部再練一次
        </button>
      </div>
      <ul className="space-y-2">
        {allIds.map((id) => {
          const r = review[id];
          const q = qmap?.get(id);
          const p = parseContentId(id);
          const meta = p ? getSubject(p.subject) : undefined;
          return (
            <li key={id} className="card flex flex-wrap items-center gap-3 p-3 text-sm">
              <span className="chip" style={meta ? { color: meta.color } : undefined}>
                {meta?.icon} {meta?.name}
              </span>
              <span className="min-w-0 flex-1 truncate">
                {q ? <Rich text={q.stem.split("\n")[0]} /> : "（題目已更新或移除）"}
              </span>
              <span className="text-xs text-slate-500">
                第 {r.box + 1}/{REVIEW_INTERVALS.length} 關・
                {r.due <= today ? "今天到期" : `${r.due} 複習`}
              </span>
              <button
                type="button"
                className="text-xs text-slate-400 hover:text-rose-600"
                onClick={() => removeReview(id)}
                aria-label="移除這題"
              >
                移除
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
