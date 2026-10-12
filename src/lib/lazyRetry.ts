import { type ComponentType, lazy } from "react";

/** 動態載入失敗（網路不穩、剛部署新版本）時自動重試一次 */
export function retryImport<T>(load: () => Promise<T>, delayMs = 600): Promise<T> {
  return load().catch(
    () =>
      new Promise<T>((resolve, reject) => setTimeout(() => load().then(resolve, reject), delayMs)),
  );
}

// biome-ignore lint/suspicious/noExplicitAny: 與 React.lazy 的型別一致
export function lazyRetry<T extends ComponentType<any>>(load: () => Promise<{ default: T }>) {
  return lazy(() => retryImport(load));
}

export function isChunkError(e: unknown): boolean {
  return (
    e instanceof Error &&
    /dynamically imported module|Importing a module script|Failed to fetch|error loading dynamically/i.test(
      e.message,
    )
  );
}
