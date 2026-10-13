import { useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

type RegionId = "tw" | "ea" | "world";

interface Era {
  from: number;
  /** 不含 */
  to: number;
  label: string;
  color: string;
}

interface Challenge {
  text: string;
  from: number;
  to: number;
  hint: string;
  reveal: string;
}

const MIN = 1500;
const MAX = 2000;

const REGIONS: { id: RegionId; name: string }[] = [
  { id: "tw", name: "臺灣" },
  { id: "ea", name: "中國／東亞" },
  { id: "world", name: "世界" },
];

const ERAS: Record<RegionId, Era[]> = {
  tw: [
    { from: 1500, to: 1624, label: "原住民族社會", color: "#bef264" },
    { from: 1624, to: 1662, label: "荷西時期", color: "#fdba74" },
    { from: 1662, to: 1683, label: "鄭氏時期", color: "#fca5a5" },
    { from: 1683, to: 1895, label: "清帝國時期", color: "#93c5fd" },
    { from: 1895, to: 1945, label: "日治時期", color: "#d8b4fe" },
    { from: 1945, to: 2001, label: "戰後臺灣", color: "#6ee7b7" },
  ],
  ea: [
    { from: 1500, to: 1644, label: "明朝", color: "#fde68a" },
    { from: 1644, to: 1912, label: "清朝", color: "#a5b4fc" },
    { from: 1912, to: 1949, label: "中華民國（大陸時期）", color: "#fdba74" },
    { from: 1949, to: 2001, label: "兩岸分治", color: "#99f6e4" },
  ],
  world: [
    { from: 1500, to: 1650, label: "大航海與宗教改革", color: "#bae6fd" },
    { from: 1650, to: 1760, label: "科學革命與啟蒙", color: "#ddd6fe" },
    { from: 1760, to: 1848, label: "工業與民主革命", color: "#fed7aa" },
    { from: 1848, to: 1914, label: "民族主義與帝國主義", color: "#fecaca" },
    { from: 1914, to: 1945, label: "世界大戰", color: "#fca5a5" },
    { from: 1945, to: 1991, label: "戰後與冷戰", color: "#cbd5e1" },
    { from: 1991, to: 2001, label: "全球化", color: "#a7f3d0" },
  ],
};

const EVENTS: Record<RegionId, [number, string][]> = {
  tw: [
    [1624, "荷蘭東印度公司在大員建立據點"],
    [1626, "西班牙人佔領雞籠"],
    [1642, "荷蘭人驅逐北部的西班牙人"],
    [1652, "郭懷一事件"],
    [1662, "鄭成功擊退荷蘭人，鄭氏時期開始"],
    [1683, "施琅攻下澎湖，鄭克塽降清"],
    [1684, "清帝國設臺灣府，隸屬福建省"],
    [1721, "朱一貴事件"],
    [1786, "林爽文事件（至 1788 年）"],
    [1812, "設噶瑪蘭廳（今宜蘭）"],
    [1860, "北京條約後，臺灣陸續開港通商"],
    [1874, "牡丹社事件"],
    [1885, "臺灣建省，劉銘傳任首任巡撫"],
    [1895, "馬關條約割讓臺灣，日治時期開始"],
    [1908, "縱貫鐵路全線通車"],
    [1915, "西來庵事件"],
    [1921, "臺灣文化協會成立"],
    [1930, "霧社事件；嘉南大圳完工"],
    [1937, "皇民化運動展開"],
    [1945, "日本戰敗，中華民國政府接收臺灣"],
    [1947, "二二八事件"],
    [1949, "實施戒嚴；中華民國政府遷臺"],
    [1953, "實施耕者有其田"],
    [1966, "高雄加工出口區設立"],
    [1971, "中華民國退出聯合國"],
    [1979, "美麗島事件"],
    [1980, "新竹科學園區設立"],
    [1987, "解除戒嚴"],
    [1996, "首次總統直選"],
  ],
  ea: [
    [1592, "日本出兵朝鮮（壬辰戰爭）"],
    [1603, "日本德川幕府建立"],
    [1644, "明朝滅亡，清軍入關"],
    [1689, "清帝國與俄國簽訂尼布楚條約"],
    [1793, "英國馬戛爾尼使團訪華"],
    [1842, "鴉片戰爭結束，簽訂南京條約"],
    [1851, "太平天國起事"],
    [1853, "美國培里艦隊抵達日本"],
    [1860, "英法聯軍攻入北京，簽訂北京條約"],
    [1868, "日本明治維新開始"],
    [1894, "甲午戰爭爆發"],
    [1898, "戊戌變法"],
    [1900, "八國聯軍"],
    [1910, "日本併吞朝鮮"],
    [1912, "中華民國成立，清朝結束"],
    [1919, "五四運動"],
    [1937, "中日戰爭全面爆發"],
    [1945, "日本投降"],
    [1949, "中華人民共和國成立"],
    [1950, "韓戰爆發"],
    [1966, "中國文化大革命開始"],
    [1978, "中國推動改革開放"],
  ],
  world: [
    [1498, "達伽馬繞過好望角抵達印度"],
    [1517, "馬丁路德發表〈九十五條論綱〉"],
    [1522, "麥哲倫船隊完成環球航行"],
    [1543, "哥白尼提出日心說"],
    [1588, "英國擊敗西班牙無敵艦隊"],
    [1602, "荷蘭東印度公司成立"],
    [1687, "牛頓提出萬有引力定律"],
    [1689, "英國通過權利法案"],
    [1748, "孟德斯鳩出版《論法的精神》"],
    [1769, "瓦特改良蒸汽機並取得專利"],
    [1776, "美國發表獨立宣言"],
    [1789, "法國大革命爆發"],
    [1815, "拿破崙在滑鐵盧戰敗"],
    [1830, "英國利物浦—曼徹斯特鐵路通車"],
    [1848, "《共產黨宣言》發表"],
    [1861, "美國南北戰爭爆發；義大利王國成立"],
    [1871, "德意志帝國成立"],
    [1884, "柏林會議召開，列強瓜分非洲"],
    [1914, "第一次世界大戰爆發"],
    [1917, "俄國革命"],
    [1919, "凡爾賽條約簽訂"],
    [1929, "經濟大恐慌"],
    [1939, "第二次世界大戰在歐洲爆發"],
    [1945, "二戰結束；聯合國成立"],
    [1947, "杜魯門主義提出，冷戰開始"],
    [1962, "古巴飛彈危機"],
    [1969, "阿波羅 11 號登陸月球"],
    [1989, "柏林圍牆倒塌"],
    [1991, "蘇聯解體，冷戰結束"],
    [1995, "世界貿易組織成立"],
  ],
};

const CHALLENGES: Record<"junior" | "senior", Challenge[]> = {
  junior: [
    {
      text: "臺灣由荷蘭東印度公司經營，而中國已經由明朝進入清朝。",
      from: 1644,
      to: 1661,
      hint: "看看時間軸上「臺灣」列的荷西時期，和「中國／東亞」列的清朝，在哪裡重疊？",
      reveal:
        "1644 年清軍入關、明朝滅亡；荷蘭人則到 1662 年才被鄭成功擊退。1644–1661 年間，兩者同時存在。",
    },
    {
      text: "臺灣已進入日治時期，但中國的清朝還沒結束。",
      from: 1895,
      to: 1911,
      hint: "臺灣的日治時期從哪一年開始？清朝又在哪一年結束？",
      reveal: "1895 年馬關條約後臺灣進入日治時期；清朝則在 1912 年結束、中華民國成立。",
    },
    {
      text: "世界處於冷戰對峙，臺灣仍在戒嚴時期。",
      from: 1949,
      to: 1987,
      hint: "臺灣在 1949 年實施戒嚴、1987 年解嚴；冷戰大約從 1947 年持續到 1991 年。",
      reveal: "戒嚴時期（1949–1987）幾乎與冷戰重疊：兩岸對峙與冷戰局勢，是長期戒嚴的重要背景。",
    },
  ],
  senior: [
    {
      text: "臺灣正發生清帝國時期規模最大的民變之一，而法國大革命即將或已經爆發。",
      from: 1786,
      to: 1789,
      hint: "林爽文事件發生在 1786–1788 年，法國大革命在 1789 年爆發。",
      reveal:
        "林爽文事件後，清廷把諸羅改名為「嘉義」，表彰當地居民守城；幾乎同時，1789 年法國大革命爆發。東西方同樣處在動盪之中。",
    },
    {
      text: "日本已展開明治維新，清帝國仍在推動自強運動，臺灣也已開港通商。",
      from: 1868,
      to: 1894,
      hint: "明治維新始於 1868 年；自強運動大約持續到 1894 年甲午戰爭爆發。",
      reveal:
        "同樣面對西方衝擊，日本推動較全面的制度改革，清帝國則以學習西方技術為主；1894 年甲午戰爭成為兩條路線的檢驗。",
    },
    {
      text: "第一次世界大戰正在進行，臺灣處於日治時期。",
      from: 1914,
      to: 1918,
      hint: "一戰從 1914 年打到 1918 年。",
      reveal:
        "一戰期間的 1915 年，臺灣發生西來庵事件；戰後「民族自決」思潮也影響了 1920 年代臺灣的政治社會運動。",
    },
  ],
};

const eraOf = (r: RegionId, y: number) => ERAS[r].find((e) => y >= e.from && y < e.to);

function around(r: RegionId, y: number) {
  const list = EVENTS[r];
  let prev: [number, string] | undefined;
  let next: [number, string] | undefined;
  for (const ev of list) {
    if (ev[0] <= y) prev = ev;
    else if (!next) next = ev;
  }
  return { prev, next };
}

/** 時光拉桿：拖曳年份，比較臺灣、中國／東亞與世界在同一時間的狀況 */
export default function TimelineScrubberLab({ onComplete, config }: LabProps) {
  const stage = config?.stage === "senior" ? "senior" : "junior";
  const challenges = CHALLENGES[stage];
  const [year, setYear] = useState(1600);
  const [idx, setIdx] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const done = idx >= challenges.length;
  const current = challenges[idx];

  const W = 460;
  const L = 74;
  const R = 440;
  const sx = (y: number) => L + ((Math.min(Math.max(y, MIN), MAX) - MIN) / (MAX - MIN)) * (R - L);

  const move = (v: number) => setYear(Math.min(MAX, Math.max(MIN, Math.round(v))));

  const confirm = () => {
    if (!current) return;
    if (year >= current.from && year <= current.to) {
      setMsg({ ok: true, text: `✔ ${year} 年符合！${current.reveal}` });
      const next = idx + 1;
      setIdx(next);
      if (next === challenges.length) onComplete();
    } else {
      setMsg({ ok: false, text: `${year} 年還不符合。${current.hint}` });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-3xl font-bold tabular-nums" aria-live="polite">
          {year} 年
          <span className="ml-2 text-base font-medium text-slate-500">
            （{Math.floor((year - 1) / 100) + 1} 世紀）
          </span>
        </p>
        <div className="flex gap-1">
          {[-10, -1, 1, 10].map((d) => (
            <button
              key={d}
              type="button"
              className="btn-ghost px-2 py-1 text-sm"
              onClick={() => move(year + d)}
            >
              {d > 0 ? `+${d}` : d}
            </button>
          ))}
        </div>
      </div>
      <ParamSlider
        label="拖曳年份"
        min={MIN}
        max={MAX}
        step={1}
        value={year}
        onChange={move}
        color="#9a3412"
      />
      <svg
        viewBox={`0 0 ${W} 118`}
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`時間軸：目前 ${year} 年`}
      >
        {REGIONS.map((r, row) => {
          const y0 = 8 + row * 30;
          return (
            <g key={r.id}>
              <text
                x={L - 6}
                y={y0 + 16}
                textAnchor="end"
                fontSize="11"
                className="fill-slate-700 dark:fill-slate-200"
              >
                {r.name}
              </text>
              {ERAS[r.id].map((e) => {
                const x1 = sx(e.from);
                const x2 = sx(e.to);
                const w = x2 - x1;
                return (
                  <g key={e.label}>
                    <rect
                      x={x1}
                      y={y0}
                      width={w}
                      height={24}
                      fill={e.color}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    {w >= e.label.length * 10 + 6 && (
                      <text
                        x={x1 + w / 2}
                        y={y0 + 16}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#1e293b"
                      >
                        {e.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        {[1500, 1600, 1700, 1800, 1900, 2000].map((t) => (
          <g key={t}>
            <line x1={sx(t)} x2={sx(t)} y1={98} y2={102} stroke="#94a3b8" />
            <text
              x={sx(t)}
              y={114}
              textAnchor="middle"
              fontSize="10"
              className="fill-slate-500 dark:fill-slate-400"
            >
              {t}
            </text>
          </g>
        ))}
        <line
          x1={sx(year)}
          x2={sx(year)}
          y1={2}
          y2={100}
          stroke="#9a3412"
          strokeWidth="2.5"
          style={{ transition: "all .15s" }}
        />
        <circle cx={sx(year)} cy={4} r={4} fill="#9a3412" />
      </svg>
      <div className="grid gap-3 md:grid-cols-3">
        {REGIONS.map((r) => {
          const era = eraOf(r.id, year);
          const { prev, next } = around(r.id, year);
          return (
            <div
              key={r.id}
              className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
            >
              <p className="text-sm font-bold">{r.name}</p>
              {era && (
                <span
                  className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold text-slate-800"
                  style={{ background: era.color }}
                >
                  {era.label}
                </span>
              )}
              <p className="mt-2 text-sm">
                {prev ? (
                  <>
                    <strong>{prev[0]}</strong>　{prev[1]}
                    <span className="text-xs text-slate-500">
                      {year === prev[0] ? "（就在今年）" : `（${year - prev[0]} 年前）`}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-500">（這之前的大事不在本表中）</span>
                )}
              </p>
              {next && (
                <p className="mt-1 text-xs text-slate-500">
                  下一件：{next[0]} {next[1]}（{next[0] - year} 年後）
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
        {done ? (
          <p className="font-semibold">🎉 三項挑戰全部完成！</p>
        ) : (
          <>
            <p className="font-semibold">
              🎯 挑戰 {idx + 1}/{challenges.length}：找出一個年份——{current.text}
            </p>
            <button type="button" className="btn-primary mt-2" onClick={confirm}>
              就是這一年！
            </button>
          </>
        )}
      </div>
      {msg && <Feedback ok={msg.ok}>{msg.text}</Feedback>}
      <p className="text-xs text-slate-500">
        時期的界線是為了方便理解所做的劃分，實際的變化往往是漸進的；不同觀點也可能有不同的分期方式。
      </p>
    </div>
  );
}
