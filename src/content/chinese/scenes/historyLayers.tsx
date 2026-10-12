import type { SceneProps } from "../../types";

/** 中國文學史時間軸圖層（viewBox 0 0 480 300） */
const X = (i: number) => 44 + i * 65;

const DYNASTY: { name: string; years: string }[] = [
  { name: "先秦", years: "前 221 以前" },
  { name: "兩漢", years: "前 202–220" },
  { name: "魏晉南北朝", years: "220–589" },
  { name: "唐", years: "618–907" },
  { name: "宋", years: "960–1279" },
  { name: "元", years: "1271–1368" },
  { name: "明清", years: "1368–1912" },
];

const GENRE: string[][] = [
  ["詩經", "楚辭"],
  ["漢賦", "樂府"],
  ["駢文", "田園詩"],
  ["近體詩", "古文運動"],
  ["宋詞"],
  ["散曲", "雜劇"],
  ["章回", "小說"],
];

const AUTHOR: string[][] = [
  ["屈原", "〈離騷〉"],
  ["司馬相如", "〈子虛賦〉"],
  ["陶淵明", "〈飲酒〉"],
  ["李白", "杜甫"],
  ["蘇軾", "李清照"],
  ["關漢卿", "〈竇娥冤〉"],
  ["曹雪芹", "《紅樓夢》"],
];

export function TimelineBase(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="480" height="300" fill="#f8fafc" />
      <text x="240" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e293b">
        中國文學長河
      </text>
      <rect x="8" y="140" width="452" height="20" rx="10" fill="#bfdbfe" />
      <polygon points="458,132 476,150 458,168" fill="#93c5fd" />
      {DYNASTY.map((d, i) => (
        <circle key={d.name} cx={X(i)} cy="150" r="5" fill="#2563eb" />
      ))}
      <text x="20" y="54" fontSize="11" fill="#64748b">
        時間 →
      </text>
    </g>
  );
}

export function DynastyLayer(_: SceneProps) {
  return (
    <g>
      {DYNASTY.map((d, i) => (
        <g key={d.name}>
          <text x={X(i)} y="88" textAnchor="middle" fontSize="10" fill="#475569">
            {d.years}
          </text>
          <rect x={X(i) - 30} y="96" width="60" height="30" rx="6" fill="#fee2e2" />
          <text
            x={X(i)}
            y="116"
            textAnchor="middle"
            fontSize={d.name.length > 3 ? 10 : 13}
            fontWeight="700"
            fill="#991b1b"
          >
            {d.name}
          </text>
        </g>
      ))}
    </g>
  );
}

export function GenreLayer(_: SceneProps) {
  return (
    <g>
      {GENRE.map((g, i) => (
        <g key={g.join()}>
          <rect x={X(i) - 30} y="168" width="60" height="40" rx="6" fill="#dcfce7" />
          {g.map((t, j) => (
            <text
              key={t}
              x={X(i)}
              y={g.length === 1 ? 193 : 184 + j * 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#166534"
            >
              {t}
            </text>
          ))}
        </g>
      ))}
    </g>
  );
}

export function AuthorLayer(_: SceneProps) {
  return (
    <g>
      {AUTHOR.map((a, i) => (
        <g key={a.join()}>
          <rect x={X(i) - 31} y="218" width="62" height="40" rx="6" fill="#ede9fe" />
          {a.map((t, j) => (
            <text
              key={t}
              x={X(i)}
              y={234 + j * 16}
              textAnchor="middle"
              fontSize={t.length > 4 ? 10 : 11}
              fill="#5b21b6"
            >
              {t}
            </text>
          ))}
        </g>
      ))}
    </g>
  );
}
