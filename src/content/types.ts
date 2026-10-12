/**
 * 學習星球的內容型別。所有科目內容（src/content/<subject>/**）都依照這份型別撰寫。
 *
 * 文字欄位型別為 `Rich`：支援 `**粗體**`、行內公式 `$x^2$`、區塊公式 `$$...$$`、
 * 化學式 `$\ce{H2O}$`、以 `- ` 開頭的條列，以及空白行分段。
 *
 * 注意：此檔案也會被 api/（Node, NodeNext）透過 scenarios 匯入，只能有 `import type`。
 */
import type { ComponentType } from "react";

export type SubjectId =
  | "chinese"
  | "english"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth"
  | "geography"
  | "history"
  | "civics";

export type Stage = "junior" | "senior";
export type Grade = 7 | 8 | 9 | 10 | 11 | 12;
export type Rich = string;

export const SUBJECT_IDS: readonly SubjectId[] = [
  "chinese",
  "english",
  "math",
  "physics",
  "chemistry",
  "biology",
  "earth",
  "geography",
  "history",
  "civics",
];
export const STAGES: readonly Stage[] = ["junior", "senior"];
export const STAGE_LABEL: Record<Stage, string> = { junior: "國中", senior: "高中" };

export interface SubjectMeta {
  id: SubjectId;
  /** 顯示名稱，例如「數學」 */
  name: string;
  /** 一字簡稱，例如「數」 */
  short: string;
  icon: string;
  /** 主色（hex），需在淺色與深色背景都清楚 */
  color: string;
  order: number;
  description: string;
  /** 各學段的課程名稱，例如 { junior: "國中理化・物理" } */
  stageLabels: Record<Stage, string>;
}

/* ───────────────────────── 心智圖 / 課綱節點 ───────────────────────── */

export interface CurriculumNode {
  /** `${subject}.${stage}.${slug}`，根節點可用 `${subject}.${stage}` */
  id: string;
  title: string;
  grade?: Grade;
  /** 108 課綱學習內容代碼，如 `N-8-1`、`Ea-Ⅳ-1`。不確定時請省略。 */
  code?: string;
  summary?: Rich;
  keyPoints?: Rich[];
  lessonIds?: string[];
  children?: CurriculumNode[];
}

/* ───────────────────────── 可延遲載入的客製元件 ───────────────────────── */

export type Loader<P> = () => Promise<{ default: ComponentType<P> }>;

/** 客製互動實驗（lab）的 props */
export interface LabProps {
  config?: Record<string, unknown>;
  /** 學生完成實驗目標時呼叫 */
  onComplete: () => void;
}

/** SVG 場景（hotspot / layers 用）。元件只回傳 SVG 子元素（<g>、<path>…），外層 <svg> 由元件庫提供。 */
export interface SceneProps {
  /** 目前被選取的熱區 id（可用來強調場景局部） */
  active?: string | null;
}

/* ───────────────────────── 題目 ───────────────────────── */

interface QuestionBase {
  /** `${subject}.${stage}.q-${slug}` */
  id: string;
  stem: Rich;
  explain: Rich;
  difficulty?: 1 | 2 | 3;
  /** 對應的心智圖節點 id */
  nodeId?: string;
}

export type Question = QuestionBase &
  (
    | { type: "single"; choices: Rich[]; answer: number }
    | { type: "multi"; choices: Rich[]; answer: number[] }
    | { type: "tf"; answer: boolean }
    | { type: "numeric"; answer: number; tolerance?: number; unit?: string }
    | { type: "cloze"; accept: string[] }
  );

/* ───────────────────────── 活動（互動形式） ───────────────────────── */

export type Params = Record<string, number>;

interface ActivityBase {
  /** 在課程內唯一，例如 "a1" */
  id: string;
  title: string;
  prompt?: Rich;
}

export interface SliderParam {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  init: number;
  unit?: string;
}

export interface PlotSpec {
  x: [number, number];
  y: [number, number];
  xLabel?: string;
  yLabel?: string;
  fns?: { label: string; color?: string; f: (x: number, p: Params) => number }[];
  points?: (p: Params) => { x: number; y: number; label?: string; color?: string }[];
  /** 垂直參考線 */
  vlines?: (p: Params) => { x: number; label?: string; color?: string }[];
}

export type MindmapActivity = ActivityBase & { kind: "mindmap"; root: CurriculumNode };

/** 拉桿：由資料定義參數、圖形與讀數，不需寫元件 */
export type SliderActivity = ActivityBase & {
  kind: "slider";
  params: SliderParam[];
  plot?: PlotSpec;
  readouts?: { label: string; value: (p: Params) => string }[];
  /** 達成目標才算完成；沒有目標時操作後按「我懂了」完成 */
  goal?: { text: Rich; test: (p: Params) => boolean };
  insight?: Rich;
};

/** 客製實驗元件（拉桿模擬、動畫等），放在 <subject>/labs/*.tsx */
export type LabActivity = ActivityBase & {
  kind: "lab";
  load: Loader<LabProps>;
  config?: Record<string, unknown>;
  insight?: Rich;
};

export interface DragOption {
  id: string;
  label: Rich;
}

export type DragActivity = ActivityBase &
  (
    | {
        kind: "drag";
        mode: "categorize";
        buckets: DragOption[];
        items: (DragOption & { bucket: string })[];
      }
    | {
        kind: "drag";
        mode: "order";
        /** 依「正確順序」列出，畫面上會自動打亂 */
        items: DragOption[];
      }
    | {
        kind: "drag";
        mode: "match";
        pairs: { id: string; left: Rich; right: Rich }[];
      }
  );

