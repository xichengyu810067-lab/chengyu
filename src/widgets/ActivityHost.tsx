import { type ComponentType, Suspense, useState } from "react";
import type { Activity, ActivityKind, MindmapActivity, ReadActivity } from "../content/types";
import { lazyRetry } from "../lib/lazyRetry";
import { Spinner } from "../ui";
import { CompleteBar } from "./kit";
import { ErrorBoundary } from "./LazyHost";
import { RichText } from "./RichText";
import type { WidgetProps } from "./types";

// biome-ignore lint/suspicious/noExplicitAny: 各元件的 activity 型別不同，由 kind 對應保證
type AnyWidget = ComponentType<WidgetProps<any>>;

const MindmapWidget = lazyRetry(async () => {
  const { default: MindMap } = await import("./MindMap");
  function W({ activity, done, onComplete, ctx }: WidgetProps<MindmapActivity>) {
    const [visited, setVisited] = useState<Set<string>>(new Set());
    const need = 3;
    return (
      <div className="space-y-3">
        <MindMap
          root={activity.root}
          color={ctx.color}
          initialDepth={1}
          onVisit={(id) => setVisited((v) => new Set(v).add(id))}
        />
        <CompleteBar
          done={done}
          onComplete={() => onComplete()}
          disabled={visited.size < need}
          hint={
            visited.size < need
              ? `點開至少 ${need} 個節點看看（${visited.size}/${need}）`
              : undefined
          }
        />
      </div>
    );
  }
  return { default: W };
});

function ReadWidget({ activity, done, onComplete }: WidgetProps<ReadActivity>) {
  return (
    <div className="space-y-4">
      <RichText text={activity.body} className="text-[15px]" />
      <CompleteBar done={done} onComplete={() => onComplete()} label="讀完了" />
    </div>
  );
}

const WIDGETS: Record<ActivityKind, AnyWidget> = {
  mindmap: MindmapWidget,
  slider: lazyRetry(() => import("./SliderLab").then((m) => ({ default: m.SliderWidget }))),
  lab: lazyRetry(() => import("./SliderLab").then((m) => ({ default: m.LabWidget }))),
  drag: lazyRetry(() => import("./DragSort")),
  hotspot: lazyRetry(() => import("./Hotspot")),
  layers: lazyRetry(() => import("./LayerViewer")),
  steps: lazyRetry(() => import("./Stepper")),
  scratch: lazyRetry(() => import("./ScratchCard")),
  dialogue: lazyRetry(() => import("./Dialogue")),
  canvas: lazyRetry(() => import("./DoodleCanvas")),
  quiz: lazyRetry(() => import("./Quiz")),
  set: lazyRetry(() => import("./QuestionSet")),
  memory: lazyRetry(() => import("./MemoryMatch")),
  read: ReadWidget,
};

export const KIND_META: Record<ActivityKind, { icon: string; label: string }> = {
  mindmap: { icon: "🧠", label: "心智圖" },
  slider: { icon: "🎚️", label: "拉桿實驗" },
  lab: { icon: "🔬", label: "互動實驗" },
  drag: { icon: "🧩", label: "拖拽" },
  hotspot: { icon: "🎯", label: "熱區探索" },
  layers: { icon: "🗺️", label: "圖層疊加" },
  steps: { icon: "🪜", label: "步驟拆解" },
  scratch: { icon: "🎟️", label: "刮刮樂" },
  dialogue: { icon: "💬", label: "情境對話" },
  canvas: { icon: "🎨", label: "沙盒畫布" },
  quiz: { icon: "✅", label: "練習題" },
  set: { icon: "📑", label: "素養題組" },
  memory: { icon: "🃏", label: "翻牌配對" },
  read: { icon: "📖", label: "閱讀" },
};

export default function ActivityHost(props: WidgetProps<Activity>) {
  const W = WIDGETS[props.activity.kind];
  return (
    <ErrorBoundary key={props.activity.id}>
      <Suspense fallback={<Spinner />}>
        <W {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
