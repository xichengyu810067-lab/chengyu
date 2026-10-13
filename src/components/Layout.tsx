import { useEffect } from "react";
import { Link, NavLink, Outlet, ScrollRestoration, useLocation, useNavigation } from "react-router";
import { useApplySettings, useStats } from "../lib/hooks";
import { storagePersistent } from "../lib/progress";
import StageSwitch from "./StageSwitch";

const NAV = [
  { to: "/", label: "首頁", icon: "🏠", end: true },
  { to: "/review", label: "錯題本", icon: "📝" },
  { to: "/tutor", label: "AI 家教", icon: "🤖" },
  { to: "/sandbox", label: "畫布", icon: "🎨" },
  { to: "/me", label: "我的", icon: "🧑‍🚀" },
];

export default function Layout() {
  useApplySettings();
  const navigation = useNavigation();
  const stats = useStats();
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 換頁（pathname 改變）時才移動焦點
  useEffect(() => {
    // 換頁時把焦點移到主內容，方便鍵盤與螢幕報讀
    const main = document.getElementById("main");
    if (main && location.hash === "") main.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded bg-brand-600 px-3 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        跳到主要內容
      </a>
      {navigation.state === "loading" && (
        <div className="fixed inset-x-0 top-0 z-50 h-1 animate-pulse bg-brand-500" aria-hidden />
      )}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 font-bold text-brand-700 dark:text-brand-300"
          >
            <img src="/favicon.svg" alt="" className="size-8" />
            <span className="text-lg">學習星球</span>
          </Link>
          <StageSwitch className="ml-1 hidden sm:flex" label="選擇學段" />
          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="主選單">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                {n.label}
                {n.to === "/review" && stats.due > 0 && (
                  <span className="ml-1 rounded-full bg-rose-500 px-1.5 text-xs text-white">
                    {stats.due}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/me"
            className="ml-auto flex items-center gap-2 rounded-xl px-2 py-1 text-sm hover:bg-slate-100 md:ml-2 dark:hover:bg-slate-800"
            aria-label={`等級 ${stats.level.level}，經驗值 ${stats.xp}，連續 ${stats.streak} 天`}
          >
            <span className="chip bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
              🔥 {stats.streak}
            </span>
            <span className="chip bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-200">
              Lv.{stats.level.level}
            </span>
          </Link>
        </div>
      </header>

      {!storagePersistent && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
          目前瀏覽器無法儲存資料（可能是無痕模式），關閉分頁後進度會消失。可到「我的」頁面匯出進度備份。
        </div>
      )}

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-4 pt-4 pb-24 outline-none md:pb-10"
      >
        <Outlet />
      </main>

      <footer className="hidden border-t border-slate-200 py-6 text-center text-xs text-slate-500 md:block dark:border-slate-800">
        <p>
          內容依十二年國教 108 課綱學習內容編寫；各版本教科書單元順序可能不同，請以學校教學為準。
        </p>
        <p className="mt-1 space-x-3">
          <Link to="/about" className="underline-offset-2 hover:underline">
            課綱與內容說明
          </Link>
          <Link to="/privacy" className="underline-offset-2 hover:underline">
            隱私與 AI 使用說明
          </Link>
          <Link to="/gallery" className="underline-offset-2 hover:underline">
            互動元件展示
          </Link>
        </p>
      </footer>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95"
        aria-label="底部選單"
      >
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                isActive
                  ? "text-brand-700 dark:text-brand-300"
                  : "text-slate-500 dark:text-slate-400"
              }`
            }
          >
            <span className="text-lg leading-none" aria-hidden>
              {n.icon}
            </span>
            {n.label}
            {n.to === "/review" && stats.due > 0 && (
              <span className="absolute top-1 right-1/4 rounded-full bg-rose-500 px-1 text-[10px] text-white">
                {stats.due}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <ScrollRestoration />
    </div>
  );
}
