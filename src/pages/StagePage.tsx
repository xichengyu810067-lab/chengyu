import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { isStage } from "../content/registry";
import { useProgress } from "../lib/progress";

/** /learn/:stage → 切換學段後回到首頁的科目列表 */
export default function StagePage() {
  const { stage = "" } = useParams();
  const setProfile = useProgress((s) => s.setProfile);
  useEffect(() => {
    if (isStage(stage)) setProfile({ stage });
  }, [stage, setProfile]);
  return <Navigate to="/#subjects" replace />;
}
