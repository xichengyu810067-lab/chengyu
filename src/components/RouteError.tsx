import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function RouteError() {
  const error = useRouteError();
  const chunkError =
    error instanceof Error &&
    /dynamically imported module|Failed to fetch|Importing a module/i.test(error.message);
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "未知錯誤";
  return (
    <div className="mx-auto max-w-lg p-8 text-center">
      <p className="text-5xl">🛸</p>
      <h1 className="mt-4 text-2xl font-bold">糟糕，頁面出了點狀況</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        {chunkError ? "網站剛更新過，請重新整理頁面。" : "請重新整理，或回到首頁再試一次。"}
      </p>
      <p className="mt-2 text-xs break-all text-slate-400">{message}</p>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
          重新整理
        </button>
        <Link to="/" className="btn-secondary" reloadDocument>
          回首頁
        </Link>
      </div>
    </div>
  );
}
