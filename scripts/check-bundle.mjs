#!/usr/bin/env node
// 建置後檢查：主程式 chunk 大小、不可把伺服器端 SDK 或金鑰打包進前端
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const DIST = "dist";
const MAX_ENTRY_GZIP_KB = 180;
const manifest = JSON.parse(readFileSync(join(DIST, ".vite/manifest.json"), "utf8"));
const entry = Object.values(manifest).find((c) => c.isEntry);
if (!entry) throw new Error("找不到 entry chunk");

const files = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : [p];
  });

let failed = false;
const entryKb = gzipSync(readFileSync(join(DIST, entry.file))).length / 1024;
console.log(`entry ${entry.file}: ${entryKb.toFixed(1)} KB gzip（上限 ${MAX_ENTRY_GZIP_KB} KB）`);
if (entryKb > MAX_ENTRY_GZIP_KB) {
  console.error("✗ 主程式太大，請改用延遲載入");
  failed = true;
}

const FORBIDDEN = [/sk-ant-[A-Za-z0-9]/, /anthropic-version/, /ANTHROPIC_API_KEY/];
for (const f of files(DIST).filter((f) => /\.(js|html|css|json)$/.test(f))) {
  const text = readFileSync(f, "utf8");
  for (const re of FORBIDDEN) {
    if (re.test(text)) {
      console.error(`✗ ${f} 含有不應出現在前端的內容：${re}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log("✓ bundle 檢查通過");
