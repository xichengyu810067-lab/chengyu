#!/usr/bin/env node
// 檢查單一科目的內容：型別、lint、內容測試、課程巡覽 e2e
// 用法：pnpm check:subject <subjectId> [--no-e2e]
import { spawnSync } from "node:child_process";

const id = process.argv[2];
const noE2e = process.argv.includes("--no-e2e");
const SUBJECTS = [
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
if (!SUBJECTS.includes(id)) {
  console.error(`請指定科目：${SUBJECTS.join(" | ")}`);
  process.exit(2);
}

const steps = [
  ["型別檢查", "pnpm", ["typecheck"]],
  ["Lint", "pnpm", ["exec", "biome", "check", `src/content/${id}`]],
  ["內容測試", "pnpm", ["exec", "vitest", "run", "tests/content"], { CONTENT_SUBJECT: id }],
];
if (!noE2e) {
  steps.push(["建置", "pnpm", ["build"]]);
  steps.push([
    "課程巡覽 e2e",
    "pnpm",
    ["exec", "playwright", "test", "tests/e2e/lessons.spec.ts", "--project=desktop"],
    { E2E_SUBJECT: id },
  ]);
}

for (const [name, cmd, args, env] of steps) {
  console.log(`\n▶ ${name}`);
  const r = spawnSync(cmd, args, { stdio: "inherit", env: { ...process.env, ...env } });
  if (r.status !== 0) {
    console.error(`\n✗ ${name} 失敗`);
    process.exit(r.status ?? 1);
  }
}
console.log(`\n✓ ${id} 全部檢查通過`);
