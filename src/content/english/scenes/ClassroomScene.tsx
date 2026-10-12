import type { SceneProps } from "../../types";

/** 教室單字場景（viewBox 0 0 400 300）：黑板、時鐘、窗戶、門、書架、書桌、椅子、背包 */
export default function ClassroomScene({ active }: SceneProps) {
  const on = (id: string) => active === id;
  const stroke = (id: string, base: string) => (on(id) ? "#2563eb" : base);
  const width = (id: string, base: number) => (on(id) ? base + 3 : base);
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      {/* 地板 */}
      <rect x="0" y="232" width="400" height="68" fill="#e2e8f0" />
      <line x1="0" y1="232" x2="400" y2="232" stroke="#cbd5e1" strokeWidth="2" />

      {/* 窗戶 window */}
      <rect
        x="20"
        y="35"
        width="72"
        height="80"
        rx="4"
        fill="#bae6fd"
        stroke={stroke("window", "#475569")}
        strokeWidth={width("window", 3)}
      />
      <line x1="56" y1="35" x2="56" y2="115" stroke="#475569" strokeWidth="2" />
      <line x1="20" y1="75" x2="92" y2="75" stroke="#475569" strokeWidth="2" />
      <circle cx="40" cy="55" r="9" fill="#fde68a" />

      {/* 黑板 blackboard */}
      <rect
        x="118"
        y="28"
        width="176"
        height="92"
        rx="3"
        fill="#166534"
        stroke={stroke("blackboard", "#78350f")}
        strokeWidth={width("blackboard", 5)}
      />
      <text x="206" y="68" textAnchor="middle" fontSize="16" fill="#f8fafc">
        Hello, class!
      </text>
      <rect x="130" y="120" width="152" height="6" fill="#92400e" />
      <rect x="150" y="116" width="14" height="4" fill="#f8fafc" />

      {/* 時鐘 clock */}
      <circle
        cx="342"
        cy="55"
        r="24"
        fill="#ffffff"
        stroke={stroke("clock", "#334155")}
        strokeWidth={width("clock", 3)}
      />
      <line x1="342" y1="55" x2="342" y2="38" stroke="#1e293b" strokeWidth="3" />
      <line x1="342" y1="55" x2="354" y2="61" stroke="#1e293b" strokeWidth="2" />
      <circle cx="342" cy="55" r="2.5" fill="#e11d48" />

      {/* 門 door */}
      <rect
        x="328"
        y="104"
        width="58"
        height="128"
        rx="3"
        fill="#fcd34d"
        stroke={stroke("door", "#92400e")}
        strokeWidth={width("door", 3)}
      />
      <rect x="338" y="116" width="38" height="44" fill="#fde68a" stroke="#b45309" />
      <circle cx="376" cy="176" r="4" fill="#78350f" />

      {/* 書架 bookshelf */}
      <rect
        x="18"
        y="134"
        width="78"
        height="98"
        fill="#fde68a"
        stroke={stroke("bookshelf", "#92400e")}
        strokeWidth={width("bookshelf", 3)}
      />
      <line x1="18" y1="166" x2="96" y2="166" stroke="#92400e" strokeWidth="2" />
      <line x1="18" y1="199" x2="96" y2="199" stroke="#92400e" strokeWidth="2" />
      <rect x="24" y="140" width="9" height="26" fill="#ef4444" />
      <rect x="35" y="144" width="8" height="22" fill="#3b82f6" />
      <rect x="45" y="140" width="10" height="26" fill="#10b981" />
      <rect x="60" y="146" width="8" height="20" fill="#8b5cf6" />
      <rect x="26" y="174" width="10" height="25" fill="#f97316" />
      <rect x="38" y="178" width="8" height="21" fill="#0ea5e9" />
      <rect x="52" y="174" width="9" height="25" fill="#eab308" />
      <rect x="66" y="208" width="22" height="24" fill="#64748b" />

      {/* 書桌 desk */}
      <rect
        x="150"
        y="178"
        width="120"
        height="13"
        rx="2"
        fill="#d6a35c"
        stroke={stroke("desk", "#78350f")}
        strokeWidth={width("desk", 2)}
      />
      <rect x="158" y="191" width="8" height="50" fill="#a16207" />
      <rect x="254" y="191" width="8" height="50" fill="#a16207" />
      <rect x="180" y="168" width="34" height="10" fill="#ffffff" stroke="#94a3b8" />
      <rect x="222" y="171" width="26" height="5" rx="2" fill="#facc15" />

      {/* 椅子 chair */}
      <rect
        x="300"
        y="168"
        width="8"
        height="72"
        fill="#60a5fa"
        stroke={stroke("chair", "#1e3a8a")}
        strokeWidth={width("chair", 1)}
      />
      <rect
        x="276"
        y="206"
        width="32"
        height="8"
        fill="#60a5fa"
        stroke={stroke("chair", "#1e3a8a")}
        strokeWidth={width("chair", 1)}
      />
      <rect x="278" y="214" width="5" height="30" fill="#1e3a8a" />

      {/* 背包 backpack */}
      <rect
        x="106"
        y="212"
        width="36"
        height="44"
        rx="10"
        fill="#f87171"
        stroke={stroke("backpack", "#991b1b")}
        strokeWidth={width("backpack", 2)}
      />
      <rect x="114" y="232" width="20" height="16" rx="4" fill="#fca5a5" stroke="#991b1b" />
      <path d="M114,212 Q124,198 134,212" fill="none" stroke="#991b1b" strokeWidth="3" />
    </g>
  );
}
