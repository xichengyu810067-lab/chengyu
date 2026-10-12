import type { SceneProps } from "../../types";

/** 層狀火山剖面（viewBox 0 0 400 300），不放文字標籤，供「找找看」模式使用 */
export default function VolcanoScene({ active }: SceneProps) {
  const hl = (id: string) => active === id;
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#e0f2fe" />
      {/* 地下 */}
      <rect x="0" y="200" width="400" height="100" fill="#d6d3d1" />
      <line x1="0" y1="232" x2="400" y2="232" stroke="#a8a29e" strokeDasharray="6 4" />
      <line x1="0" y1="290" x2="400" y2="290" stroke="#a8a29e" strokeDasharray="6 4" />
      {/* 火山錐（層狀） */}
      <polygon
        points="80,200 185,70 215,70 320,200"
        fill="#a8a29e"
        stroke={hl("cone") ? "#e11d48" : "#57534e"}
        strokeWidth={hl("cone") ? 4 : 2}
      />
      <polyline points="105,200 190,95 210,95 295,200" fill="none" stroke="#78716c" />
      <polyline points="130,200 194,120 206,120 270,200" fill="none" stroke="#78716c" />
      <polyline points="155,200 197,148 203,148 245,200" fill="none" stroke="#78716c" />
      {/* 岩漿庫 */}
      <ellipse
        cx="200"
        cy="262"
        rx="80"
        ry="24"
        fill="#f97316"
        stroke={hl("chamber") ? "#e11d48" : "#c2410c"}
        strokeWidth={hl("chamber") ? 4 : 2}
      />
      {/* 火山管道 */}
      <rect
        x="193"
        y="76"
        width="14"
        height="168"
        fill="#ea580c"
        stroke={hl("conduit") ? "#e11d48" : "none"}
        strokeWidth="3"
      />
      {/* 火山口 */}
      <polygon
        points="183,70 200,84 217,70"
        fill="#c2410c"
        stroke={hl("crater") ? "#e11d48" : "#7c2d12"}
        strokeWidth={hl("crater") ? 4 : 1.5}
      />
      {/* 熔岩流 */}
      <path
        d="M214,76 C230,95 240,110 252,135 S275,175 296,196"
        fill="none"
        stroke={hl("lava") ? "#be123c" : "#dc2626"}
        strokeWidth={hl("lava") ? 11 : 8}
        strokeLinecap="round"
      />
      {/* 火山灰與火山碎屑 */}
      <g opacity={hl("ash") ? 1 : 0.8}>
        <circle cx="200" cy="42" r="18" fill="#64748b" />
        <circle cx="178" cy="30" r="15" fill="#475569" />
        <circle cx="224" cy="28" r="16" fill="#64748b" />
        <circle cx="205" cy="16" r="13" fill="#94a3b8" />
        <circle cx="160" cy="18" r="10" fill="#94a3b8" />
        <circle cx="246" cy="14" r="10" fill="#94a3b8" />
        {hl("ash") && (
          <ellipse cx="203" cy="28" rx="60" ry="30" fill="none" stroke="#e11d48" strokeWidth="3" />
        )}
      </g>
      <circle cx="150" cy="60" r="3" fill="#292524" />
      <circle cx="255" cy="55" r="3.5" fill="#292524" />
      <circle cx="140" cy="95" r="2.5" fill="#292524" />
    </g>
  );
}
