import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { getSubject, hasTrack, isStage, isSubjectId, loadTrack } from "../content/registry";
import { type Grade, STAGE_LABEL } from "../content/types";
import { useAsync } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { EmptyState, ProgressRing, Spinner } from "../ui";
import { KIND_META } from "../widgets/ActivityHost";
import MindMap from "../widgets/MindMap";

export default function SubjectPage() {
  const { stage = "", subject = "" } = useParams();
  const valid = isStage(stage) && isSubjectId(subject) && hasTrack(subject, stage);
  const { data: track, loading } = useAsync(
    () => (valid ? loadTrack(subject, stage) : Promise.resolve(null)),
    `${subject}.${stage}`,
  );
  const lessons = useProgress((s) => s.lessons);
  const best = useProgress((s) => s.games[`${subject}.${stage}`]);
  const [tab, setTab] = useState<"lessons" | "map">("lessons");
  const meta = getSubject(subject);

  const completed = useMemo(
    () =>
      new Set(
        Object.entries(lessons)
          .filter(([, r]) => r.completedAt)
          .map(([id]) => id),
      ),
    [lessons],
  );

  if (!valid || !meta) {
    return (
      <EmptyState icon="🛰️" title="這個科目內容還在建置中">
        <Link to="/" className="btn-primary mt-4">
          回首頁
        </Link>
      </EmptyState>
    );
  }
  if (loading || !track) return <Spinner label={`${meta.name}載入中…`} />;

  const byGrade = new Map<Grade, typeof track.lessons>();
  for (const l of track.lessons) byGrade.set(l.grade, [...(byGrade.get(l.grade) ?? []), l]);
  const doneCount = track.lessons.filter((l) => completed.has(l.id)).length;
  const lessonTitles = new Map(track.lessons.map((l) => [l.id, l.title]));

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-500" aria-label="麵包屑">
        <Link to="/" className="hover:underline">
          首頁
        </Link>
        {" / "}
        {STAGE_LABEL[stage as "junior" | "senior"]}
      </nav>
      <header
        className="relative overflow-hidden rounded-3xl p-6 text-white shadow-md"
        style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}
      >
        <div className="flex flex-wrap items-center gap-5">
          <span className="text-5xl" aria-hidden>
            {meta.icon}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {meta.stageLabels[stage as "junior" | "senior"]}
            </h1>
            <p className="mt-1 text-white/85">{meta.description}</p>
          </div>
          <ProgressRing
            value={track.lessons.length ? doneCount / track.lessons.length : 0}
            size={76}
            stroke={7}
            color="#fde68a"
            label={`完成 ${doneCount} / ${track.lessons.length} 堂`}
          >
            <span className="text-sm text-white">
              {doneCount}/{track.lessons.length}
            </span>
          </ProgressRing>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/play/${stage}/${subject}`}
            className="btn bg-white/95 text-slate-800 hover:bg-white"
            data-testid="play-game"
          >
            🎮 闖關遊戲{best ? `（最佳 ${best}）` : ""}
          </Link>
          <Link
            to={`/tutor?subject=${subject}&stage=${stage}`}
            className="btn bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25"
          >
            🤖 問 AI 家教
          </Link>
        </div>
      </header>

      <fieldset className="flex w-fit rounded-xl bg-slate-100 p-1 text-sm dark:bg-slate-800">
        <legend className="sr-only">切換檢視</legend>
        {(
          [
            ["lessons", "📘 互動課程"],
            ["map", "🧠 課綱心智圖"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            aria-pressed={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-lg px-4 py-1.5 font-semibold ${tab === k ? "bg-white shadow-sm dark:bg-slate-950" : "text-slate-500"}`}
          >
            {label}
          </button>
        ))}
      </fieldset>

      {tab === "map" ? (
        <section aria-label="課綱心智圖">
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
            依 108 課綱學習內容整理。點節點展開、查看重點；有 📘 的節點可直接進入互動課程。
          </p>
          <MindMap
            root={track.mindmap}
            color={meta.color}
            lessonTitles={lessonTitles}
            completedLessons={completed}
          />
        </section>
      ) : (
        <section className="space-y-6" aria-label="課程列表">
          {[...byGrade.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([grade, list]) => (
              <div key={grade}>
                <h2 className="mb-3 text-lg font-bold">{grade} 年級</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((l) => {
                    const rec = lessons[l.id];
                    const isDone = completed.has(l.id);
                    const kinds = [...new Set(l.activities.map((a) => a.kind))];
                    return (
                      <Link
                        key={l.id}
                        to={`/lesson/${l.id}`}
                        className="card group flex flex-col p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                        data-testid={`lesson-${l.id}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold group-hover:underline">{l.title}</h3>
                          {isDone ? (
                            <span className="chip shrink-0 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                              ✅ {rec?.bestScore ?? 100}分
                            </span>
                          ) : rec?.activitiesDone.length ? (
                            <span className="chip shrink-0">進行中</span>
                          ) : null}
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                          {l.objectives[0]}
                        </p>
                        <div className="mt-auto flex flex-wrap gap-1 pt-3">
                          {kinds.map((k) => (
                            <span key={k} className="chip" title={KIND_META[k].label}>
                              {KIND_META[k].icon} {KIND_META[k].label}
                            </span>
                          ))}
                          <span className="chip">⏱️ {l.minutes} 分</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
        </section>
      )}
    </div>
  );
}
