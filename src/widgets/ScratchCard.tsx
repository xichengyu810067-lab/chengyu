import { useCallback, useEffect, useRef, useState } from "react";
import type { ScratchActivity, ScratchCardData } from "../content/types";
import { canSpeak, speak } from "../lib/tts";
import { ProgressBar } from "../ui";
import { RichText } from "./RichText";
import type { WidgetProps } from "./types";

const REVEAL_RATIO = 0.55;

function ScratchSurface({
  revealed,
  onReveal,
  color,
}: {
  revealed: boolean;
  onReveal: () => void;
  color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const moves = useRef(0);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [supported, setSupported] = useState(true);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      setSupported(false);
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#cbd5e1");
    g.addColorStop(0.5, "#f1f5f9");
    g.addColorStop(1, "#94a3b8");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc((i * 53) % width, (i * 37) % height, 2 + (i % 4), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = color;
    ctx.font = "600 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ 用手指或滑鼠刮開 ✨", width / 2, height / 2);
  }, [color]);

  useEffect(() => {
    if (revealed) return;
    paint();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => paint());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [paint, revealed]);

  const ratioCleared = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return 1;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const stepX = Math.max(1, Math.floor(canvas.width / 40));
    const stepY = Math.max(1, Math.floor(canvas.height / 20));
    let total = 0;
    let clear = 0;
    for (let y = 0; y < canvas.height; y += stepY) {
      for (let x = 0; x < canvas.width; x += stepX) {
        total++;
        if (data[(y * canvas.width + x) * 4 + 3] < 40) clear++;
      }
    }
    return clear / total;
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 34;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const from = last.current ?? { x, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x + 0.1, y);
    ctx.stroke();
    last.current = { x, y };
    moves.current++;
    if (moves.current % 8 === 0 && ratioCleared() >= REVEAL_RATIO) onReveal();
  };

  if (revealed) return null;
  if (!supported) {
    return (
      <button
        type="button"
        onClick={onReveal}
        className="absolute inset-0 grid place-items-center rounded-xl bg-slate-300 font-semibold text-slate-700"
      >
        點擊揭曉答案
      </button>
    );
  }
  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden rounded-xl">
      <canvas
        ref={canvasRef}
        className="no-touch-scroll h-full w-full cursor-crosshair"
        aria-label="刮刮卡塗層，可刮開或按下方「直接揭曉」"
        role="img"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          last.current = null;
          scratchAt(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 0 && e.pointerType === "mouse") return;
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
          scratchAt(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          last.current = null;
          if (ratioCleared() >= REVEAL_RATIO) onReveal();
        }}
      />
    </div>
  );
}

function Card({
  card,
  revealed,
  onReveal,
  color,
  index,
}: {
  card: ScratchCardData;
  revealed: boolean;
  onReveal: () => void;
  color: string;
  index: number;
}) {
  return (
    <div className="card overflow-hidden" data-testid={`scratch-card-${index}`}>
      <div className="flex items-start justify-between gap-2 px-4 pt-3">
        <RichText text={card.front} className="font-semibold" />
        {card.speak && canSpeak() && (
          <button
            type="button"
            className="btn-ghost min-h-8 shrink-0 px-2 py-1"
            onClick={() => speak(card.speak as string, card.lang ?? "en-US")}
            aria-label={`朗讀：${card.speak}`}
          >
            🔊
          </button>
        )}
      </div>
      <div className="relative m-3 min-h-24">
        <div
          className={`rounded-xl bg-amber-50 p-3 text-sm transition dark:bg-amber-950/30 ${revealed ? "animate-pop" : ""}`}
          aria-hidden={!revealed}
        >
          <RichText text={card.back} />
        </div>
        <ScratchSurface revealed={revealed} onReveal={onReveal} color={color} />
      </div>
      {!revealed && (
        <div className="px-4 pb-3 text-right">
          <button
            type="button"
            className="text-xs text-slate-500 underline-offset-2 hover:underline"
            onClick={onReveal}
          >
            直接揭曉
          </button>
        </div>
      )}
    </div>
  );
}

export default function ScratchCards({
  activity,
  done,
  onComplete,
  ctx,
}: WidgetProps<ScratchActivity>) {
  const [revealed, setRevealed] = useState<boolean[]>(() => activity.cards.map(() => done));
  const [completed, setCompleted] = useState(done);
  const count = revealed.filter(Boolean).length;

  const reveal = (i: number) => {
    if (revealed[i]) return;
    const next = [...revealed];
    next[i] = true;
    setRevealed(next);
    if (!completed && next.every(Boolean)) {
      setCompleted(true);
      onComplete(1);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span>先在心裡想好答案，再刮開對照！</span>
        <ProgressBar
          value={count / activity.cards.length}
          color={ctx.color}
          className="ml-auto w-24"
        />
        {count}/{activity.cards.length}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {activity.cards.map((c, i) => (
          <Card
            key={i}
            index={i}
            card={c}
            revealed={revealed[i]}
            onReveal={() => reveal(i)}
            color={ctx.color}
          />
        ))}
      </div>
      {completed && <p className="text-sm font-semibold text-emerald-600">✅ 全部刮開了！</p>}
    </div>
  );
}
