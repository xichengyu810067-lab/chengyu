import { type ComponentType, lazy } from "react";

const RELOAD_KEY = "lp-chunk-reload";

export function isChunkError(e: unknown): boolean {
  return (
    e instanceof Error &&
    /dynamically imported module|Importing a module script|Failed to fetch|error loading dynamically/i.test(
      e.message,
    )
  );
}

/**
 * 動態載入失敗時的處理：瀏覽器會快取失敗的模組，同一網址重試沒有用，
 * 因此若是 chunk 載入錯誤（多半是網站剛更新、舊檔已不存在），自動重新整理頁面一次。
 * 30 秒內不重複重新整理，避免無限循環。
 */
export function retryImport<T>(load: () => Promise<T>): Promise<T> {
  return load().catch((err: unknown) => {
    if (typeof window !== "undefined" && isChunkError(err)) {
      try {
        const last = Number(window.sessionStorage.getItem(RELOAD_KEY) ?? 0);
        if (Date.now() - last > 30_000) {
          window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
          window.location.reload();
          return new Promise<T>(() => {});
        }
      } catch {
        /* sessionStorage 不可用時直接拋出錯誤 */
      }
    }
    throw err;
  });
}

// biome-ignore lint/suspicious/noExplicitAny: 與 React.lazy 的型別一致
export function lazyRetry<T extends ComponentType<any>>(load: () => Promise<{ default: T }>) {
  return lazy(() => retryImport(load));
}
