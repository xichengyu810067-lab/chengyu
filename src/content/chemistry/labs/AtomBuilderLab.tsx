import { useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/** 原子序 1～20 的元素符號與中文名稱 */
const ELEMENTS: [string, string][] = [
  ["H", "氫"],
  ["He", "氦"],
  ["Li", "鋰"],
  ["Be", "鈹"],
  ["B", "硼"],
  ["C", "碳"],
  ["N", "氮"],
  ["O", "氧"],
  ["F", "氟"],
  ["Ne", "氖"],
  ["Na", "鈉"],
  ["Mg", "鎂"],
  ["Al", "鋁"],
  ["Si", "矽"],
  ["P", "磷"],
  ["S", "硫"],
  ["Cl", "氯"],
  ["Ar", "氬"],
  ["K", "鉀"],
  ["Ca", "鈣"],
];

type Atom = { p: number; n: number; e: number };

const TASKS: { id: string; text: string; test: (a: Atom) => boolean }[] = [
  {
    id: "c12",
    text: "中性的碳-12 原子",
    test: (a) => a.p === 6 && a.n === 6 && a.e === 6,
  },
  {
    id: "c14",
    text: "碳-14 原子（碳-12 的同位素，電中性）",
    test: (a) => a.p === 6 && a.n === 8 && a.e === 6,
  },
  {
    id: "na",
    text: "鈉離子 ²³Na⁺（質量數 23）",
    test: (a) => a.p === 11 && a.n === 12 && a.e === 10,
  },
];

/** 離子電荷的右上標，例如 2+、−（1 省略不寫） */
function chargeLabel(q: number) {
  if (q === 0) return "";
  return `${Math.abs(q) === 1 ? "" : Math.abs(q)}${q > 0 ? "+" : "−"}`;
}

/** 波耳模型：依 2、8、8、… 的順序把電子排入電子層 */
function shells(e: number): number[] {
  const cap = [2, 8, 8, 8];
  const out: number[] = [];
  let left = e;
  for (const c of cap) {
    if (left <= 0) break;
    out.push(Math.min(c, left));
    left -= c;
  }
  return out;
}

export default function AtomBuilderLab({ onComplete }: LabProps) {
  const [atom, setAtom] = useState<Atom>({ p: 3, n: 4, e: 3 });
  const [done, setDone] = useState<string[]>([]);
  const [sym, name] = ELEMENTS[atom.p - 1];
  const A = atom.p + atom.n;
  const q = atom.p - atom.e;
  const unusual = Math.abs(q) > 3;

  const update = (next: Atom) => {
    setAtom(next);
    const hit = TASKS.filter((t) => t.test(next) && !done.includes(t.id)).map((t) => t.id);
    if (hit.length) {
      const all = [...done, ...hit];
      setDone(all);
      if (all.length === TASKS.length) onComplete();
    }
  };

  const R = [42, 70, 98, 126];
  const C = 150;
  const layers = shells(atom.e);

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-4">
        <ParamSlider
          label="質子數 p（＋）"
          min={1}
          max={20}
          step={1}
          value={atom.p}
          onChange={(v) => update({ ...atom, p: v })}
          color="#e11d48"
        />
        <ParamSlider
          label="中子數 n（不帶電）"
          min={0}
          max={24}
          step={1}
          value={atom.n}
          onChange={(v) => update({ ...atom, n: v })}
          color="#64748b"
        />
        <ParamSlider
          label="電子數 e（－）"
          min={0}
          max={20}
          step={1}
          value={atom.e}
          onChange={(v) => update({ ...atom, e: v })}
          color="#2563eb"
        />
        <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
          <p className="text-3xl font-bold" aria-live="polite">
            <span className="align-super text-base">{A}</span>
            {sym}
            <span className="align-super text-base">{chargeLabel(q)}</span>
          </p>
          <p className="mt-1">
            {name}
            {q === 0 ? "原子" : "離子"}（原子序 {atom.p}）　質量數 A = p + n = <strong>{A}</strong>
          </p>
          <p>
            電荷 = p − e = <strong>{q > 0 ? `+${q}` : q}</strong>
            {q > 0 ? "（失去電子，帶正電）" : q < 0 ? "（得到電子，帶負電）" : "（電中性）"}
          </p>
          <p>電子排列：{layers.length ? layers.join("、") : "沒有電子"}</p>
          {unusual && (
            <p className="text-rose-600 dark:text-rose-400">
              ⚠️ 電荷這麼大的離子極不穩定，自然界很少見。
            </p>
          )}
        </div>
        <div className="text-sm">
          <p className="font-semibold">🎯 任務：依序做出下列粒子（已完成 {done.length}/3）</p>
          <ul className="mt-1 space-y-1">
            {TASKS.map((t) => (
              <li key={t.id}>
                {done.includes(t.id) ? "✅" : "⬜"} {t.text}
              </li>
            ))}
          </ul>
        </div>
        {done.length === TASKS.length && (
          <Feedback ok>🎉 全部完成！質子數決定元素、中子數決定同位素、電子數決定電荷。</Feedback>
        )}
      </div>
      <svg
        viewBox="0 0 300 300"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`${name}：${atom.p} 個質子、${atom.n} 個中子、${atom.e} 個電子`}
      >
        <rect x="0" y="0" width="300" height="300" fill="#f8fafc" />
        {R.slice(0, Math.max(1, layers.length)).map((r) => (
          <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="#cbd5e1" strokeDasharray="4 4" />
        ))}
        <circle cx={C} cy={C} r="26" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
        <text x={C} y={C - 3} fontSize="12" fontWeight="700" textAnchor="middle" fill="#9f1239">
          {atom.p} p⁺
        </text>
        <text x={C} y={C + 13} fontSize="12" fontWeight="700" textAnchor="middle" fill="#334155">
          {atom.n} n
        </text>
        {layers.map((count, li) =>
          Array.from({ length: count }, (_, k) => {
            const ang = (2 * Math.PI * k) / count - Math.PI / 2 + li * 0.3;
            return (
              <circle
                key={`e${li}-${k}`}
                cx={C + R[li] * Math.cos(ang)}
                cy={C + R[li] * Math.sin(ang)}
                r="6"
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            );
          }),
        )}
        <text x="10" y="290" fontSize="11" fill="#475569">
          波耳模型示意圖（非真實比例）
        </text>
      </svg>
    </div>
  );
}
