import { useCallback, useEffect, useState } from "react";
import type { Question } from "../content/types";
import { usePrefersReducedMotion } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { ProgressBar } from "../ui";
import QuestionView, { correctAnswerText } from "./QuestionView";
import { Rich, RichText } from "./RichText";

export interface GameResult {
  score: number;
  correct: number;
  total: number;
}

/** 計時闖關小遊戲：限時作答、連擊加分、3 條命 */
export default function QuizGame({
  questions,
  color = "#4f46e5",
  title = "闖關挑戰",
  seconds = 25,
  lives: startLives = 3,
  onFinish,
  onRestart,
  best,
}: {
  questions: Question[];
  color?: string;
  title?: string;
  seconds?: number;
  lives?: number;
  onFinish?: (r: GameResult) => void;
  onRestart?: () => void;
  best?: number;
}) {
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"ready" | "q" | "fb" | "over">("ready");
  const [i, setI] = useState(0);
  const [lives, setLives] = useState(startLives);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [left, setLeft] = useState(seconds);
  const [last, setLast] = useState<{ ok: boolean; points: number; timeout?: boolean } | null>(null);
  const q = questions[i];

  const answer = useCallback(
    (ok: boolean, timeout = false) => {
      if (phase !== "q" || !q) return;
      recordAnswer(q.id, ok);
      const mult = 1 + Math.min(combo, 4) * 0.25;
      const points = ok ? Math.round((100 + Math.max(0, left) * 4) * mult) : 0;
      setLast({ ok, points, timeout });
      if (ok) {
        setScore((s) => s + points);
        setCorrect((c) => c + 1);
        setCombo((c) => c + 1);
      } else {
        setCombo(0);
        setLives((l) => l - 1);
      }
      setPhase("fb");
    },
    [phase, q, combo, left, recordAnswer],
  );

  useEffect(() => {
    if (phase !== "q") return;
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 0.1)), 100);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "q" && left <= 0) answer(false, true);
  }, [left, phase, answer]);

  const finish = () => {
    setPhase("over");
    onFinish?.({ score, correct, total: questions.length });
  };

  const next = () => {
    if (lives <= 0 || i + 1 >= questions.length) {
      finish();
      return;
    }
    setI(i + 1);
    setLeft(seconds);
    setLast(null);
    setPhase("q");
  };

  if (questions.length === 0) return <p className="text-slate-500">題庫準備中。</p>;

  if (phase === "ready") {
    return (
      <div className="card mx-auto max-w-lg space-y-4 p-6 text-center">
        <p className={`text-6xl ${reduced ? "" : "animate-float"}`}>🎮</p>
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
          <li>
            📝 共 {questions.length} 題，每題 {seconds} 秒
          </li>
          <li>❤️ {startLives} 條命，答錯或超時扣 1 條</li>
          <li>🔥 連續答對有連擊加成，越快答分數越高</li>
        </ul>
        {best ? <p className="text-sm">🏅 目前最佳：{best} 分</p> : null}
        <button
          type="button"
          className="btn-primary px-8 text-base"
          onClick={() => setPhase("q")}
          data-testid="game-start"
        >
          開始挑戰！
        </button>
      </div>
    );
  }

  if (phase === "over") {
    const pct = correct / questions.length;
    const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct > 0 ? 1 : 0;
    return (
      <div
        className="card mx-auto max-w-lg animate-pop space-y-3 p-6 text-center"
        data-testid="game-over"
      >
        <p className="text-5xl">{lives <= 0 ? "💥" : "🏁"}</p>
        <h2 className="text-2xl font-extrabold">{lives <= 0 ? "生命用完了！" : "挑戰完成！"}</h2>
        <p className="text-3xl" role="img" aria-label={`${stars} 顆星`}>
          {"⭐".repeat(stars)}
          {"☆".repeat(3 - stars)}
        </p>
        <p className="text-lg">
          得分{" "}
          <span className="font-extrabold" style={{ color }}>
            {score}
          </span>
        </p>
        <p className="text-sm text-slate-500">
          答對 {correct} / {questions.length} 題
          {best !== undefined && score > best ? "　🎉 新紀錄！" : ""}
        </p>
        <p className="text-xs text-slate-500">答錯的題目已自動加入錯題本。</p>
        {onRestart && (
          <button type="button" className="btn-primary" onClick={onRestart}>
            再玩一次
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="card flex flex-wrap items-center gap-3 p-3 text-sm font-semibold">
        <span role="img" aria-label={`剩 ${lives} 條命`}>
          {"❤️".repeat(Math.max(0, lives))}
          {"🤍".repeat(Math.max(0, startLives - lives))}
        </span>
        <span className={combo >= 2 ? "text-orange-500" : "text-slate-400"}>🔥 連擊 ×{combo}</span>
        <span className="ml-auto">⭐ {score}</span>
        <span className="text-slate-500">
          {i + 1}/{questions.length}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs tabular-nums">
        ⏱️
        <ProgressBar
          value={left / seconds}
          color={left < 5 ? "#e11d48" : color}
          className="flex-1"
        />
        {Math.ceil(left)}s
      </div>
      <div className="card p-5">
        {q && (
          <QuestionView
            key={q.id}
            question={q}
            onAnswer={(ok) => answer(ok)}
            disabled={phase !== "q"}
            showExplain
            compact
          />
        )}
        {phase === "fb" && last?.timeout && q && (
          <div className="mt-3 rounded-xl bg-rose-50 p-3 text-sm dark:bg-rose-950/40" role="status">
            <p className="font-semibold">
              ⏰ 時間到！正確答案：
              <Rich text={correctAnswerText(q)} />
            </p>
            <RichText text={q.explain} className="mt-1" />
          </div>
        )}
        {phase === "fb" && last && (
          <div className="mt-4 flex items-center gap-3">
            {last.ok && (
              <span className="animate-pop font-bold text-emerald-600">+{last.points}</span>
            )}
            <button
              type="button"
              className="btn-primary ml-auto"
              onClick={next}
              data-testid="game-next"
            >
              {lives <= 0 || i + 1 >= questions.length ? "看結果" : "下一題 →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
