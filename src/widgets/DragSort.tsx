import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DragActivity, DragOption } from "../content/types";
import { shuffle, shuffleNotIdentity } from "../lib/date";
import { Feedback } from "../ui";
import { Rich } from "./RichText";
import type { WidgetProps } from "./types";

/* ───────────────────── 指標拖曳（滑鼠＋觸控），點選放置為等價替代 ───────────────────── */

interface DragState {
  id: string;
  label: string;
  x: number;
  y: number;
  over: string | null;
}

function findTarget(x: number, y: number) {
  const el = document.elementFromPoint(x, y) as HTMLElement | null;
  return el?.closest<HTMLElement>("[data-drop-id]")?.dataset.dropId ?? null;
}

function usePointerDrag(onDrop: (id: string, target: string) => void) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const startRef = useRef<{
    id: string;
    label: string;
    x: number;
    y: number;
    active: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const s = startRef.current;
      if (!s) return;
      if (!s.active && Math.hypot(e.clientX - s.x, e.clientY - s.y) > 6) s.active = true;
      if (s.active) {
        e.preventDefault();
        setDrag({
          id: s.id,
          label: s.label,
          x: e.clientX,
          y: e.clientY,
          over: findTarget(e.clientX, e.clientY),
        });
      }
    };
    const up = (e: PointerEvent) => {
      const s = startRef.current;
      startRef.current = null;
      if (s?.active) {
        suppressClick.current = true;
        setTimeout(() => {
          suppressClick.current = false;
        }, 50);
        const target = findTarget(e.clientX, e.clientY);
        if (target) onDrop(s.id, target);
      }
      setDrag(null);
    };
    const cancel = () => {
      startRef.current = null;
      setDrag(null);
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", cancel);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
    };
  }, [onDrop]);

  const handlers = (id: string, label: string) => ({
    onPointerDown: (e: ReactPointerEvent) => {
      if (e.button !== 0) return;
      startRef.current = { id, label, x: e.clientX, y: e.clientY, active: false };
    },
  });

  return { drag, handlers, suppressClick };
}

function Ghost({ drag }: { drag: DragState | null }) {
  if (!drag) return null;
  return (
    <div
      className="pointer-events-none fixed z-50 max-w-[60vw] -translate-x-1/2 -translate-y-1/2 rotate-2 rounded-xl border-2 border-brand-500 bg-white px-3 py-2 text-sm font-medium shadow-xl dark:bg-slate-800"
      style={{ left: drag.x, top: drag.y }}
      aria-hidden
    >
      <Rich text={drag.label} />
    </div>
  );
}

/* ───────────────────── 分類 / 配對（配對 = 每格容量 1 的分類） ───────────────────── */

interface BoardProps {
  buckets: DragOption[];
  items: (DragOption & { bucket: string })[];
  capacity?: number;
  layout: "grid" | "rows";
  done: boolean;
  onComplete: (score: number) => void;
}

