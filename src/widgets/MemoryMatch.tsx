import { useEffect, useMemo, useRef, useState } from "react";
import type { MemoryActivity } from "../content/types";
import { shuffle } from "../lib/date";
import { Feedback } from "../ui";
import { Rich } from "./RichText";
import type { WidgetProps } from "./types";

interface Card {
  key: string;
  pair: number;
  text: string;
  side: 0 | 1;
}

export default function MemoryMatch({
  activity,
  done,
  onComplete,
  ctx,
}: WidgetProps<MemoryActivity>) {
  const cards = useMemo<Card[]>(
    () =>
      shuffle(
        activity.pairs.flatMap(([a, b], i) => [
          { key: `${i}a`, pair: i, text: a, side: 0 as const },
          { key: `${i}b`, pair: i, text: b, side: 1 as const },
        ]),
      ),
    [activity.pairs],
  );
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<number>>(
    () => new Set(done ? activity.pairs.map((_, i) => i) : []),
  );
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(done);
  const busy = useRef(false);
  const n = activity.pairs.length;

  useEffect(() => {
    if (completed) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [completed]);

  const flip = (c: Card) => {
    if (busy.current || completed || matched.has(c.pair) || open.includes(c.key)) return;
    const next = [...open, c.key];
    setOpen(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((k) => cards.find((x) => x.key === k) as Card);
      if (a.pair === b.pair) {
        const m = new Set(matched).add(a.pair);
        setMatched(m);
        setOpen([]);
        if (m.size === n) {
          setCompleted(true);
          onComplete(Math.min(1, (n * 1.4) / (moves + 1)));
        }
      } else {
        busy.current = true;
        setTimeout(() => {
          setOpen([]);
          busy.current = false;
        }, 900);
      }
    }
  };

  const stars = moves <= n * 1.4 ? 3 : moves <= n * 2 ? 2 : 1;
  const cols =
    n <= 4
      ? "grid-cols-2 sm:grid-cols-4"
      : n <= 6
        ? "grid-cols-3 sm:grid-cols-4"
        : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="chip">
          🃏 配對 {matched.size}/{n}
        </span>
        <span className="chip">👣 步數 {moves}</span>
        <span className="chip">⏱️ {seconds} 秒</span>
      </div>
      <div className={`grid gap-2 ${cols}`}>
        {cards.map((c) => {
          const isOpen = open.includes(c.key) || matched.has(c.pair);
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => flip(c)}
              aria-label={isOpen ? undefined : "翻開卡片"}
              className={`grid min-h-20 place-items-center rounded-xl border-2 p-2 text-center text-sm font-semibold transition duration-300 ${
                matched.has(c.pair)
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                  : isOpen
                    ? "border-brand-400 bg-white dark:bg-slate-800"
                    : "border-transparent text-white hover:brightness-110"
              }`}
              style={
                isOpen
                  ? undefined
                  : { background: `linear-gradient(135deg, ${ctx.color}, ${ctx.color}aa)` }
              }
              data-testid={`memory-${c.key}`}
            >
              {isOpen ? <Rich text={c.text} /> : <span className="text-2xl">?</span>}
            </button>
          );
        })}
      </div>
      {completed && (
        <Feedback ok>
          {"⭐".repeat(stars)} 全部配對成功！用了 {moves} 步、{seconds} 秒。
        </Feedback>
      )}
    </div>
  );
}
