import { useRef, useState } from "react";
import { SUBJECTS } from "../content/registry";
import { STAGE_LABEL } from "../content/types";
import { useStats } from "../lib/hooks";
import { buildExport, parseExport, storagePersistent, useProgress } from "../lib/progress";
import { Feedback, PageTitle, ProgressBar, ProgressRing } from "../ui";

const AVATARS = ["🧑‍🚀", "👩‍🚀", "🦊", "🐼", "🐯", "🦉", "🐳", "🦄", "🤖", "👾", "🌟", "🪐"];

export default function MePage() {
  const stats = useStats();
  const state = useProgress();
  const { profile, settings, setProfile, setSettings, lessons } = state;
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [code, setCode] = useState(state.aiAccessCode);
  const fileRef = useRef<HTMLInputElement>(null);

  const doExport = () => {
    const blob = new Blob([JSON.stringify(buildExport(useProgress.getState()), null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `學習星球進度-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setMsg({ ok: true, text: "已下載進度檔，可在其他裝置用「匯入進度」還原。" });
  };

  const doImport = async (file: File) => {
    try {
      const parsed = parseExport(await file.text());
      state.importProgress(parsed.data);
      if (parsed.profile?.nickname && !profile.nickname)
        setProfile({ nickname: parsed.profile.nickname });
      setMsg({ ok: true, text: "匯入成功！進度已與目前資料合併。" });
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    }
  };

  const subjectDone = (id: string, st: "junior" | "senior") =>
    Object.entries(lessons).filter(([lid, r]) => r.completedAt && lid.startsWith(`${id}.${st}.`))
      .length;

  return (
    <div className="space-y-6">
      <PageTitle>🧑‍🚀 我的星球</PageTitle>

      <section className="card flex flex-wrap items-center gap-5 p-5">
        <span className="grid size-20 place-items-center rounded-full bg-brand-50 text-5xl dark:bg-brand-950">
          {profile.avatar}
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <label className="block text-sm">
            <span className="text-slate-500">暱稱（只存在這台裝置）</span>
            <input
              className="input mt-1 max-w-xs"
              value={profile.nickname}
              maxLength={16}
              placeholder="輸入暱稱"
              onChange={(e) => setProfile({ nickname: e.target.value })}
            />
          </label>
          <fieldset className="flex flex-wrap gap-1">
            <legend className="sr-only">選擇頭像</legend>
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={profile.avatar === a}
                aria-label={`頭像 ${a}`}
                onClick={() => setProfile({ avatar: a })}
                className={`grid size-9 place-items-center rounded-lg text-xl ${profile.avatar === a ? "bg-brand-100 ring-2 ring-brand-500 dark:bg-brand-900" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                {a}
              </button>
            ))}
          </fieldset>
        </div>
        <div className="flex items-center gap-3">
          <ProgressRing value={stats.level.progress} size={80} stroke={8}>
            <span className="text-base">Lv.{stats.level.level}</span>
          </ProgressRing>
          <div className="text-sm">
            <p className="font-bold">{stats.level.title}</p>
            <p className="text-slate-500">總經驗 {stats.xp} XP</p>
            <p className="text-slate-500">🔥 連續 {stats.streak} 天</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">
          🏅 徽章（{stats.badges.filter((b) => b.earned).length}/{stats.badges.length}）
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {stats.badges.map((b) => (
            <div
              key={b.id}
              className={`card p-3 text-center ${b.earned ? "" : "opacity-40 grayscale"}`}
              title={b.desc}
            >
              <p className="text-3xl" aria-hidden>
                {b.icon}
              </p>
              <p className="mt-1 text-sm font-bold">{b.name}</p>
              <p className="text-[11px] text-slate-500">{b.desc}</p>
              <span className="sr-only">{b.earned ? "已獲得" : "尚未獲得"}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">📊 各科完成課程</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["junior", "senior"] as const).map((st) => (
            <div key={st} className="card space-y-2 p-4">
              <h3 className="font-semibold">{STAGE_LABEL[st]}</h3>
              {SUBJECTS.map((s) => {
                const n = subjectDone(s.id, st);
                return (
                  <div key={s.id} className="flex items-center gap-2 text-sm">
                    <span className="w-20 shrink-0">
                      {s.icon} {s.name}
                    </span>
                    <ProgressBar value={Math.min(1, n / 8)} color={s.color} className="flex-1" />
                    <span className="w-10 text-right text-xs text-slate-500">{n} 堂</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="card space-y-4 p-5">
        <h2 className="text-lg font-bold">⚙️ 設定</h2>
        <div className="flex flex-wrap gap-6 text-sm">
          <label className="space-y-1">
            <span className="block text-slate-500">主題</span>
            <select
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900"
              value={settings.theme}
              onChange={(e) => setSettings({ theme: e.target.value as typeof settings.theme })}
            >
              <option value="system">跟隨系統</option>
              <option value="light">淺色</option>
              <option value="dark">深色</option>
            </select>
          </label>
          <label className="space-y-1">
            <span className="block text-slate-500">字級</span>
            <select
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900"
              value={settings.fontScale}
              onChange={(e) => setSettings({ fontScale: Number(e.target.value) })}
            >
              <option value={1}>標準</option>
              <option value={1.125}>大</option>
              <option value={1.25}>特大</option>
            </select>
          </label>
          <label className="flex items-center gap-2 self-end">
            <input
              type="checkbox"
              className="size-4"
              checked={settings.reduceMotion}
              onChange={(e) => setSettings({ reduceMotion: e.target.checked })}
            />
            減少動畫效果
          </label>
        </div>
        <form
          className="space-y-1 text-sm"
          onSubmit={(e) => {
            e.preventDefault();
            state.setAiAccessCode(code);
            setMsg({ ok: true, text: code ? "已儲存 AI 通行碼。" : "已清除 AI 通行碼。" });
          }}
        >
          <label htmlFor="code" className="block text-slate-500">
            AI 通行碼（老師有提供才需要填）
          </label>
          <div className="flex gap-2">
            <input
              id="code"
              className="input max-w-xs"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="btn-secondary">
              儲存
            </button>
          </div>
        </form>
      </section>

      <section className="card space-y-3 p-5">
        <h2 className="text-lg font-bold">💾 進度備份</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          學習進度只存在這台裝置的瀏覽器{storagePersistent ? "" : "（目前無法永久儲存）"}
          。換裝置或清除瀏覽器資料前，請先匯出備份。
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={doExport}>
            ⬇️ 匯出進度
          </button>
          <button type="button" className="btn-secondary" onClick={() => fileRef.current?.click()}>
            ⬆️ 匯入進度
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void doImport(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            className="btn-ghost text-rose-600"
            onClick={() => {
              if (window.confirm("確定要清除所有學習進度嗎？此動作無法復原（建議先匯出備份）。")) {
                state.resetAll();
                setMsg({ ok: true, text: "已清除學習進度。" });
              }
            }}
          >
            🗑️ 清除進度
          </button>
        </div>
        {msg && <Feedback ok={msg.ok}>{msg.text}</Feedback>}
      </section>
    </div>
  );
}
