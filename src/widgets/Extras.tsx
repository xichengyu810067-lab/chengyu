import { EXTRA_META, type Extra } from "../content/types";
import { RichText } from "./RichText";

/** 課外補充清單：每則可展開閱讀 */
export default function Extras({
  extras,
  className = "",
}: {
  extras: Extra[];
  className?: string;
}) {
  if (extras.length === 0) return null;
  return (
    <div className={`space-y-2 ${className}`} data-testid="extras">
      {extras.map((e, i) => (
        <details
          key={`${e.kind}-${i}`}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        >
          <summary className="cursor-pointer text-sm font-semibold">
            <span className="chip mr-2 text-xs">
              {EXTRA_META[e.kind].icon} {EXTRA_META[e.kind].label}
            </span>
            {e.title}
          </summary>
          <RichText text={e.body} className="mt-2 text-sm text-slate-700 dark:text-slate-200" />
        </details>
      ))}
    </div>
  );
}
