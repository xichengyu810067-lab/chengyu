import { STAGE_LABEL } from "../content/types";
import { useProgress } from "../lib/progress";

export default function StageSwitch({
  className = "",
  label = "選擇學段",
}: {
  className?: string;
  label?: string;
}) {
  const stage = useProgress((s) => s.profile.stage);
  const setProfile = useProgress((s) => s.setProfile);
  return (
    <fieldset
      className={`flex rounded-xl bg-slate-100 p-0.5 text-sm dark:bg-slate-800 ${className}`}
    >
      <legend className="sr-only">{label}</legend>
      {(["junior", "senior"] as const).map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={stage === s}
          onClick={() => setProfile({ stage: s })}
          className={`rounded-lg px-4 py-1.5 font-semibold transition ${
            stage === s
              ? "bg-white text-brand-700 shadow-sm dark:bg-slate-950 dark:text-brand-300"
              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {STAGE_LABEL[s]}
        </button>
      ))}
    </fieldset>
  );
}
