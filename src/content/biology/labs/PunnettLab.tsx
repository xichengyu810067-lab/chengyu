import { useState } from "react";
import { Feedback } from "../../../ui";
import type { LabProps } from "../../types";

/** 豌豆莖高度：高莖 T 對矮莖 t 為顯性 */
const GENOTYPES = ["TT", "Tt", "tt"] as const;
type Genotype = (typeof GENOTYPES)[number];

const TARGETS = [
  { key: "3:1", text: "高莖 : 矮莖 = 3 : 1" },
  { key: "1:1", text: "高莖 : 矮莖 = 1 : 1（試交）" },
];

const gametes = (g: Genotype): [string, string] => [g[0], g[1]];
const combine = (a: string, b: string) => (a === "T" ? a + b : b + a);
const isTall = (g: string) => g.includes("T");

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function ratioKey(tall: number, short: number): string {
  if (short === 0) return "all-tall";
  if (tall === 0) return "all-short";
  const d = gcd(tall, short);
  return `${tall / d}:${short / d}`;
}

function Pea({ x, y, tall, size = 1 }: { x: number; y: number; tall: boolean; size?: number }) {
  const h = (tall ? 46 : 20) * size;
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - h} stroke="#15803d" strokeWidth={3 * size} />
      <ellipse
        cx={x - 7 * size}
        cy={y - h * 0.45}
        rx={7 * size}
        ry={3.5 * size}
        fill="#4ade80"
        transform={`rotate(-25 ${x - 7 * size} ${y - h * 0.45})`}
      />
      <ellipse
        cx={x + 7 * size}
        cy={y - h * 0.7}
        rx={7 * size}
        ry={3.5 * size}
        fill="#4ade80"
        transform={`rotate(25 ${x + 7 * size} ${y - h * 0.7})`}
      />
      <circle cx={x} cy={y - h - 3 * size} r={4 * size} fill="#c084fc" />
    </g>
  );
}

