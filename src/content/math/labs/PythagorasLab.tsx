import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

type P = [number, number];

/** 畢氏定理：調整兩股長，看三個正方形面積的關係，找出整數勾股數 */
export default function PythagorasLab({ onComplete }: LabProps) {
  const [a, setA] = useState(2);
  const [b, setB] = useState(5);
  const [found, setFound] = useState<string[]>([]);
  const c = Math.hypot(a, b);
  const isTriple =
    Number.isInteger(Math.round(c * 1e9) / 1e9) && Math.abs(c - Math.round(c)) < 1e-9;

  const update = (na: number, nb: number) => {
    setA(na);
    setB(nb);
    const nc = Math.hypot(na, nb);
    if (Math.abs(nc - Math.round(nc)) < 1e-9) {
      const key = [na, nb]
        .sort((x, y) => x - y)
        .concat(Math.round(nc))
        .join("-");
      if (!found.includes(key)) {
        const next = [...found, key];
        setFound(next);
        if (next.length === 2) onComplete();
      }
    }
  };

  // 以直角頂點為原點：A(0,0)、B(a,0)、C(0,b)；正方形向外
  const A: P = [0, 0];
  const B: P = [a, 0];
  const C: P = [0, b];
  const sqA: P[] = [A, B, [a, -a], [0, -a]];
  const sqB: P[] = [A, C, [-b, b], [-b, 0]];
  const n: P = [b / c, a / c]; // 斜邊的外法向量
  const sqC: P[] = [B, C, [C[0] + n[0] * c, C[1] + n[1] * c], [B[0] + n[0] * c, B[1] + n[1] * c]];
  const all = [...sqA, ...sqB, ...sqC];
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  const W = 400;
  const H = 320;
  const s = Math.min((W - 40) / (maxX - minX), (H - 40) / (maxY - minY));
  const tx = (p: P) => `${20 + (p[0] - minX) * s},${H - 20 - (p[1] - minY) * s}`;
  const poly = (pts: P[]) => pts.map(tx).join(" ");
  const center = (pts: P[]) => {
    const x = pts.reduce((t, p) => t + p[0], 0) / pts.length;
    const y = pts.reduce((t, p) => t + p[1], 0) / pts.length;
    return { x: 20 + (x - minX) * s, y: H - 20 - (y - minY) * s };
  };
  const label = (pts: P[], text: string, color: string) => {
    const p = center(pts);
    return (
      <text
        x={p.x}
        y={p.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="700"
        fill={color}
      >
        {text}
      </text>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <ParamSlider
          label="股 a"
          min={1}
          max={12}
          step={1}
          value={a}
          onChange={(v) => update(v, b)}
          color="#2563eb"
        />
        <ParamSlider
          label="股 b"
          min={1}
          max={12}
          step={1}
          value={b}
          onChange={(v) => update(a, v)}
          color="#059669"
        />
        <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
          <p>
            a² + b² = {a * a} + {b * b} = <strong>{a * a + b * b}</strong>
          </p>
          <p>
            c² = {fmt(c * c, 2)}　→　c ={" "}
            {isTriple ? <strong className="text-emerald-600">{Math.round(c)}</strong> : fmt(c, 3)}
          </p>
        </div>
        <p className="text-sm">
          🎯 任務：找出 <strong>2 組</strong>三邊都是整數的直角三角形（勾股數）。
        </p>
        <p className="text-sm text-slate-500">已找到：{found.length ? found.join("、") : "尚無"}</p>
        {found.length >= 2 && <Feedback ok>🎉 太棒了！你發現了勾股數的規律。</Feedback>}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`直角三角形，兩股 ${a} 與 ${b}，斜邊約 ${fmt(c, 2)}`}
      >
        <polygon points={poly(sqA)} fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
        <polygon points={poly(sqB)} fill="#bbf7d0" stroke="#059669" strokeWidth="2" />
        <polygon points={poly(sqC)} fill="#fde68a" stroke="#d97706" strokeWidth="2" opacity="0.9" />
        <polygon points={poly([A, B, C])} fill="#f8fafc" stroke="#1e293b" strokeWidth="2.5" />
        {label(sqA, `a² = ${a * a}`, "#1d4ed8")}
        {label(sqB, `b² = ${b * b}`, "#047857")}
        {label(sqC, `c² = ${fmt(c * c, 1)}`, "#b45309")}
      </svg>
    </div>
  );
}
