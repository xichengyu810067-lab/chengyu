import { useRef, useState } from "react";
import { Feedback } from "../../../ui";
import type { LabProps } from "../../types";

interface Part {
  id: string;
  label: string;
  meaning: string;
}

const PREFIXES: Part[] = [
  { id: "", label: "（無）", meaning: "" },
  { id: "ex", label: "ex-", meaning: "向外" },
  { id: "im", label: "im-", meaning: "向內、進入" },
  { id: "in", label: "in-", meaning: "向內、進入" },
  { id: "re", label: "re-", meaning: "回、再" },
  { id: "pre", label: "pre-", meaning: "之前、預先" },
  { id: "pro", label: "pro-", meaning: "向前" },
  { id: "trans", label: "trans-", meaning: "橫越、轉移" },
  { id: "inter", label: "inter-", meaning: "在…之間" },
  { id: "dis", label: "dis-", meaning: "分開、打散" },
];

const ROOTS: Part[] = [
  { id: "port", label: "port", meaning: "拿、運送" },
  { id: "dict", label: "dict", meaning: "說" },
  { id: "spect", label: "spect", meaning: "看" },
  { id: "ject", label: "ject", meaning: "丟、投擲" },
  { id: "rupt", label: "rupt", meaning: "破裂" },
];

const SUFFIXES: Part[] = [
  { id: "", label: "（無）", meaning: "" },
  { id: "ion", label: "-ion", meaning: "名詞（動作、結果）" },
  { id: "ation", label: "-ation", meaning: "名詞（動作、結果）" },
  { id: "able", label: "-able", meaning: "形容詞（可…的）" },
  { id: "er", label: "-er", meaning: "名詞（做…的人或物）" },
  { id: "or", label: "-or", meaning: "名詞（做…的人或物）" },
  { id: "ive", label: "-ive", meaning: "形容詞（有…性質的）" },
  { id: "ful", label: "-ful", meaning: "形容詞（充滿…的）" },
];

/** 本實驗字庫：字首 + 字根 + 字尾（皆可直接相連拼寫）→ 詞性與中文意思 */
const WORDS: Record<string, string> = {
  port: "n. 港口（字根本身也是單字）",
  export: "v. / n. 出口（貨物）",
  import: "v. / n. 進口",
  transport: "v. / n. 運輸",
  report: "v. / n. 報告、報導",
  portable: "adj. 可攜帶的",
  exporter: "n. 出口商",
  importer: "n. 進口商",
  reporter: "n. 記者",
  transportation: "n. 交通運輸",
  predict: "v. 預測",
  prediction: "n. 預測、預言",
  predictable: "adj. 可預測的",
  predictive: "adj. 預測性的",
  dictation: "n. 聽寫",
  inspect: "v. 檢查、視察",
  inspection: "n. 檢查、視察",
  inspector: "n. 檢查員、督察",
  respect: "v. / n. 尊敬",
  respectable: "adj. 值得尊敬的、體面的",
  respectful: "adj. 恭敬的、尊重人的",
  project: "n. 計畫；v. 投射",
  projector: "n. 投影機",
  reject: "v. 拒絕",
  rejection: "n. 拒絕",
  inject: "v. 注射",
  injection: "n. 注射",
  interrupt: "v. 打斷",
  interruption: "n. 打斷、中斷",
  disrupt: "v. 擾亂、使中斷",
  disruption: "n. 擾亂、中斷",
  disruptive: "adj. 擾亂的、破壞性的",
};

const HINTS = [
  "trans- + port + -ation",
  "pre- + dict + -able",
  "in- + spect + -or",
  "inter- + rupt + -ion",
  "pro- + ject + -or",
  "re- + spect + -ful",
];

const GOAL = 5;

