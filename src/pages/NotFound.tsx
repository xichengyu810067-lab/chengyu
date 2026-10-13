import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-6xl">🌌</p>
      <h1 className="mt-4 text-2xl font-bold">迷航了！找不到這個頁面</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        這顆星球還沒有被發現，回到首頁重新出發吧。
      </p>
      <Link to="/" className="btn-primary mt-6">
        回到首頁
      </Link>
    </div>
  );
}
