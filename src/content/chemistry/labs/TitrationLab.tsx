import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider, Plot } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 酸鹼滴定：以 0.100 M NaOH 滴定 25.0 mL、0.100 M 的鹽酸或醋酸。
 * pH 由電荷平衡 [H+] + [Na+] = [A−] + [OH−] 以二分法精確求得。
 */
const VA = 25.0;
const CA = 0.1;
const CB = 0.1;
const KW = 1e-14;
const V_EQ = (CA * VA) / CB;

type AcidId = "strong" | "weak";
const ACIDS: Record<AcidId, { name: string; ka: number }> = {
  strong: { name: "鹽酸 HCl（強酸）", ka: 1e8 },
  weak: { name: "醋酸 CH₃COOH（弱酸，Ka = 1.8×10⁻⁵）", ka: 1.8e-5 },
};

function titrationPH(acid: AcidId, v: number): number {
  const vt = VA + v;
  const ct = (CA * VA) / vt;
  const na = (CB * v) / vt;
  const ka = ACIDS[acid].ka;
  let lo = -15;
  let hi = 1;
  for (let i = 0; i < 70; i++) {
    const mid = (lo + hi) / 2;
    const h = 10 ** mid;
    const f = h + na - (ct * ka) / (ka + h) - KW / h;
    if (f > 0) hi = mid;
    else lo = mid;
  }
  return -(lo + hi) / 2;
}

/** 酚酞：pH 8.2 以下無色，8.2～10 漸變為粉紅，10 以上為紅色 */
function phenolphthalein(pH: number): { color: string; text: string } {
  if (pH < 8.2) return { color: "#f1f5f9", text: "無色" };
  if (pH < 10) {
    const t = (pH - 8.2) / 1.8;
    const g = Math.round(220 - t * 150);
    const b = Math.round(235 - t * 60);
    return { color: `rgb(244,${g},${b})`, text: "粉紅色" };
  }
  return { color: "#db2777", text: "紅色" };
}

export default function TitrationLab({ onComplete }: LabProps) {
  const [acid, setAcid] = useState<AcidId>("strong");
  const [v, setV] = useState(0);
  const [marked, setMarked] = useState<Partial<Record<AcidId, number>>>({});
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const pH = titrationPH(acid, v);
  const ind = phenolphthalein(pH);
  const done = Boolean(marked.strong !== undefined && marked.weak !== undefined);

  const choose = (a: AcidId) => {
    setAcid(a);
    setV(0);
    setMsg(null);
  };
  const add = (dv: number) =>
    setV((x) => Math.min(50, Math.max(0, Math.round((x + dv) * 10) / 10)));

  const mark = () => {
    if (Math.abs(v - V_EQ) <= 0.2) {
      const next = { ...marked, [acid]: pH };
      setMarked(next);
      setMsg({
        ok: true,
        text: `找到了！當量點約在 ${fmt(V_EQ, 1)} mL，此時 pH ≈ ${fmt(titrationPH(acid, V_EQ), 2)}。`,
      });
      if (next.strong !== undefined && next.weak !== undefined && !done) onComplete();
    } else {
      setMsg({
        ok: false,
        text:
          v < V_EQ
            ? "還沒到當量點：溶液中還有沒被中和的酸。觀察 pH 曲線，找出 pH 急遽上升的地方。"
            : "超過當量點了：NaOH 已經過量。可以把滴定管讀數往回調一點。",
      });
    }
  };

  // 滴定管液面：0 mL 在上方
  const level = 30 + (v / 50) * 150;

  return (
    <div className="space-y-4">
      <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">選擇待測的酸</legend>
        {(Object.keys(ACIDS) as AcidId[]).map((a) => (
          <button
            key={a}
            type="button"
            className={a === acid ? "btn-primary" : "btn-ghost"}
            onClick={() => choose(a)}
            aria-pressed={a === acid}
          >
            {marked[a] !== undefined ? "✅ " : ""}
            {ACIDS[a].name}
          </button>
        ))}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="space-y-3">
          <ParamSlider
            label="加入的 0.100 M NaOH 體積"
            min={0}
            max={50}
            step={0.1}
            unit="mL"
            value={v}
            onChange={(x) => setV(x)}
            color="#7c3aed"
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-ghost" onClick={() => add(-0.1)}>
              −0.1 mL
            </button>
            <button type="button" className="btn-ghost" onClick={() => add(0.1)}>
              ＋0.1 mL（約 2 滴）
            </button>
            <button type="button" className="btn-ghost" onClick={() => add(1)}>
              ＋1 mL
            </button>
          </div>
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 120 230"
              className="h-48 w-auto"
              role="img"
              aria-label={`錐形瓶中溶液呈${ind.text}`}
            >
              <rect x="0" y="0" width="120" height="230" fill="#f8fafc" />
              <rect x="54" y="20" width="12" height="165" fill="#ffffff" stroke="#64748b" />
              <rect x="55" y={level} width="10" height={Math.max(0, 184 - level)} fill="#ddd6fe" />
              <rect x="46" y="185" width="28" height="6" fill="#475569" />
              <polygon points="57,191 63,191 61,205 59,205" fill="#cbd5e1" />
              <polygon
                points="50,206 70,206 104,226 16,226"
                fill={ind.color}
                stroke="#475569"
                strokeWidth="2"
              />
            </svg>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-xs text-slate-500">pH</dt>
                <dd className="font-mono text-2xl font-bold" aria-live="polite">
                  {fmt(pH, 2)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">酚酞顏色</dt>
                <dd className="font-semibold">{ind.text}</dd>
              </div>
            </dl>
          </div>
          <button type="button" className="btn-success" onClick={mark}>
            📍 標記當量點
          </button>
          {msg && <Feedback ok={msg.ok}>{msg.text}</Feedback>}
          <p className="text-sm">
            🎯 任務：分別找出<strong>鹽酸</strong>與<strong>醋酸</strong>的當量點（誤差 0.2 mL
            以內），並比較兩者當量點的 pH。
          </p>
          {done && (
            <Feedback ok>
              🎉 完成！強酸的當量點 pH = 7；弱酸的當量點因醋酸根水解呈鹼性（pH ≈
              8.7），所以要選酚酞當指示劑。
            </Feedback>
          )}
        </div>
        <div className="min-w-0">
          <Plot
            x={[0, 50]}
            y={[0, 14]}
            xLabel="NaOH 體積（mL）"
            yLabel="pH"
            fns={[
              {
                label: ACIDS[acid].name,
                color: acid === "strong" ? "#2563eb" : "#e11d48",
                f: (x) => (x <= v + 1e-9 ? titrationPH(acid, x) : Number.NaN),
              },
            ]}
            points={[{ x: v, y: pH, label: `pH ${fmt(pH, 2)}`, color: "#7c3aed" }]}
            vlines={
              marked[acid] !== undefined ? [{ x: V_EQ, label: "當量點", color: "#059669" }] : []
            }
            title={`滴定曲線：已加入 ${fmt(v, 1)} mL，pH ${fmt(pH, 2)}`}
          />
        </div>
      </div>
    </div>
  );
}
