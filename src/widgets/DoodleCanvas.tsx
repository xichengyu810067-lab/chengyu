import { useCallback, useEffect, useRef, useState } from "react";
import type { CanvasActivity, Stage, SubjectId } from "../content/types";
import { type AiError, aiErrorText, streamTutor, useAiStatus } from "../lib/ai";
import { useProgress } from "../lib/progress";
import { Feedback } from "../ui";
import { CompleteBar } from "./kit";
import { RichText } from "./RichText";
import type { WidgetProps } from "./types";

type Tool = "pen" | "marker" | "eraser" | "line" | "arrow" | "rect" | "circle";
type Bg = "blank" | "grid" | "axes" | "dots";
interface Stroke {
  tool: Tool;
  color: string;
  size: number;
  pts: [number, number][];
}

const W = 800;
const H = 500;
const COLORS = ["#1e293b", "#e11d48", "#2563eb", "#059669", "#d97706", "#7c3aed"];
const SIZES = [2, 4, 8];
const TOOLS: { id: Tool; icon: string; label: string }[] = [
  { id: "pen", icon: "✏️", label: "畫筆" },
  { id: "marker", icon: "🖍️", label: "螢光筆" },
  { id: "eraser", icon: "🧽", label: "橡皮擦" },
  { id: "line", icon: "📏", label: "直線" },
  { id: "arrow", icon: "➡️", label: "箭頭" },
  { id: "rect", icon: "▭", label: "方框" },
  { id: "circle", icon: "◯", label: "圓" },
];

function drawBackground(ctx: CanvasRenderingContext2D, bg: Bg, dark: boolean) {
  ctx.fillStyle = dark ? "#0f172a" : "#ffffff";
  ctx.fillRect(0, 0, W, H);
  const line = dark ? "#334155" : "#e2e8f0";
  if (bg === "grid" || bg === "axes") {
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }
  }
  if (bg === "dots") {
    ctx.fillStyle = dark ? "#475569" : "#cbd5e1";
    for (let x = 25; x < W; x += 25)
      for (let y = 25; y < H; y += 25) ctx.fillRect(x - 1, y - 1, 2, 2);
  }
  if (bg === "axes") {
    const cx = 400;
    const cy = 250;
    ctx.strokeStyle = dark ? "#94a3b8" : "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, cy);
    ctx.lineTo(W - 10, cy);
    ctx.moveTo(cx, H - 10);
    ctx.lineTo(cx, 10);
    ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.font = "13px system-ui";
    ctx.fillText("x", W - 20, cy - 8);
    ctx.fillText("y", cx + 8, 20);
    ctx.fillText("O", cx - 14, cy + 16);
    for (let i = -15; i <= 15; i++) {
      if (i === 0) continue;
      const x = cx + i * 25;
      ctx.beginPath();
      ctx.moveTo(x, cy - 4);
      ctx.lineTo(x, cy + 4);
      ctx.stroke();
      if (i % 2 === 0) ctx.fillText(String(i), x - 4, cy + 18);
    }
    for (let j = -9; j <= 9; j++) {
      if (j === 0) continue;
      const y = cy - j * 25;
      ctx.beginPath();
      ctx.moveTo(cx - 4, y);
      ctx.lineTo(cx + 4, y);
      ctx.stroke();
      if (j % 2 === 0) ctx.fillText(String(j), cx + 8, y + 4);
    }
  }
}

/** dark=true 時把預設的深色墨水改成淺色，才看得見 */
function drawStroke(ctx: CanvasRenderingContext2D, s: Stroke, dark = false) {
  if (s.pts.length === 0) return;
  const color = dark && s.color === COLORS[0] ? "#e2e8f0" : s.color;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = s.tool === "marker" ? s.size * 4 : s.tool === "eraser" ? s.size * 5 : s.size;
  if (s.tool === "marker") ctx.globalAlpha = 0.35;
  if (s.tool === "eraser") ctx.globalCompositeOperation = "destination-out";
  const [x0, y0] = s.pts[0];
  const [x1, y1] = s.pts[s.pts.length - 1];
  ctx.beginPath();
  if (s.tool === "pen" || s.tool === "marker" || s.tool === "eraser") {
    ctx.moveTo(x0, y0);
    if (s.pts.length === 1) ctx.lineTo(x0 + 0.1, y0);
    for (let i = 1; i < s.pts.length - 1; i++) {
      const [ax, ay] = s.pts[i];
      const [bx, by] = s.pts[i + 1];
      ctx.quadraticCurveTo(ax, ay, (ax + bx) / 2, (ay + by) / 2);
    }
    if (s.pts.length > 1) ctx.lineTo(x1, y1);
    ctx.stroke();
  } else if (s.tool === "line" || s.tool === "arrow") {
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    if (s.tool === "arrow") {
      const ang = Math.atan2(y1 - y0, x1 - x0);
      const len = 10 + s.size * 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 - len * Math.cos(ang - 0.45), y1 - len * Math.sin(ang - 0.45));
      ctx.lineTo(x1 - len * Math.cos(ang + 0.45), y1 - len * Math.sin(ang + 0.45));
      ctx.closePath();
      ctx.fill();
    }
  } else if (s.tool === "rect") {
    ctx.strokeRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0));
  } else if (s.tool === "circle") {
    ctx.ellipse(
      (x0 + x1) / 2,
      (y0 + y1) / 2,
      Math.abs(x1 - x0) / 2,
      Math.abs(y1 - y0) / 2,
      0,
      0,
      Math.PI * 2,
    );
    ctx.stroke();
  }
  ctx.restore();
}

