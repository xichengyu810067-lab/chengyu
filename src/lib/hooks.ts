import { useEffect, useMemo, useState } from "react";
import { dateKey } from "./date";
import { computeBadges, computeStreak, computeXP, dueReviewIds, levelInfo } from "./gamification";
import { useProgress } from "./progress";

/** 由進度推導的統計（XP、等級、連續天數、待複習題數） */
export function useStats() {
  const lessons = useProgress((s) => s.lessons);
  const answers = useProgress((s) => s.answers);
  const review = useProgress((s) => s.review);
  const mastered = useProgress((s) => s.mastered);
  const games = useProgress((s) => s.games);
  const daily = useProgress((s) => s.daily);
  const activeDays = useProgress((s) => s.activeDays);
  const usage = useProgress((s) => s.usage);
  return useMemo(() => {
    const data = { lessons, answers, review, mastered, games, daily, activeDays, usage };
    const xp = computeXP(data);
    const today = dateKey();
    return {
      xp,
      level: levelInfo(xp),
      streak: computeStreak(activeDays, today),
      due: dueReviewIds(review, today).length,
      reviewTotal: Object.keys(review).length,
      completedLessons: Object.values(lessons).filter((l) => l.completedAt).length,
      dailyDone: daily[today] !== undefined,
      badges: computeBadges(data, today),
    };
  }, [lessons, answers, review, mastered, games, daily, activeDays, usage]);
}

/** 套用主題、字級、減少動態 */
export function useApplySettings() {
  const settings = useProgress((s) => s.settings);
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = settings.theme === "dark" || (settings.theme === "system" && mq.matches);
      root.classList.toggle("dark", dark);
    };
    apply();
    root.style.fontSize = `${16 * settings.fontScale}px`;
    root.classList.toggle("reduce-motion", settings.reduceMotion);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [settings]);
}

export function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export function usePrefersReducedMotion(): boolean {
  const sys = useMediaQuery("(prefers-reduced-motion: reduce)");
  const user = useProgress((s) => s.settings.reduceMotion);
  return sys || user;
}

/** `key` 改變時重新執行 `fn` */
export function useAsync<T>(fn: () => Promise<T>, key: string) {
  const [state, setState] = useState<{ data?: T; error?: Error; loading: boolean }>({
    loading: true,
  });
  // biome-ignore lint/correctness/useExhaustiveDependencies: 只在 key 改變時重新載入
  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, error: undefined, loading: true }));
    fn().then(
      (data) => alive && setState({ data, loading: false }),
      (error: Error) => alive && setState({ error, loading: false }),
    );
    return () => {
      alive = false;
    };
  }, [key]);
  return state;
}
