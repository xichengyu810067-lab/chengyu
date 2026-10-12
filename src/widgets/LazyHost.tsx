import { Component, type ComponentType, lazy, type ReactNode, Suspense } from "react";
import type { Loader } from "../content/types";
import { Spinner } from "../ui";

const cache = new WeakMap<Loader<never>, ComponentType<never>>();

function getLazy<P>(load: Loader<P>): ComponentType<P> {
  const key = load as unknown as Loader<never>;
  let C = cache.get(key) as ComponentType<P> | undefined;
  if (!C) {
    C = lazy(load) as unknown as ComponentType<P>;
    cache.set(key, C as unknown as ComponentType<never>);
  }
  return C;
}

/** 依 loader 函式延遲載入元件（同一 loader 只建立一次 lazy 元件） */
export function LazyComponent<P extends object>({ load, props }: { load: Loader<P>; props: P }) {
  const C = getLazy(load) as ComponentType<P>;
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <C {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

/** 給 SVG 場景使用（回傳 <g>） */
export function LazyScene<P extends object>({ load, props }: { load: Loader<P>; props: P }) {
  const C = getLazy(load) as ComponentType<P>;
  return (
    <Suspense fallback={null}>
      <C {...props} />
    </Suspense>
  );
}

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error("[活動錯誤]", error);
  }
  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div
            className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
            role="alert"
          >
            <p className="font-semibold">這個互動暫時無法顯示 😢</p>
            <p className="mt-1">可以先跳過，繼續下一個活動。</p>
            <button
              type="button"
              className="btn-secondary mt-3"
              onClick={() => this.setState({ error: null })}
            >
              再試一次
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