function Chips({
  title,
  parts,
  value,
  onPick,
  color,
}: {
  title: string;
  parts: Part[];
  value: string | null;
  onPick: (id: string) => void;
  color: string;
}) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-semibold">{title}</legend>
      <div className="flex flex-wrap gap-1.5">
        {parts.map((p) => {
          const on = value === p.id;
          return (
            <button
              key={p.id || "none"}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(p.id)}
              className={`rounded-full border-2 px-3 py-1 font-mono text-sm transition ${
                on
                  ? "text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              }`}
              style={on ? { background: color, borderColor: color } : undefined}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** 構詞實驗室：選字首、字根、字尾組出真正的英文單字 */
export default function WordBuilderLab({ onComplete }: LabProps) {
  const [prefix, setPrefix] = useState("");
  const [root, setRoot] = useState<string | null>(null);
  const [suffix, setSuffix] = useState("");
  const [found, setFound] = useState<string[]>([]);
  const [hint, setHint] = useState<string | null>(null);
  const doneRef = useRef(false);

  const pick = (p: string, r: string | null, s: string) => {
    setPrefix(p);
    setRoot(r);
    setSuffix(s);
    if (!r) return;
    const w = `${p}${r}${s}`;
    if (WORDS[w] && !found.includes(w)) {
      const next = [...found, w];
      setFound(next);
      if (next.length >= GOAL && !doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    }
  };

  const word = root ? `${prefix}${root}${suffix}` : null;
  const known = word ? WORDS[word] : undefined;
  const pp = PREFIXES.find((p) => p.id === prefix);
  const rp = ROOTS.find((p) => p.id === root);
  const sp = SUFFIXES.find((p) => p.id === suffix);
  const breakdown = [
    pp?.id ? `${pp.label}（${pp.meaning}）` : null,
    rp ? `${rp.label}（${rp.meaning}）` : null,
    sp?.id ? `${sp.label}（${sp.meaning}）` : null,
  ]
    .filter(Boolean)
    .join(" + ");

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-3">
        <Chips
          title="① 字首 prefix"
          parts={PREFIXES}
          value={prefix}
          onPick={(id) => pick(id, root, suffix)}
          color="#2563eb"
        />
        <Chips
          title="② 字根 root（必選）"
          parts={ROOTS}
          value={root}
          onPick={(id) => pick(prefix, id, suffix)}
          color="#059669"
        />
        <Chips
          title="③ 字尾 suffix"
          parts={SUFFIXES}
          value={suffix}
          onPick={(id) => pick(prefix, root, id)}
          color="#d97706"
        />
      </div>
      <div className="space-y-3">
        <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800" aria-live="polite">
          {word ? (
            <>
              <p className="font-mono text-sm text-slate-500">
                <span className="text-blue-600">{prefix}</span>
                <span className="text-emerald-600">{root}</span>
                <span className="text-amber-600">{suffix}</span>
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-wide">
                {known ? word : `${word}?`}
              </p>
              <p className="mt-2 text-sm">{breakdown}</p>
              {known ? (
                <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  ✅ {known}
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-500">
                  這個組合不在本實驗的字庫中（可能不是單字，或是較少用的字），換個字首或字尾試試！
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-500">先選一個字根，再加上字首、字尾組成單字。</p>
          )}
        </div>
        <p className="text-sm">
          🎯 任務：組出 <strong>{GOAL} 個</strong>真正的英文單字（已找到 {found.length} 個）。
        </p>
        {found.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {found.map((w) => (
              <span key={w} className="chip font-mono">
                {w}
              </span>
            ))}
          </div>
        )}
        {found.length < GOAL && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              const rest = HINTS.filter((h) => !found.includes(h.replace(/[-+ ]/g, "")));
              setHint(rest[Math.floor(Math.random() * rest.length)] ?? HINTS[0]);
            }}
          >
            💡 給我一個提示
          </button>
        )}
        {hint && found.length < GOAL && (
          <p className="text-sm text-slate-600 dark:text-slate-300">試試看：{hint}</p>
        )}
        {found.length >= GOAL && (
          <Feedback ok>🎉 太棒了！拆開字首、字根、字尾，就能猜出很多長單字的意思。</Feedback>
        )}
      </div>
    </div>
  );
}
