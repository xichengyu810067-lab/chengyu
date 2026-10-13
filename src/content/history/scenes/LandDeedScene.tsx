import type { SceneProps } from "../../types";

/**
 * 清代土地買賣契約（杜賣契）示意圖：直書、由右至左。
 * 內容為教學用的虛構範例，格式參考清代常見契字用語。（viewBox 0 0 480 320）
 */
interface Col {
  x: number;
  text: string;
  /** 對應的熱點 id，被選取時加上底色 */
  spot: string;
  size?: number;
}

const COLS: Col[] = [
  { x: 430, text: "立杜賣盡根田契字人林德", spot: "title" },
  { x: 405, text: "有承父遺下水田壹段", spot: "title" },
  { x: 380, text: "東至溪西至大路", spot: "bounds" },
  { x: 355, text: "南至陳家田北至圳岸", spot: "bounds" },
  { x: 330, text: "今因乏銀別創托中引就", spot: "witnesses" },
  { x: 305, text: "三面言議時值價佛銀壹佰大員", spot: "price" },
  { x: 280, text: "其田每年應納番大租粟伍石", spot: "dazu" },
  { x: 255, text: "此係二比甘願各無反悔", spot: "formula" },
  { x: 230, text: "口恐無憑立杜賣契壹紙為照", spot: "formula" },
  { x: 195, text: "為中人張福", spot: "witnesses", size: 13 },
  { x: 172, text: "代筆人李文", spot: "witnesses", size: 13 },
  { x: 149, text: "知見人母陳氏", spot: "witnesses", size: 13 },
  { x: 110, text: "光緒拾年拾月　日", spot: "date" },
  { x: 70, text: "立杜賣盡根田契字人林德", spot: "seal" },
];

const TOP = 46;
const STEP = 17;

export default function LandDeedScene({ active }: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f8fafc" />
      <rect x="20" y="12" width="440" height="296" rx="4" fill="#fef3c7" stroke="#b45309" />
      <rect
        x="26"
        y="18"
        width="428"
        height="284"
        fill="none"
        stroke="#d97706"
        strokeDasharray="2 3"
      />
      {COLS.map((c) => {
        const chars = [...c.text];
        const on = active === c.spot;
        return (
          <g key={c.x}>
            {on && (
              <rect
                x={c.x - 12}
                y={TOP - 15}
                width="24"
                height={chars.length * STEP + 6}
                rx="4"
                fill="#fde047"
                opacity="0.7"
              />
            )}
            {chars.map((ch, i) =>
              ch.trim() ? (
                <text
                  key={`${c.x}-${i}`}
                  x={c.x}
                  y={TOP + i * STEP}
                  textAnchor="middle"
                  fontSize={c.size ?? 14}
                  fill="#1e293b"
                >
                  {ch}
                </text>
              ) : null,
            )}
          </g>
        );
      })}
      {/* 印記與畫押 */}
      <g>
        {active === "seal" && (
          <rect x="50" y="226" width="40" height="40" rx="4" fill="#fde047" opacity="0.7" />
        )}
        <rect x="57" y="232" width="26" height="26" fill="none" stroke="#dc2626" strokeWidth="2" />
        <text x="70" y="250" textAnchor="middle" fontSize="13" fill="#dc2626">
          林
        </text>
      </g>
      <text x="240" y="300" textAnchor="middle" fontSize="10" fill="#92400e">
        （教學示意，非真實文件）
      </text>
    </g>
  );
}
