import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

type Kind = "small" | "equal" | "large" | "none" | "virtual";

const KIND_LABEL: Record<Kind, string> = {
  small: "倒立、縮小的實像",
  equal: "倒立、等大的實像",
  large: "倒立、放大的實像",
  none: "不成像（折射光互相平行）",
  virtual: "正立、放大的虛像",
};

const GOALS: { kind: Kind; text: string }[] = [
  { kind: "small", text: "倒立縮小實像（照相機）" },
  { kind: "large", text: "倒立放大實像（投影機）" },
  { kind: "virtual", text: "正立放大虛像（放大鏡）" },
];

function classify(p: number, f: number): Kind {
  if (p > 2 * f) return "small";
  if (p === 2 * f) return "equal";
  if (p > f) return "large";
  if (p === f) return "none";
  return "virtual";
}

const W = 440;
const H = 260;
const X0 = 220; // 透鏡位置
const Y0 = 130; // 主軸
const S = 4.5; // 每公分幾 px
const HO = 36; // 物高（px）

/** 凸透鏡成像：改變物距，觀察像的位置、大小與正倒 */
export default function ConvexLensLab({ onComplete }: LabProps) {
  const [p, setP] = useState(30);
  const [f, setF] = useState(10);
  const [found, setFound] = useState<Kind[]>([]);
  const kind = classify(p, f);

  const update = (np: number, nf: number) => {
    setP(np);
    setF(nf);
    const k = classify(np, nf);
    if (GOALS.some((g) => g.kind === k) && !found.includes(k)) {
      const next = [...found, k];
      setFound(next);
      if (GOALS.every((g) => next.includes(g.kind))) onComplete();
    }
  };

  const hasImage = p !== f;
  const q = hasImage ? (p * f) / (p - f) : Number.POSITIVE_INFINITY;
  const m = hasImage ? -q / p : Number.NaN; // 放大率（負號表示倒立）
  const xo = X0 - p * S;
  const tip = { x: xo, y: Y0 - HO };
  const img = { x: X0 + q * S, y: Y0 - m * HO };
  const far = W + 200;

  // 光線 1：平行主軸 → 折射後通過右側焦點
  const r1End = { x: far, y: Y0 - HO + (HO * (far - X0)) / (f * S) };
  // 光線 2：通過光心直進
  const r2End = { x: far, y: Y0 + (HO * (far - X0)) / (X0 - xo) };
  const imgVisible = hasImage && img.x > 0 && img.x < W && img.y > -20 && img.y < H + 20;
  const done = found.length === GOALS.length;

  return (
    <div className="space-y-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`凸透鏡焦距 ${f} 公分，物距 ${p} 公分，成像：${KIND_LABEL[kind]}`}
      >
        <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
        <line x1="0" x2={W} y1={Y0} y2={Y0} stroke="#94a3b8" strokeWidth="1.5" />
        {[-2, -1, 1, 2].map((k) => (
          <g key={k}>
            <circle cx={X0 + k * f * S} cy={Y0} r="3.5" fill="#475569" />
            <text x={X0 + k * f * S} y={Y0 + 18} fontSize="11" textAnchor="middle" fill="#475569">
              {Math.abs(k) === 2 ? "2F" : "F"}
            </text>
          </g>
        ))}
        <ellipse
          cx={X0}
          cy={Y0}
          rx="9"
          ry="100"
          fill="#bae6fd"
          stroke="#0284c7"
          strokeWidth="2"
          opacity="0.8"
        />
        {/* 光線 */}
        <polyline
          points={`${tip.x},${tip.y} ${X0},${tip.y} ${r1End.x},${r1End.y}`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <polyline
          points={`${tip.x},${tip.y} ${r2End.x},${r2End.y}`}
          fill="none"
          stroke="#e11d48"
          strokeWidth="2"
        />
        {kind === "virtual" && (
          <g stroke="#94a3b8" strokeDasharray="5 4" strokeWidth="1.5">
            <line x1={X0} y1={tip.y} x2={img.x} y2={img.y} />
            <line x1={tip.x} y1={tip.y} x2={img.x} y2={img.y} />
          </g>
        )}
        {/* 物體 */}
        <line x1={xo} y1={Y0} x2={xo} y2={tip.y + 6} stroke="#1d4ed8" strokeWidth="4" />
        <polygon
          points={`${xo},${tip.y} ${xo - 7},${tip.y + 10} ${xo + 7},${tip.y + 10}`}
          fill="#1d4ed8"
        />
        <text x={xo} y={Y0 + 34} fontSize="11" textAnchor="middle" fill="#1d4ed8">
          物體
        </text>
        {/* 像 */}
        {imgVisible && (
          <g opacity={kind === "virtual" ? 0.65 : 1}>
            <line
              x1={img.x}
              y1={Y0}
              x2={img.x}
              y2={img.y + (img.y < Y0 ? 6 : -6)}
              stroke="#7c3aed"
              strokeWidth="4"
              strokeDasharray={kind === "virtual" ? "5 3" : undefined}
            />
            <polygon
              points={
                img.y < Y0
                  ? `${img.x},${img.y} ${img.x - 7},${img.y + 10} ${img.x + 7},${img.y + 10}`
                  : `${img.x},${img.y} ${img.x - 7},${img.y - 10} ${img.x + 7},${img.y - 10}`
              }
              fill="#7c3aed"
            />
            <text
              x={img.x}
              y={img.y < Y0 ? Y0 + 34 : Y0 - 8}
              fontSize="11"
              textAnchor="middle"
              fill="#6d28d9"
            >
              {kind === "virtual" ? "虛像" : "實像"}
            </text>
          </g>
        )}
        {hasImage && !imgVisible && (
          <text x={W - 8} y="20" fontSize="12" textAnchor="end" fill="#6d28d9">
            像在畫面之外（很遠、很大）
          </text>
        )}
      </svg>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <ParamSlider
            label="物距 p"
            min={2}
            max={40}
            step={1}
            unit="cm"
            value={p}
            onChange={(v) => update(v, f)}
            color="#1d4ed8"
          />
          <ParamSlider
            label="焦距 f"
            min={6}
            max={12}
            step={1}
            unit="cm"
            value={f}
            onChange={(v) => update(p, v)}
            color="#0284c7"
          />
        </div>
        <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
          <p>
            像距 q：
            {hasImage
              ? q > 0
                ? `${fmt(q, 1)} cm（透鏡另一側）`
                : `${fmt(-q, 1)} cm（與物體同側）`
              : "無限遠"}
          </p>
          <p>像的大小：{hasImage ? `物體的 ${fmt(Math.abs(m), 2)} 倍` : "—"}</p>
          <p className="mt-1 font-semibold text-violet-700 dark:text-violet-300">
            成像：{KIND_LABEL[kind]}
          </p>
        </div>
      </div>
      <div className="text-sm">
        <p>🎯 任務：移動物體，找出凸透鏡的三種成像。</p>
        <ul className="mt-1 space-y-0.5">
          {GOALS.map((g) => (
            <li key={g.kind}>
              {found.includes(g.kind) ? "✅" : "⬜"} {g.text}
            </li>
          ))}
        </ul>
      </div>
      {done && (
        <Feedback ok>
          🎉 全部找到了！物體在 2F 外成縮小實像、在 F 與 2F 之間成放大實像、在 F
          以內成正立放大虛像。
        </Feedback>
      )}
    </div>
  );
}
