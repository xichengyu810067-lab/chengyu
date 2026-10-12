import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/Layout";
import RouteError from "./components/RouteError";

type PageModule = { default: ComponentType };
const page = (load: () => Promise<PageModule>) => async () => ({
  Component: (await load()).default,
});

export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    hydrateFallbackElement: <div className="p-8 text-center text-slate-400">載入中…</div>,
    children: [
      { index: true, lazy: page(() => import("./pages/Home")) },
      { path: "learn/:stage", lazy: page(() => import("./pages/StagePage")) },
      { path: "learn/:stage/:subject", lazy: page(() => import("./pages/SubjectPage")) },
      { path: "lesson/:lessonId", lazy: page(() => import("./pages/LessonPage")) },
      { path: "play/:stage/:subject", lazy: page(() => import("./pages/GamePage")) },
      { path: "daily", lazy: page(() => import("./pages/DailyPage")) },
      { path: "review", lazy: page(() => import("./pages/ReviewPage")) },
      { path: "tutor", lazy: page(() => import("./pages/TutorPage")) },
      { path: "sandbox", lazy: page(() => import("./pages/SandboxPage")) },
      { path: "me", lazy: page(() => import("./pages/MePage")) },
      { path: "about", lazy: page(() => import("./pages/AboutPage")) },
      { path: "privacy", lazy: page(() => import("./pages/PrivacyPage")) },
      { path: "gallery", lazy: page(() => import("./pages/GalleryPage")) },
      { path: "*", lazy: page(() => import("./pages/NotFound")) },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