function setupCanvas(c: HTMLCanvasElement | null) {
  if (!c) return null;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const scale = (c.clientWidth || W) / W;
  const pw = Math.round(W * scale * dpr);
  const ph = Math.round(H * scale * dpr);
  if (c.width !== pw || c.height !== ph) {
    c.width = pw;
    c.height = ph;
  }
  ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
  return ctx;
}

export interface DoodleCanvasProps {
  background?: Bg;
  task?: string;
  aiFeedback?: boolean;
  subject?: SubjectId;
  stage?: Stage;
  onDrawn?: () => void;
}

export function DoodleCanvas({
  background = "blank",
  task,
  aiFeedback,
  subject,
  stage,
  onDrawn,
}: DoodleCanvasProps) {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redo, setRedo] = useState<Stroke[]>([]);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [bg, setBg] = useState<Bg>(background);
  const current = useRef<Stroke | null>(null);
  const [supported, setSupported] = useState(true);
  const ai = useAiStatus();
  const [aiText, setAiText] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState<string | null>(null);
  const dark =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  const redraw = useCallback(() => {
    const b = setupCanvas(bgRef.current);
    const d = setupCanvas(drawRef.current);
    if (!b || !d) {
      setSupported(false);
      return;
    }
    drawBackground(b, bg, dark);
    d.clearRect(0, 0, W, H);
    for (const s of strokes) drawStroke(d, s, dark);
    if (current.current) drawStroke(d, current.current, dark);
  }, [bg, strokes, dark]);

  useEffect(() => {
    redraw();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => redraw());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [redraw]);

  const toLogical = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H];
  };

  /** 匯出為白底 PNG（筆劃與底圖合成；橡皮擦只擦筆劃層） */
  const exportPng = (maxW = W): string => {
    const ratio = Math.min(2, maxW / W);
    const out = document.createElement("canvas");
    out.width = Math.round(W * ratio);
    out.height = Math.round(H * ratio);
    const ctx = out.getContext("2d");
    const layer = document.createElement("canvas");
    layer.width = out.width;
    layer.height = out.height;
    const lctx = layer.getContext("2d");
    if (!ctx || !lctx) return "";
    ctx.scale(ratio, ratio);
    drawBackground(ctx, bg, false);
    lctx.scale(ratio, ratio);
    for (const s of strokes) drawStroke(lctx, s, false);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(layer, 0, 0);
    return out.toDataURL("image/png");
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = exportPng(1600);
    a.download = `學習星球畫布-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
  };

  const askAi = async () => {
    setAiBusy(true);
    setAiErr(null);
    setAiText("");
    try {
      const image = exportPng(800).replace(/^data:image\/png;base64,/, "");
      await streamTutor(
        { mode: "canvas", task: task ?? "自由創作", image, subject, stage },
        (_c, full) => setAiText(full),
      );
    } catch (e) {
      const err = e as AiError;
      setAiErr(err.message || aiErrorText(err.code));
      setAiText(null);
    } finally {
      setAiBusy(false);
    }
  };

  if (!supported) {
    return (
      <p className="rounded-xl bg-slate-100 p-4 text-sm dark:bg-slate-800">
        這個瀏覽器不支援畫布功能。
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-100 p-2 dark:bg-slate-800"
        role="toolbar"
        aria-label="畫布工具"
      >
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            title={t.label}
            aria-label={t.label}
            aria-pressed={tool === t.id}
            onClick={() => setTool(t.id)}
            className={`grid size-9 place-items-center rounded-lg text-base ${tool === t.id ? "bg-white shadow ring-2 ring-brand-400 dark:bg-slate-950" : "hover:bg-white/60 dark:hover:bg-slate-700"}`}
          >
            {t.icon}
          </button>
        ))}
        <span className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-600" aria-hidden />
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`顏色 ${c}`}
            aria-pressed={color === c}
            onClick={() => setColor(c)}
            className={`size-7 rounded-full border-2 ${color === c ? "scale-110 border-white ring-2 ring-brand-500" : "border-white/60"}`}
            style={{ background: c }}
          />
        ))}
        <span className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-600" aria-hidden />
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            aria-label={`粗細 ${s}`}
            aria-pressed={size === s}
            onClick={() => setSize(s)}
            className={`grid size-9 place-items-center rounded-lg ${size === s ? "bg-white shadow dark:bg-slate-950" : ""}`}
          >
            <span
              className="rounded-full bg-slate-700 dark:bg-slate-200"
              style={{ width: s + 3, height: s + 3 }}
            />
          </button>
        ))}
        <label className="ml-auto flex items-center gap-1 text-xs">
          底圖
          <select
            className="rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
            value={bg}
            onChange={(e) => setBg(e.target.value as Bg)}
          >
            <option value="blank">空白</option>
            <option value="grid">方格</option>
            <option value="axes">坐標</option>
            <option value="dots">點陣</option>
          </select>
        </label>
      </div>
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-2xl border border-slate-300 shadow-inner dark:border-slate-700"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <canvas ref={bgRef} className="absolute inset-0 h-full w-full" aria-hidden />
        <canvas
          ref={drawRef}
          className="no-touch-scroll absolute inset-0 h-full w-full cursor-crosshair"
          role="img"
          aria-label={`繪圖區（已畫 ${strokes.length} 筆）`}
          data-testid="doodle-canvas"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            current.current = { tool, color, size, pts: [toLogical(e)] };
            redraw();
          }}
          onPointerMove={(e) => {
            const cur = current.current;
            if (!cur || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
            const p = toLogical(e);
            if (cur.tool === "pen" || cur.tool === "marker" || cur.tool === "eraser")
              cur.pts.push(p);
            else cur.pts = [cur.pts[0], p];
            redraw();
          }}
          onPointerUp={() => {
            const cur = current.current;
            current.current = null;
            if (cur) {
              setStrokes((s) => [...s, cur]);
              setRedo([]);
              onDrawn?.();
            }
          }}
          onPointerCancel={() => {
            current.current = null;
            redraw();
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-secondary"
          disabled={!strokes.length}
          onClick={() => {
            setRedo((r) => [...r, strokes[strokes.length - 1]]);
            setStrokes((s) => s.slice(0, -1));
          }}
        >
          ↶ 復原
        </button>
        <button
          type="button"
          className="btn-secondary"
          disabled={!redo.length}
          onClick={() => {
            setStrokes((s) => [...s, redo[redo.length - 1]]);
            setRedo((r) => r.slice(0, -1));
          }}
        >
          ↷ 重做
        </button>
        <button
          type="button"
          className="btn-ghost"
          disabled={!strokes.length}
          onClick={() => {
            setStrokes([]);
            setRedo([]);
          }}
        >
          🗑️ 清空
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={download}
          disabled={!strokes.length}
        >
          💾 下載 PNG
        </button>
        {aiFeedback && ai?.available && (
          <button
            type="button"
            className="btn-primary"
            onClick={askAi}
            disabled={!strokes.length || aiBusy}
          >
            {aiBusy ? "AI 看圖中…" : "🤖 請 AI 看看"}
          </button>
        )}
      </div>
      {aiErr && <Feedback ok={false}>{aiErr}</Feedback>}
      {aiText !== null && (
        <div className="card p-4 text-sm" aria-live="polite">
          <p className="mb-1 font-semibold">🤖 AI 回饋（僅供參考）</p>
          {aiText ? <RichText text={aiText} /> : <span className="text-slate-500">思考中…</span>}
        </div>
      )}
    </div>
  );
}

export default function CanvasWidget({
  activity,
  done,
  onComplete,
  ctx,
}: WidgetProps<CanvasActivity>) {
  const [drawn, setDrawn] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const bumpUsage = useProgress((s) => s.bumpUsage);
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
        <span className="font-semibold">✍️ 任務：</span>
        <RichText text={activity.task} inline />
        {activity.hint && (
          <p className="mt-1 text-slate-500">
            💡 <RichText text={activity.hint} inline />
          </p>
        )}
      </div>
      <DoodleCanvas
        background={activity.background}
        task={activity.task}
        aiFeedback={activity.aiFeedback}
        subject={ctx.subject}
        stage={ctx.stage}
        onDrawn={() => setDrawn(true)}
      />
      {activity.reference && (
        <div>
          <button
            type="button"
            className="btn-ghost px-2"
            onClick={() => setShowRef((v) => !v)}
            aria-expanded={showRef}
          >
            {showRef ? "▾" : "▸"} 參考答案
          </button>
          {showRef && (
            <RichText
              text={activity.reference}
              className="mt-1 rounded-xl bg-emerald-50 p-3 text-sm dark:bg-emerald-950/30"
            />
          )}
        </div>
      )}
      <CompleteBar
        done={done}
        disabled={!drawn}
        hint={drawn ? undefined : "先在畫布上畫畫看"}
        onComplete={() => {
          bumpUsage("canvas");
          onComplete();
        }}
        label="畫好了，完成"
      />
    </div>
  );
}
