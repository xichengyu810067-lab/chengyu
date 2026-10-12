import { useRef, useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

interface Poem {
  name: string;
  title: string;
  author: string;
  lines: string[];
  /** 押韻的句子（從 0 起算） */
  rhyme: number[];
  rhymeNote: string;
}

/** 四種近體詩格式與範例（皆為唐詩） */
const POEMS: Record<string, Poem> = {
  "5x4": {
    name: "五言絕句",
    title: "〈登鸛雀樓〉",
    author: "唐・王之渙",
    lines: ["白日依山盡", "黃河入海流", "欲窮千里目", "更上一層樓"],
    rhyme: [1, 3],
    rhymeNote: "第二、四句押韻：流、樓。",
  },
  "7x4": {
    name: "七言絕句",
    title: "〈早發白帝城〉",
    author: "唐・李白",
    lines: ["朝辭白帝彩雲間", "千里江陵一日還", "兩岸猿聲啼不住", "輕舟已過萬重山"],
    rhyme: [0, 1, 3],
    rhymeNote: "首句也入韻：間、還、山。七言詩首句常常入韻。",
  },
  "5x8": {
    name: "五言律詩",
    title: "〈春望〉",
    author: "唐・杜甫",
    lines: [
      "國破山河在",
      "城春草木深",
      "感時花濺淚",
      "恨別鳥驚心",
      "烽火連三月",
      "家書抵萬金",
      "白頭搔更短",
      "渾欲不勝簪",
    ],
    rhyme: [1, 3, 5, 7],
    rhymeNote: "偶數句押韻：深、心、金、簪（古音同韻）。",
  },
  "7x8": {
    name: "七言律詩",
    title: "〈登高〉",
    author: "唐・杜甫",
    lines: [
      "風急天高猿嘯哀",
      "渚清沙白鳥飛回",
      "無邊落木蕭蕭下",
      "不盡長江滾滾來",
      "萬里悲秋常作客",
      "百年多病獨登臺",
      "艱難苦恨繁霜鬢",
      "潦倒新停濁酒杯",
    ],
    rhyme: [0, 1, 3, 5, 7],
    rhymeNote: "首句入韻：哀、回、來、臺、杯。",
  },
};

const KEYS = ["5x4", "7x4", "5x8", "7x8"];
const LIAN = ["首聯", "頷聯", "頸聯", "尾聯"];
const JUE = ["起", "承", "轉", "合"];

function verdict(chars: number, lines: number): string {
  if (chars !== 5 && chars !== 7) {
    return chars === 4
      ? "每句四個字是《詩經》常見的句式。近體詩每句固定是五個字或七個字。"
      : "近體詩每句固定是五個字（五言）或七個字（七言）。";
  }
  if (lines >= 10) return "十句以上、中間各聯都要對仗的詩稱為「排律」，不屬於絕句或律詩。";
  return "近體詩的句數是固定的：絕句四句、律詩八句。";
}

const CELL = 28;

/** 近體詩格式實驗室：調整每句字數與句數，找出四種近體詩 */
export default function PoetryFormLab({ onComplete }: LabProps) {
  const [chars, setChars] = useState(4);
  const [lines, setLines] = useState(6);
  const [found, setFound] = useState<string[]>([]);
  const doneRef = useRef(false);
  const key = `${chars}x${lines}`;
  const poem = POEMS[key];
  const isLu = lines === 8;

  const update = (c: number, l: number) => {
    setChars(c);
    setLines(l);
    const k = `${c}x${l}`;
    if (POEMS[k] && !found.includes(k)) {
      const next = [...found, k];
      setFound(next);
      if (next.length === KEYS.length && !doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    }
  };

  const left = 58;
  const top = 14;
  const W = left + 8 * CELL + 14;
  const H = top + Math.max(lines, 8) * CELL + 10;
  const x0 = left + ((8 - chars) * CELL) / 2;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-4">
        <ParamSlider
          label="每句字數"
          min={4}
          max={8}
          step={1}
          value={chars}
          onChange={(v) => update(v, lines)}
          color="#c2410c"
        />
        <ParamSlider
          label="全詩句數"
          min={2}
          max={12}
          step={2}
          value={lines}
          onChange={(v) => update(chars, v)}
          color="#7c3aed"
        />
        <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800" aria-live="polite">
          {poem ? (
            <>
              <p className="text-base font-bold text-orange-700 dark:text-orange-300">
                {poem.name}
              </p>
              <p>
                範例：{poem.author}
                {poem.title}
              </p>
              <p className="mt-1">押韻：{poem.rhymeNote}</p>
              {isLu ? (
                <p className="mt-1">律詩八句分四聯，中間的頷聯、頸聯必須對仗（綠色底）。</p>
              ) : (
                <p className="mt-1">絕句四句常依「起、承、轉、合」安排，不要求對仗。</p>
              )}
            </>
          ) : (
            <p>{verdict(chars, lines)}</p>
          )}
        </div>
        <p className="text-sm">
          🎯 任務：調整拉桿，找出<strong>四種</strong>近體詩格式（五絕、七絕、五律、七律）。
        </p>
        <p className="text-sm text-slate-500">
          已找到：
          {found.length ? found.map((k) => POEMS[k].name).join("、") : "尚無"}（{found.length}/4）
        </p>
        {found.length >= KEYS.length && (
          <Feedback ok>🎉 四種格式都找到了！記住：五言或七言，絕句四句、律詩八句。</Feedback>
        )}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto h-auto w-full max-w-sm rounded-xl"
        role="img"
        aria-label={`每句 ${chars} 字、共 ${lines} 句的格子${poem ? `，${poem.name}` : ""}`}
      >
        <rect x="0" y="0" width={W} height={H} rx="12" fill="#fffbeb" />
        {isLu &&
          poem &&
          [2, 4].map((r) => (
            <rect
              key={`band${r}`}
              x={x0 - 6}
              y={top + r * CELL - 2}
              width={chars * CELL + 8}
              height={CELL * 2}
              rx="6"
              fill="#bbf7d0"
            />
          ))}
        {Array.from({ length: lines }, (_, r) => {
          const y = top + r * CELL;
          const label = poem ? (isLu ? (r % 2 === 0 ? LIAN[r / 2] : "") : JUE[r]) : String(r + 1);
          return (
            <g key={`row${r}`}>
              <text
                x={x0 - 8}
                y={y + (poem && isLu ? CELL + 4 : 18)}
                textAnchor="end"
                fontSize="12"
                fontWeight="700"
                fill={poem ? "#6d28d9" : "#94a3b8"}
              >
                {label}
              </text>
              {Array.from({ length: chars }, (_, i) => {
                const ch = poem?.lines[r]?.[i];
                const isRhyme = !!poem && i === chars - 1 && poem.rhyme.includes(r);
                return (
                  <g key={`c${r}-${i}`}>
                    <rect
                      x={x0 + i * CELL}
                      y={y}
                      width={CELL - 4}
                      height={CELL - 4}
                      rx="4"
                      fill={isRhyme ? "#fde68a" : "#ffffff"}
                      stroke={isRhyme ? "#d97706" : "#cbd5e1"}
                      strokeWidth={isRhyme ? 2 : 1}
                    />
                    {ch && (
                      <text
                        x={x0 + i * CELL + (CELL - 4) / 2}
                        y={y + 18}
                        textAnchor="middle"
                        fontSize="15"
                        fill="#1e293b"
                      >
                        {ch}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