function BucketBoard({ buckets, items, capacity, layout, done, onComplete }: BoardProps) {
  const order = useMemo(() => shuffle(items), [items]);
  const [place, setPlace] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(items.map((i) => [i.id, done ? i.bucket : null])),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(done);
  const [firstScore, setFirstScore] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);

  const putInto = useCallback(
    (itemId: string, target: string) => {
      setChecked(false);
      setPlace((prev) => {
        const next = { ...prev };
        const bucket = target === "__pool" ? null : target;
        if (bucket && capacity) {
          const occupants = Object.entries(next).filter(([id, b]) => b === bucket && id !== itemId);
          if (occupants.length >= capacity) next[occupants[0][0]] = null;
        }
        next[itemId] = bucket;
        return next;
      });
      setSelected(null);
    },
    [capacity],
  );

  const { drag, handlers, suppressClick } = usePointerDrag(putInto);
  const pool = order.filter((i) => !place[i.id]);
  const allPlaced = pool.length === 0;
  const correctCount = items.filter((i) => place[i.id] === i.bucket).length;
  const allCorrect = correctCount === items.length;

  const check = () => {
    setChecked(true);
    const score = correctCount / items.length;
    if (firstScore === null) setFirstScore(score);
    if (allCorrect) onComplete(firstScore ?? score);
    else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 450);
    }
  };

  const returnWrong = () => {
    setPlace((prev) => {
      const next = { ...prev };
      for (const i of items) if (next[i.id] !== i.bucket) next[i.id] = null;
      return next;
    });
    setChecked(false);
  };

  const chip = (item: DragOption & { bucket: string }) => {
    const status =
      checked && place[item.id] ? (place[item.id] === item.bucket ? "ok" : "bad") : null;
    return (
      <button
        key={item.id}
        type="button"
        {...handlers(item.id, item.label)}
        onClick={() => {
          if (suppressClick.current) return;
          setSelected((s) => (s === item.id ? null : item.id));
        }}
        aria-pressed={selected === item.id}
        className={`no-touch-scroll rounded-xl border-2 px-3 py-2 text-left text-sm font-medium shadow-sm transition select-none ${
          drag?.id === item.id ? "opacity-40" : ""
        } ${
          selected === item.id
            ? "border-brand-500 bg-brand-50 ring-2 ring-brand-300 dark:bg-brand-950"
            : status === "ok"
              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
              : status === "bad"
                ? "border-rose-400 bg-rose-50 dark:bg-rose-950/50"
                : "border-slate-200 bg-white hover:border-brand-300 dark:border-slate-700 dark:bg-slate-800"
        }`}
        data-testid={`drag-item-${item.id}`}
      >
        {status === "ok" && "✓ "}
        {status === "bad" && "✗ "}
        <Rich text={item.label} />
      </button>
    );
  };

  return (
    <div className={`space-y-4 ${wrongFlash ? "animate-shake" : ""}`}>
      <p className="text-xs text-slate-500">
        拖曳卡片到正確位置；也可以<strong>先點卡片、再點目標區</strong>放入。
      </p>
      <div
        data-drop-id="__pool"
        className={`flex min-h-16 flex-wrap gap-2 rounded-2xl border-2 border-dashed p-3 ${
          drag?.over === "__pool"
            ? "border-brand-400 bg-brand-50/60 dark:bg-brand-950/30"
            : "border-slate-300 dark:border-slate-700"
        }`}
      >
        {pool.length === 0 ? (
          <span className="self-center text-sm text-slate-400">卡片都放好了！</span>
        ) : (
          pool.map(chip)
        )}
        {selected && place[selected] && (
          <button
            type="button"
            className="btn-ghost min-h-8 px-2 py-1 text-xs"
            onClick={() => putInto(selected, "__pool")}
          >
            ↩ 放回待選區
          </button>
        )}
      </div>
      <div className={layout === "grid" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-2"}>
        {buckets.map((b) => {
          const inside = order.filter((i) => place[i.id] === b.id);
          const over = drag?.over === b.id;
          return (
            <div
              key={b.id}
              data-drop-id={b.id}
              className={`rounded-2xl border-2 p-3 transition ${
                layout === "rows" ? "flex flex-wrap items-center gap-3" : ""
              } ${over ? "border-brand-500 bg-brand-50 dark:bg-brand-950/40" : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"}`}
              data-testid={`drop-${b.id}`}
            >
              <button
                type="button"
                onClick={() => selected && putInto(selected, b.id)}
                disabled={!selected}
                className={`text-left font-bold disabled:cursor-default ${layout === "rows" ? "min-w-[35%] flex-1" : "mb-2 block w-full"}`}
                aria-label={selected ? `放入「${b.label}」` : b.label}
              >
                <Rich text={b.label} />
                {selected && (
                  <span className="ml-2 text-xs font-normal text-brand-600">← 點這裡放入</span>
                )}
              </button>
              <div
                className={`flex min-h-10 flex-wrap gap-2 ${layout === "rows" ? "flex-1 justify-end" : ""}`}
              >
                {inside.map(chip)}
                {inside.length === 0 && (
                  <span className="self-center text-xs text-slate-400">拖到這裡</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-primary"
          onClick={check}
          disabled={!allPlaced || (checked && allCorrect)}
        >
          檢查答案
        </button>
        {checked && !allCorrect && (
          <button type="button" className="btn-secondary" onClick={returnWrong}>
            把錯的拿回來再試
          </button>
        )}
      </div>
      {checked && (
        <Feedback ok={allCorrect}>
          {allCorrect
            ? `🎉 全部正確！${firstScore !== null && firstScore < 1 ? `（第一次答對 ${Math.round(firstScore * 100)}%）` : ""}`
            : `答對 ${correctCount} / ${items.length}，紅色的再想想看。`}
        </Feedback>
      )}
      <Ghost drag={drag} />
    </div>
  );
}

/* ───────────────────── 排序 ───────────────────── */

function OrderBoard({
  items,
  done,
  onComplete,
}: {
  items: DragOption[];
  done: boolean;
  onComplete: (s: number) => void;
}) {
  const [list, setList] = useState<DragOption[]>(() => (done ? items : shuffleNotIdentity(items)));
  const [checked, setChecked] = useState(done);
  const [firstScore, setFirstScore] = useState<number | null>(null);

  const moveTo = useCallback((id: string, target: string) => {
    setChecked(false);
    setList((prev) => {
      const from = prev.findIndex((x) => x.id === id);
      const to = prev.findIndex((x) => x.id === target);
      if (from < 0 || to < 0 || from === to) return prev;
      const next = [...prev];
      const [it] = next.splice(from, 1);
      next.splice(to, 0, it);
      return next;
    });
  }, []);
  const { drag, handlers, suppressClick } = usePointerDrag(moveTo);
  const [selected, setSelected] = useState<string | null>(null);

  const swap = (i: number, j: number) => {
    if (j < 0 || j >= list.length) return;
    setChecked(false);
    setList((prev) => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const correct = list.filter((x, i) => x.id === items[i].id).length;
  const allCorrect = correct === items.length;
  const check = () => {
    setChecked(true);
    const score = correct / items.length;
    if (firstScore === null) setFirstScore(score);
    if (allCorrect) onComplete(firstScore ?? score);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">
        拖曳排序，或點一張卡再點另一張交換位置，也可用 ▲▼ 按鈕。
      </p>
      <ol className="space-y-2">
        {list.map((item, i) => {
          const status = checked ? (item.id === items[i].id ? "ok" : "bad") : null;
          return (
            <li
              key={item.id}
              data-drop-id={item.id}
              className={`flex items-center gap-2 rounded-xl border-2 bg-white p-1 pr-2 transition dark:bg-slate-800 ${
                drag?.over === item.id && drag.id !== item.id ? "border-brand-500" : ""
              } ${
                status === "ok"
                  ? "border-emerald-400"
                  : status === "bad"
                    ? "border-rose-400"
                    : selected === item.id
                      ? "border-brand-500 ring-2 ring-brand-200"
                      : "border-slate-200 dark:border-slate-700"
              } ${drag?.id === item.id ? "opacity-40" : ""}`}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-sm font-bold dark:bg-slate-700">
                {i + 1}
              </span>
              <button
                type="button"
                {...handlers(item.id, item.label)}
                onClick={() => {
                  if (suppressClick.current) return;
                  if (selected && selected !== item.id) {
                    const a = list.findIndex((x) => x.id === selected);
                    swap(a, i);
                    setSelected(null);
                  } else setSelected((s) => (s === item.id ? null : item.id));
                }}
                className="no-touch-scroll flex-1 cursor-grab py-2 text-left text-sm font-medium select-none"
                data-testid={`order-item-${item.id}`}
              >
                <Rich text={item.label} />
              </button>
              {status === "ok" && (
                <span role="img" aria-label="正確">
                  ✓
                </span>
              )}
              {status === "bad" && (
                <span role="img" aria-label="位置不對">
                  ✗
                </span>
              )}
              <span className="flex flex-col">
                <button
                  type="button"
                  className="px-2 text-xs leading-4 text-slate-500 hover:text-brand-600"
                  onClick={() => swap(i, i - 1)}
                  aria-label="上移"
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="px-2 text-xs leading-4 text-slate-500 hover:text-brand-600"
                  onClick={() => swap(i, i + 1)}
                  aria-label="下移"
                >
                  ▼
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        className="btn-primary"
        onClick={check}
        disabled={checked && allCorrect}
      >
        檢查順序
      </button>
      {checked && (
        <Feedback ok={allCorrect}>
          {allCorrect
            ? "🎉 順序完全正確！"
            : `有 ${correct} / ${items.length} 個在正確位置，紅框的再調整看看。`}
        </Feedback>
      )}
      <Ghost drag={drag} />
    </div>
  );
}

export default function DragSort({ activity, done, onComplete }: WidgetProps<DragActivity>) {
  const match = useMemo(() => {
    if (activity.mode !== "match") return null;
    return {
      buckets: activity.pairs.map((p) => ({ id: `L-${p.id}`, label: p.left })),
      items: activity.pairs.map((p) => ({ id: p.id, label: p.right, bucket: `L-${p.id}` })),
    };
  }, [activity]);
  if (activity.mode === "order")
    return <OrderBoard items={activity.items} done={done} onComplete={onComplete} />;
  if (match) {
    return (
      <BucketBoard
        buckets={match.buckets}
        items={match.items}
        capacity={1}
        layout="rows"
        done={done}
        onComplete={onComplete}
      />
    );
  }
  if (activity.mode !== "categorize") return null;
  return (
    <BucketBoard
      buckets={activity.buckets}
      items={activity.items}
      layout="grid"
      done={done}
      onComplete={onComplete}
    />
  );
}
