import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getSubject, loadLesson } from "../content/registry";
import { STAGE_LABEL } from "../content/types";
import { useAsync } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { EmptyState, ProgressBar, Spinner } from "../ui";
import ActivityHost, { KIND_META } from "../widgets/ActivityHost";
import { RichText } from "../widgets/RichText";

export default function LessonPage() {
  const { lessonId = "" } = useParams();
  const { data, loading, error } = useAsync(() => loadLesson(lessonId), lessonId);
  const record = useProgress((s) => s.lessons[lessonId]);
  const completeActivity = useProgress((s) => s.completeActivity);
  const completeLesson = useProgress((s) => s.completeLesson);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const scores = useRef<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 換課時重設
  useEffect(() => {
    setStep(0);
    setFinished(false);
    scores.current = {};
  }, [lessonId]);

  const nextLesson = useMemo(() => {
    if (!data) return undefined;
    const list = data.track.lessons;
    const i = list.findIndex((l) => l.id === lessonId);
    return list[i + 1];
  }, [data, lessonId]);

  if (loading) return <Spinner label="課程載入中…" />;
  if (error || !data) {
    return (
      <EmptyState icon="🔭" title="找不到這堂課">
        <p>可能是網址有誤或課程已更新。</p>
        <Link to="/" className="btn-primary mt-4">
          回首頁
        </Link>
      </EmptyState>
    );
  }

  const { lesson, track, subject, stage } = data;
  const meta = getSubject(subject);
  const color = meta?.color ?? "#4f46e5";
  const activities = lesson.activities;
  const doneSet = new Set(record?.activitiesDone ?? []);
  const doneCount = activities.filter((a) => doneSet.has(a.id)).length;
  const activity = activities[step];

  const handleComplete = (id: string, score?: number) => {
    if (score !== undefined) scores.current[id] = score;
    completeActivity(lessonId, id);
  };

  const finish = () => {
    const vals = Object.values(scores.current);
    const score = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) * 100 : 100;
    completeLesson(lessonId, score);
    setFinished(true);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const go = (i: number) => {
    setStep(i);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (finished) {
    const vals = Object.values(scores.current);
    const score = vals.length
      ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100)
      : 100;
    return (
      <div ref={topRef} className="mx-auto max-w-xl py-6">
        <div className="card animate-pop space-y-4 p-6 text-center" data-testid="lesson-complete">
          <p className="text-6xl">🎉</p>
          <h1 className="text-2xl font-extrabold">完成「{lesson.title}」！</h1>
          <p className="text-slate-600 dark:text-slate-300">
            本堂表現 {score} 分{score === 100 ? "，太厲害了！" : ""}
          </p>
          <ul className="mx-auto max-w-sm space-y-1 text-left text-sm">
            {lesson.objectives.map((o) => (
              <li key={o}>✅ {o}</li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-2">
            {nextLesson ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              >
                下一堂：{nextLesson.title} →
              </button>
            ) : null}
            <Link to={`/play/${stage}/${subject}`} className="btn-secondary">
              🎮 闖關複習
            </Link>
            <Link to={`/learn/${stage}/${subject}`} className="btn-ghost">
              回到{meta?.name}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="mx-auto max-w-4xl scroll-mt-20 space-y-4">
      <nav className="text-sm text-slate-500" aria-label="麵包屑">
        <Link to="/" className="hover:underline">
          首頁
        </Link>
        {" / "}
        <Link to={`/learn/${stage}/${subject}`} className="hover:underline">
          {meta?.stageLabels[stage] ?? `${STAGE_LABEL[stage]}${meta?.name}`}
        </Link>
      </nav>
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip" style={{ background: `${color}1a`, color }}>
            {meta?.icon} {meta?.name}
          </span>
          <span className="chip">{lesson.grade} 年級</span>
          <span className="chip">⏱️ 約 {lesson.minutes} 分鐘</span>
          {record?.completedAt && (
            <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              ✅ 已完成
            </span>
          )}
        </div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{lesson.title}</h1>
        <details className="text-sm text-slate-600 dark:text-slate-300">
          <summary className="cursor-pointer">學習目標</summary>
          <ul className="mt-1 list-disc pl-5">
            {lesson.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </details>
      </header>

      <div className="flex items-center gap-3">
        <ProgressBar value={doneCount / activities.length} color={color} className="flex-1" />
        <span className="text-xs text-slate-500 tabular-nums">
          {doneCount}/{activities.length}
        </span>
      </div>
      <ol className="flex gap-1.5 overflow-x-auto pb-1" aria-label="活動列表">
        {activities.map((a, i) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={i === step ? "step" : undefined}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs whitespace-nowrap transition ${
                i === step
                  ? "border-transparent font-semibold text-white"
                  : doneSet.has(a.id)
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : "border-slate-200 text-slate-500 dark:border-slate-700"
              }`}
              style={i === step ? { background: color } : undefined}
            >
              {doneSet.has(a.id) ? "✓" : KIND_META[a.kind].icon} {i + 1}. {KIND_META[a.kind].label}
            </button>
          </li>
        ))}
      </ol>

      {activity && (
        <section
          className="card p-4 sm:p-6"
          aria-labelledby="activity-title"
          data-testid={`activity-${activity.kind}`}
        >
          <p className="text-xs font-semibold" style={{ color }}>
            活動 {step + 1}・{KIND_META[activity.kind].icon} {KIND_META[activity.kind].label}
          </p>
          <h2 id="activity-title" className="mt-1 text-xl font-bold">
            {activity.title}
          </h2>
          {activity.prompt && (
            <RichText text={activity.prompt} className="mt-2 text-slate-600 dark:text-slate-300" />
          )}
          <div className="mt-4">
            <ActivityHost
              key={`${lessonId}-${activity.id}`}
              activity={activity}
              done={doneSet.has(activity.id)}
              onComplete={(score) => handleComplete(activity.id, score)}
              ctx={{ subject, stage, color, lessonId, questions: track.questions }}
            />
          </div>
        </section>
      )}

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          className="btn-ghost"
          disabled={step === 0}
          onClick={() => go(step - 1)}
        >
          ← 上一個
        </button>
        {step < activities.length - 1 ? (
          <button
            type="button"
            className={doneSet.has(activity?.id ?? "") ? "btn-primary" : "btn-secondary"}
            onClick={() => go(step + 1)}
            data-testid="next-activity"
          >
            {doneSet.has(activity?.id ?? "") ? "下一個活動 →" : "先跳過 →"}
          </button>
        ) : (
          <button
            type="button"
            className="btn-success"
            onClick={finish}
            disabled={doneCount < Math.ceil(activities.length / 2)}
            title={doneCount < Math.ceil(activities.length / 2) ? "至少完成一半的活動" : undefined}
            data-testid="finish-lesson"
          >
            🏁 完成這堂課
          </button>
        )}
      </div>
    </div>
  );
}