function Picker({
  label,
  value,
  onPick,
}: {
  label: string;
  value: Genotype;
  onPick: (g: Genotype) => void;
}) {
  return (
    <fieldset className="space-y-1">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="flex gap-2">
        {GENOTYPES.map((g) => (
          <button
            key={g}
            type="button"
            className={
              value === g ? "btn-primary min-h-9 px-3 py-1" : "btn-ghost min-h-9 px-3 py-1"
            }
            aria-pressed={value === g}
            onClick={() => onPick(g)}
          >
            <span className="font-mono">{g}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** 棋盤方格法：選擇親代基因型，觀察子代基因型與表現型比例 */
export default function PunnettLab({ onComplete }: LabProps) {
  const [p1, setP1] = useState<Genotype>("TT");
  const [p2, setP2] = useState<Genotype>("tt");
  const [found, setFound] = useState<string[]>([]);

  const g1 = gametes(p1);
  const g2 = gametes(p2);
  const cells = g1.map((a) => g2.map((b) => combine(a, b)));
  const flat = cells.flat();
  const tall = flat.filter(isTall).length;
  const short = 4 - tall;
  const counts = {
    TT: flat.filter((g) => g === "TT").length,
    Tt: flat.filter((g) => g === "Tt").length,
    tt: flat.filter((g) => g === "tt").length,
  };
  const key = ratioKey(tall, short);
  const ratioText =
    key === "all-tall" ? "全部高莖" : key === "all-short" ? "全部矮莖" : key.replace(":", " : ");

  const pick = (which: 1 | 2, g: Genotype) => {
    const n1 = which === 1 ? g : p1;
    const n2 = which === 2 ? g : p2;
    if (which === 1) setP1(g);
    else setP2(g);
    const f = [...gametes(n1)].flatMap((a) => gametes(n2).map((b) => combine(a, b)));
    const k = ratioKey(f.filter(isTall).length, f.filter((x) => !isTall(x)).length);
    if (TARGETS.some((t) => t.key === k) && !found.includes(k)) {
      const next = [...found, k];
      setFound(next);
      if (next.length === TARGETS.length) onComplete();
    }
  };

  const X0 = 150;
  const Y0 = 90;
  const S = 110;
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          豌豆的莖：<strong>高莖（T）</strong>對<strong>矮莖（t）</strong>
          為顯性。選擇兩個親代的基因型。
        </p>
        <Picker label="親代 ♂ 的基因型" value={p1} onPick={(g) => pick(1, g)} />
        <Picker label="親代 ♀ 的基因型" value={p2} onPick={(g) => pick(2, g)} />
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">基因型比例</dt>
            <dd className="font-mono font-semibold">
              TT : Tt : tt = {counts.TT} : {counts.Tt} : {counts.tt}
            </dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">表現型（高莖 : 矮莖）</dt>
            <dd className="font-semibold">{ratioText}</dd>
          </div>
        </dl>
        <div className="text-sm">
          <p>🎯 任務：找出能得到下列子代比例的親代組合</p>
          <ul className="mt-1 space-y-1">
            {TARGETS.map((t) => (
              <li key={t.key}>
                {found.includes(t.key) ? "✅" : "⬜"} {t.text}
              </li>
            ))}
          </ul>
        </div>
        {found.length === TARGETS.length && (
          <Feedback ok>
            🎉 完成！Tt × Tt 得到 3 : 1；Tt × tt 得到 1 :
            1。用隱性個體（tt）和未知個體交配，就能判斷對方是 TT 還是 Tt，這稱為試交。
          </Feedback>
        )}
      </div>
      <svg
        viewBox="0 0 400 340"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`棋盤方格：${p1} × ${p2}，子代 ${flat.join("、")}`}
      >
        <rect x="0" y="0" width="400" height="340" fill="#f8fafc" />
        <text x="20" y="30" fontSize="13" fill="#1e293b">
          ♂ {p1} 的配子 ↓
        </text>
        <text x="390" y="30" fontSize="13" fill="#1e293b" textAnchor="end">
          ♀ {p2} 的配子 →
        </text>
        {g2.map((b, j) => (
          <g key={`c${b}${j}`}>
            <circle cx={X0 + S * j + S / 2} cy={Y0 - 30} r="18" fill="#fce7f3" stroke="#db2777" />
            <text
              x={X0 + S * j + S / 2}
              y={Y0 - 25}
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#1e293b"
            >
              {b}
            </text>
          </g>
        ))}
        {g1.map((a, i) => (
          <g key={`r${a}${i}`}>
            <circle cx={X0 - 40} cy={Y0 + S * i + S / 2} r="18" fill="#dbeafe" stroke="#2563eb" />
            <text
              x={X0 - 40}
              y={Y0 + S * i + S / 2 + 5}
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#1e293b"
            >
              {a}
            </text>
          </g>
        ))}
        {cells.map((row, i) =>
          row.map((g, j) => {
            const x = X0 + S * j;
            const y = Y0 + S * i;
            return (
              <g key={`${i}-${j}`}>
                <rect
                  x={x}
                  y={y}
                  width={S}
                  height={S}
                  fill={isTall(g) ? "#ecfccb" : "#fef3c7"}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                <text
                  x={x + 10}
                  y={y + 22}
                  fontSize="16"
                  fontWeight="700"
                  fill="#1e293b"
                  fontFamily="monospace"
                >
                  {g}
                </text>
                <text x={x + S - 8} y={y + 22} fontSize="12" fill="#475569" textAnchor="end">
                  {isTall(g) ? "高莖" : "矮莖"}
                </text>
                <Pea x={x + S / 2} y={y + S - 10} tall={isTall(g)} size={1.1} />
              </g>
            );
          }),
        )}
        <text x="20" y="80" fontSize="11" fill="#475569">
          親代
        </text>
        <Pea x={30} y={150} tall={isTall(p1)} size={0.9} />
        <text x="30" y="168" fontSize="11" textAnchor="middle" fill="#1e293b">
          ♂ {p1}
        </text>
        <Pea x={30} y={250} tall={isTall(p2)} size={0.9} />
        <text x="30" y="268" fontSize="11" textAnchor="middle" fill="#1e293b">
          ♀ {p2}
        </text>
      </svg>
    </div>
  );
}
