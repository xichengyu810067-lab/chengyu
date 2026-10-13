import { useMemo, useState } from "react";
import { Link } from "react-router";
import type { CurriculumNode } from "../content/types";
import { useMediaQuery } from "../lib/hooks";
import { Rich, RichText } from "./RichText";

interface Placed {
  node: CurriculumNode;
  depth: number;
  x: number;
  y: number;
  parent?: Placed;
  hiddenChildren: number;
}

const COL_W = 210;
const NODE_W = 172;
const NODE_H = 44;
const ROW_H = 56;

function collectIds(n: CurriculumNode, depthLimit: number, depth = 0, out = new Set<string>()) {
  if (depth < depthLimit && n.children?.length) {
    out.add(n.id);
    for (const c of n.children) collectIds(c, depthLimit, depth + 1, out);
  }
  return out;
}

function countNodes(n: CurriculumNode): number {
  return 1 + (n.children ?? []).reduce((s, c) => s + countNodes(c), 0);
}

function layout(root: CurriculumNode, expanded: Set<string>): Placed[] {
  const out: Placed[] = [];
  let leaf = 0;
  const walk = (node: CurriculumNode, depth: number, parent?: Placed): Placed => {
    const open = expanded.has(node.id) && (node.children?.length ?? 0) > 0;
    const placed: Placed = {
      node,
      depth,
      x: depth * COL_W,
      y: 0,
      parent,
      hiddenChildren: open ? 0 : (node.children?.length ?? 0),
    };
    out.push(placed);
    if (open && node.children) {
      const kids = node.children.map((c) => walk(c, depth + 1, placed));
      placed.y = (kids[0].y + kids[kids.length - 1].y) / 2;
    } else {
      placed.y = leaf * ROW_H;
      leaf++;
    }
    return placed;
  };
  walk(root, 0);
  return out;
}

export interface MindMapProps {
  root: CurriculumNode;
  color?: string;
  initialDepth?: number;
  /** 課程 id → 標題（用來顯示節點對應課程） */
  lessonTitles?: Map<string, string>;
  completedLessons?: Set<string>;
  onVisit?: (nodeId: string) => void;
  className?: string;
}

