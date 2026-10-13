import { useState } from "react";
import { useProgress } from "../lib/progress";
import { PageTitle } from "../ui";
import { DoodleCanvas } from "../widgets/DoodleCanvas";

const IDEAS = [
  "畫出 y = x² − 2x − 3 的大概圖形，標出頂點與 x 截距",
  "畫一張「光合作用」的流程圖",
  "畫出斜面上木塊的受力圖",
  "用心智圖整理「清領時期臺灣」",
  "畫出串聯與並聯電路",
];

export default function SandboxPage() {
  const [task, setTask] = useState("");
  const stage = useProgress((s) => s.profile.stage);
  const bumpUsage = useProgress((s) => s.bumpUsage);
  const [counted, setCounted] = useState(false);
  return (
    <div className="space-y-4">
      <PageTitle sub="自由畫圖、作圖、整理筆記。畫好可以下載，或請 AI 給你回饋。">
        🎨 沙盒畫布
      </PageTitle>
      <div className="card space-y-2 p-4">
        <label htmlFor="task" className="text-sm font-semibold">
          今天想畫什麼？（選填，AI 會依此給回饋）
        </label>
        <input
          id="task"
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="例如：畫出細胞的構造"
          maxLength={200}
        />
        <div className="flex flex-wrap gap-2">
          {IDEAS.map((i) => (
            <button
              key={i}
              type="button"
              className="chip cursor-pointer hover:bg-brand-100 dark:hover:bg-brand-900"
              onClick={() => setTask(i)}
            >
              💡 {i}
            </button>
          ))}
        </div>
      </div>
      <DoodleCanvas
        background="grid"
        task={task || "自由創作"}
        aiFeedback
        stage={stage}
        onDrawn={() => {
          if (!counted) {
            setCounted(true);
            bumpUsage("canvas");
          }
        }}
      />
    </div>
  );
}