export interface HotspotSpot {
  id: string;
  /** viewBox 座標 */
  x: number;
  y: number;
  title: string;
  body: Rich;
}

export type HotspotActivity = ActivityBase & {
  kind: "hotspot";
  /** 例如 "0 0 400 300" */
  viewBox: string;
  scene: Loader<SceneProps>;
  spots: HotspotSpot[];
  /** explore：點熱點看說明；find：依提示找出正確位置 */
  mode?: "explore" | "find";
};

export interface MapLayer {
  id: string;
  label: string;
  load: Loader<SceneProps>;
  /** 預設是否顯示 */
  on?: boolean;
  /** 圖例色塊 */
  color?: string;
  note?: Rich;
}

export type LayersActivity = ActivityBase & {
  kind: "layers";
  viewBox: string;
  base?: Loader<SceneProps>;
  layers: MapLayer[];
  /** 觀察後的思考題（選填） */
  check?: { stem: Rich; choices: Rich[]; answer: number; explain: Rich };
};

export interface Step {
  show: Rich;
  why?: Rich;
  /** 先讓學生猜這一步 */
  predict?: { question?: Rich; choices: Rich[]; answer: number };
}

export type StepsActivity = ActivityBase & {
  kind: "steps";
  problem: Rich;
  steps: Step[];
  takeaway?: Rich;
};

export interface ScratchCardData {
  front: Rich;
  back: Rich;
  /** 有填時顯示發音按鈕（Web Speech API） */
  speak?: string;
  lang?: "en-US" | "zh-TW";
}

export type ScratchActivity = ActivityBase & { kind: "scratch"; cards: ScratchCardData[] };

export type DialogueActivity = ActivityBase & { kind: "dialogue"; scenarioId: string };

export type CanvasActivity = ActivityBase & {
  kind: "canvas";
  task: Rich;
  background?: "blank" | "grid" | "axes" | "dots";
  hint?: Rich;
  /** 參考答案說明（按鈕展開） */
  reference?: Rich;
  /** 允許「請 AI 看看」 */
  aiFeedback?: boolean;
};

export type QuizActivity = ActivityBase & {
  kind: "quiz";
  /** 引用同一 track 題庫（questions.ts）中的題目 id */
  questionIds: string[];
};

export type MemoryActivity = ActivityBase & { kind: "memory"; pairs: [Rich, Rich][] };

export type ReadActivity = ActivityBase & { kind: "read"; body: Rich };

export type Activity =
  | MindmapActivity
  | SliderActivity
  | LabActivity
  | DragActivity
  | HotspotActivity
  | LayersActivity
  | StepsActivity
  | ScratchActivity
  | DialogueActivity
  | CanvasActivity
  | QuizActivity
  | MemoryActivity
  | ReadActivity;

export type ActivityKind = Activity["kind"];

/** 使用者要求的十種教學形式 → 對應的活動 kind */
export const TEACHING_FORMS = {
  心智圖: ["mindmap"],
  小遊戲: ["quiz", "memory"],
  拉桿: ["slider", "lab"],
  拖拽: ["drag"],
  熱區微動畫: ["hotspot"],
  圖層疊加: ["layers"],
  步驟拆解: ["steps"],
  刮刮樂: ["scratch"],
  對話式情境: ["dialogue"],
  沙盒塗鴉畫布: ["canvas"],
} as const satisfies Record<string, readonly ActivityKind[]>;

/* ───────────────────────── 課程與學段資料 ───────────────────────── */

export interface Lesson {
  /** `${subject}.${stage}.${slug}` */
  id: string;
  title: string;
  grade: Grade;
  /** 預估分鐘數 */
  minutes: number;
  objectives: string[];
  nodeIds?: string[];
  activities: Activity[];
}

/** 每個 `<subject>/<stage>/index.ts` 的 default export */
export interface TrackData {
  mindmap: CurriculumNode;
  lessons: Lesson[];
  questions: Question[];
}

/* ───────────────────────── 對話情境 ───────────────────────── */

export interface ScenarioOption {
  label: string;
  next: string;
  /** 選這個選項後的回饋 */
  feedback?: string;
  /** 是否為較佳選擇（影響結尾評語） */
  good?: boolean;
}

export interface ScenarioNode {
  say: string;
  options?: ScenarioOption[];
  end?: boolean;
}

export interface Scenario {
  /** `${subject}.${stage}.s-${slug}` */
  id: string;
  subject: SubjectId;
  stage: Stage;
  title: string;
  /** 情境說明（給學生看） */
  setting: string;
  /** AI 扮演的角色名稱，例如「鄭成功」「店員 Amy」 */
  aiRole: string;
  aiAvatar?: string;
  userRole: string;
  /** 學習目標（給學生看，也會給 AI） */
  goal: string;
  /** 給 AI 的角色扮演指示（語氣、知識範圍、要引導學生做什麼） */
  persona: string;
  /** 對話語言：英文情境請用 "en" */
  language: "zh-TW" | "en";
  /** 學生可點選的開場建議 */
  suggestions?: string[];
  /** AI 模式下的回合上限 */
  maxTurns?: number;
  /** 腳本模式（沒有 AI 時）起始節點 */
  start: string;
  script: Record<string, ScenarioNode>;
}
