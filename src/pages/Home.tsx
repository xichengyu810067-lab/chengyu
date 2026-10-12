import { Link } from "react-router";
import StageSwitch from "../components/StageSwitch";
import { hasTrack, SUBJECTS } from "../content/registry";
import { STAGE_LABEL, type Stage } from "../content/types";
import { useStats } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { ProgressBar, ProgressRing } from "../ui";

const FORMS = [
  { icon: "🧠", name: "心智圖", desc: "課綱全貌一張圖" },
  { icon: "🎚️", name: "拉桿實驗", desc: "拉參數看變化" },
  { icon: "🧩", name: "拖拽分類", desc: "動手排一排" },
  { icon: "🎯", name: "熱區探索", desc: "點一點看構造" },
  { icon: "🗺️", name: "圖層疊加", desc: "資料一層層看" },
  { icon: "🪜", name: "步驟拆解", desc: "猜下一步再揭曉" },
  { icon: "🎟️", name: "刮刮樂", desc: "刮開記憶卡" },
  { icon: "💬", name: "情境對話", desc: "和 AI 角色聊天" },
  { icon: "🎨", name: "沙盒畫布", desc: "自由畫圖推理" },
  { icon: "🎮", name: "小遊戲", desc: "闖關與翻牌" },
];

export default function Home() {
  const stats = useStats();
  const profile = useProgress((s) => s.profile);
  const lessons = useProgress((s) => s.lessons);
  const stage = profile.stage;

  const doneBySubject = (subject: string, st: Stage) =>
    Object.entries(lessons).filter(([id, r]) => r.completedAt && id.startsWith(`${subject}.${st}.`))
      .length;

  const lastLesson = Object.entries(lessons)
    .filter(([, r]) => r.activitiesDone.length > 0 && !r.completedAt)
    .at(-1)?.[0];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
        <div
          className="pointer-events-none absolute -top-10 -right-10 size-48 rounded-full bg-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-24 bottom-4 size-16 rounded-full bg-amber-300/30"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-indigo-100">歡迎回到學習星球</p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
              嗨，{profile.nickname || "同學"}！今天想探索哪顆星球？
            </h1>
            <p className="mt-2 max-w-xl text-indigo-100">
              依 108 課綱設計的國高中互動課程：每堂 5–10 分鐘，玩得懂、記得住。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {lastLesson ? (
                <Link
                  to={`/lesson/${lastLesson}`}
                  className="btn bg-white text-brand-700 hover:bg-indigo-50"
                >
                  ▶ 繼續上次的課程
                </Link>
              ) : (
                <a href="#subjects" className="btn bg-white text-brand-700 hover:bg-indigo-50">
                  ▶ 開始第一堂課
                </a>
              )}
              <Link
                to="/daily"
                className="btn bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25"
              >
                {stats.dailyDone ? "✅ 今日挑戰已完成" : "⚡ 每日挑戰 5 題"}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
            <ProgressRing
              value={stats.level.progress}
              size={72}
              stroke={7}
              color="#fbbf24"
              label={`等級 ${stats.level.level}`}
            >
              <span className="text-base text-white">Lv.{stats.level.level}</span>
            </ProgressRing>
            <div className="text-sm">
              <p className="font-bold">{stats.level.title}</p>
              <p className="text-indigo-100">
                {stats.level.current} / {stats.level.needed} XP
              </p>
              <p className="mt-1">
                🔥 連續 {stats.streak} 天　📘 完成 {stats.completedLessons} 堂
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link
          to="/review"
          className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="text-3xl">📝</span>
          <span>
            <span className="block font-bold">錯題本</span>
            <span className="text-sm text-slate-500">
              {stats.due > 0
                ? `今天有 ${stats.due} 題該複習`
                : `共 ${stats.reviewTotal} 題，目前沒有到期`}
            </span>
          </span>
        </Link>
        <Link
          to="/tutor"
          className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="text-3xl">🤖</span>
          <span>
            <span className="block font-bold">AI 家教</span>
            <span className="text-sm text-slate-500">卡關了？一步步引導你想</span>
          </span>
        </Link>
        <Link
          to="/sandbox"
          className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="text-3xl">🎨</span>
          <span>
            <span className="block font-bold">沙盒畫布</span>
            <span className="text-sm text-slate-500">畫圖、作圖、整理筆記</span>
          </span>
        </Link>
      </section>

      <section id="subjects" className="scroll-mt-20">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold">選擇科目</h2>
            <p className="text-sm text-slate-500">目前學段：{STAGE_LABEL[stage]}</p>
          </div>
          <StageSwitch className="" label="切換學段" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SUBJECTS.map((s) => {
            const ready = hasTrack(s.id, stage);
            const done = doneBySubject(s.id, stage);
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-11 place-items-center rounded-xl text-2xl"
                    style={{ background: `${s.color}1a` }}
                    aria-hidden
                  >
                    {s.icon}
                  </span>
                  {done > 0 && <span className="chip">✅ {done} 堂</span>}
                </div>
                <h3 className="mt-3 text-lg font-bold" style={{ color: s.color }}>
                  {s.name}
                </h3>
                <p className="text-xs text-slate-500">{s.stageLabels[stage]}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                  {s.description}
                </p>
                {!ready && <p className="mt-2 text-xs font-semibold text-amber-600">內容建置中</p>}
              </>
            );
            return ready ? (
              <Link
                key={s.id}
                to={`/learn/${stage}/${s.id}`}
                className="card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderTop: `4px solid ${s.color}` }}
                data-testid={`subject-${s.id}`}
              >
                {inner}
              </Link>
            ) : (
              <div
                key={s.id}
                className="card p-4 opacity-60"
                style={{ borderTop: `4px solid ${s.color}` }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-extrabold">十種互動學習方式</h2>
        <p className="mb-4 text-sm text-slate-500">
          每堂課混合不同的互動，讓抽象概念變得看得見、摸得到。
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {FORMS.map((f) => (
            <Link
              key={f.name}
              to="/gallery"
              className="card p-3 text-center transition hover:shadow-md"
            >
              <p className="text-2xl" aria-hidden>
                {f.icon}
              </p>
              <p className="mt-1 text-sm font-bold">{f.name}</p>
              <p className="text-xs text-slate-500">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-bold">今日進度</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">升級進度</p>
            <ProgressBar value={stats.level.progress} className="mt-2" />
            <p className="mt-1 text-xs text-slate-500">
              再 {stats.level.needed - stats.level.current} XP 升到 Lv.{stats.level.level + 1}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">每日挑戰</p>
            <p className="mt-1 font-semibold">{stats.dailyDone ? "已完成 ✅" : "尚未完成"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">徽章</p>
            <p className="mt-1 font-semibold">
              {stats.badges.filter((b) => b.earned).length} / {stats.badges.length}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