export default function MindMap({
  root,
  color = "#4f46e5",
  initialDepth = 1,
  lessonTitles,
  completedLessons,
  onVisit,
  className = "",
}: MindMapProps) {
  const wide = useMediaQuery("(min-width: 640px)");
  const [view, setView] = useState<"graph" | "outline" | null>(null);
  const mode = view ?? (wide ? "graph" : "outline");
  const [expanded, setExpanded] = useState<Set<string>>(() => collectIds(root, initialDepth));
  const [selected, setSelected] = useState<CurriculumNode | null>(null);
  const [zoom, setZoom] = useState(1);

  const placed = useMemo(() => layout(root, expanded), [root, expanded]);
  const total = useMemo(() => countNodes(root), [root]);
  const maxDepth = Math.max(...placed.map((p) => p.depth));
  const minY = Math.min(...placed.map((p) => p.y));
  const maxY = Math.max(...placed.map((p) => p.y));
  const width = (maxDepth + 1) * COL_W + 20;
  const height = maxY - minY + NODE_H + 24;

  const toggle = (n: CurriculumNode) => {
    setSelected(n);
    onVisit?.(n.id);
    if (!n.children?.length) return;
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(n.id)) next.delete(n.id);
      else next.add(n.id);
      return next;
    });
  };

  const expandAll = () => setExpanded(collectIds(root, 99));
  const collapseAll = () => setExpanded(new Set([root.id]));

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <fieldset className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
          <legend className="sr-only">檢視方式</legend>
          {(
            [
              ["graph", "🧠 心智圖"],
              ["outline", "📋 大綱"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setView(m)}
              className={`rounded-md px-3 py-1 font-medium ${mode === m ? "bg-white shadow-sm dark:bg-slate-950" : "text-slate-500"}`}
            >
              {label}
            </button>
          ))}
        </fieldset>
        <button type="button" className="btn-ghost min-h-8 px-2 py-1" onClick={expandAll}>
          全部展開
        </button>
        <button type="button" className="btn-ghost min-h-8 px-2 py-1" onClick={collapseAll}>
          收合
        </button>
        {mode === "graph" && (
          <span className="ml-auto flex items-center gap-1">
            <button
              type="button"
              className="btn-ghost min-h-8 px-2 py-1"
              aria-label="縮小"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
            >
              −
            </button>
            <span className="w-10 text-center text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="btn-ghost min-h-8 px-2 py-1"
              aria-label="放大"
              onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
            >
              ＋
            </button>
          </span>
        )}
        <span className="text-xs text-slate-500">共 {total} 個知識點</span>
      </div>

      {mode === "graph" ? (
        <div
          className="max-h-[70vh] overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950"
          data-testid="mindmap-graph"
        >
          <svg
            width={width * zoom}
            height={height * zoom}
            viewBox={`-10 ${minY - 12} ${width} ${height}`}
            aria-label={`${root.title} 心智圖`}
          >
            {placed
              .filter((p) => p.parent)
              .map((p) => {
                const parent = p.parent as Placed;
                const x1 = parent.x + NODE_W;
                const y1 = parent.y + NODE_H / 2;
                const x2 = p.x;
                const y2 = p.y + NODE_H / 2;
                const mx = (x1 + x2) / 2;
                return (
                  <path
                    key={`e-${p.node.id}`}
                    d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                    fill="none"
                    stroke={color}
                    strokeOpacity={0.45}
                    strokeWidth={p.depth === 1 ? 3 : 2}
                  />
                );
              })}
            {placed.map((p) => {
              const isRoot = p.depth === 0;
              const isSel = selected?.id === p.node.id;
              const hasKids = (p.node.children?.length ?? 0) > 0;
              return (
                <g
                  key={p.node.id}
                  style={{
                    transform: `translate(${p.x}px, ${p.y}px)`,
                    transition: "transform .3s ease",
                  }}
                >
                  <foreignObject width={NODE_W} height={NODE_H}>
                    <button
                      type="button"
                      aria-expanded={hasKids ? expanded.has(p.node.id) : undefined}
                      aria-pressed={isSel}
                      onClick={() => toggle(p.node)}
                      className="flex h-full w-full items-center gap-1 overflow-hidden rounded-xl border-2 px-2 text-left text-[13px] leading-tight font-semibold shadow-sm transition hover:brightness-95"
                      style={{
                        borderColor: color,
                        background: isRoot
                          ? color
                          : p.depth === 1
                            ? `${color}22`
                            : "var(--mm-bg, white)",
                        color: isRoot ? "white" : undefined,
                        outline: isSel ? `3px solid ${color}66` : undefined,
                      }}
                    >
                      <span
                        className="line-clamp-2 flex-1 dark:text-slate-100"
                        style={isRoot ? { color: "white" } : undefined}
                      >
                        <Rich text={p.node.title} />
                      </span>
                      {p.node.lessonIds?.length ? (
                        <span role="img" aria-label="有互動課程">
                          📘
                        </span>
                      ) : null}
                      {p.hiddenChildren > 0 && (
                        <span className="rounded-full bg-slate-900/10 px-1.5 text-[11px] dark:bg-white/20">
                          +{p.hiddenChildren}
                        </span>
                      )}
                    </button>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        <div
          className="rounded-xl border border-slate-200 p-2 dark:border-slate-800"
          data-testid="mindmap-outline"
        >
          <OutlineNode
            node={root}
            depth={0}
            expanded={expanded}
            onToggle={toggle}
            selectedId={selected?.id}
            color={color}
          />
        </div>
      )}

      {selected && (
        <div
          className="card animate-fade-in p-4"
          style={{ borderLeft: `4px solid ${color}` }}
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold">
              <Rich text={selected.title} />
            </h3>
            {selected.grade && <span className="chip">{selected.grade} 年級</span>}
            {selected.code && <span className="chip font-mono">課綱 {selected.code}</span>}
          </div>
          {selected.summary && (
            <RichText text={selected.summary} className="mt-2 text-slate-700 dark:text-slate-200" />
          )}
          {selected.keyPoints?.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
              {selected.keyPoints.map((k, i) => (
                <li key={i}>
                  <RichText text={k} inline />
                </li>
              ))}
            </ul>
          ) : null}
          {selected.lessonIds?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.lessonIds.map((id) => (
                <Link key={id} to={`/lesson/${id}`} className="btn-primary min-h-9 py-1.5">
                  {completedLessons?.has(id) ? "✅" : "📘"} {lessonTitles?.get(id) ?? "前往課程"}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function OutlineNode({
  node,
  depth,
  expanded,
  onToggle,
  selectedId,
  color,
}: {
  node: CurriculumNode;
  depth: number;
  expanded: Set<string>;
  onToggle: (n: CurriculumNode) => void;
  selectedId?: string;
  color: string;
}) {
  const hasKids = (node.children?.length ?? 0) > 0;
  const open = expanded.has(node.id);
  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(node)}
        aria-expanded={hasKids ? open : undefined}
        className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
          selectedId === node.id ? "bg-slate-100 dark:bg-slate-800" : ""
        }`}
        style={{ paddingLeft: 8 + depth * 18 }}
      >
        <span className="w-4 text-xs text-slate-400" aria-hidden>
          {hasKids ? (open ? "▾" : "▸") : "•"}
        </span>
        <span
          className={depth === 0 ? "font-bold" : depth === 1 ? "font-semibold" : ""}
          style={depth <= 1 ? { color } : undefined}
        >
          <Rich text={node.title} />
        </span>
        {node.lessonIds?.length ? (
          <span role="img" aria-label="有互動課程">
            📘
          </span>
        ) : null}
        {node.code && (
          <span className="ml-auto font-mono text-[11px] text-slate-400">{node.code}</span>
        )}
      </button>
      {hasKids && open && (
        <div>
          {node.children?.map((c) => (
            <OutlineNode
              key={c.id}
              node={c}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              selectedId={selectedId}
              color={color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
