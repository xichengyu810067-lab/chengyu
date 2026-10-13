import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import {
  getSubject,
  hasTrack,
  isStage,
  isSubjectId,
  loadTrack,
  trackId,
} from "../content/registry";
import { shuffle } from "../lib/date";
import { useAsync } from "../lib/hooks";
import { useProgress } from "../lib/progress";
import { EmptyState, PageTitle, Spinner } from "../ui";
import QuizGame from "../widgets/QuizGame";

export default function GamePage() {
  const { stage = "", subject = "" } = useParams();
  const valid = isStage(stage) && isSubjectId(subject) && hasTrack(subject, stage);
  const { data: track, loading } = useAsync(
    () => (valid ? loadTrack(subject, stage) : Promise.resolve(null)),
    `${subject}.${stage}`,
  );
  const [round, setRound] = useState(0);
  const recordGame = useProgress((s) => s.recordGame);
  const tid = valid ? trackId(subject, stage) : "";
  const best = useProgress((s) => s.games[tid]);
  const meta = getSubject(subject);
  // biome-ignore lint/correctness/useExhaustiveDependencies: round 改變時重新抽題
  const questions = useMemo(
    () => (track ? shuffle(track.questions).slice(0, 10) : []),
    [track, round],
  );

  if (!valid || !meta) {
    return (
      <EmptyState icon="🎮" title="找不到這個遊戲">
        <Link to="/" className="btn-primary mt-4">
          回首頁
        </Link>
      </EmptyState>
    );
  }
  if (loading || !track) return <Spinner />;
  return (
    <div className="space-y-4">
      <nav className="text-sm text-slate-500">
        <Link to={`/learn/${stage}/${subject}`} className="hover:underline">
          ← 回到{meta.stageLabels[stage]}
        </Link>
      </nav>
      <PageTitle sub="從題庫隨機抽 10 題，限時作答、連擊加分！">
        {meta.icon} {meta.stageLabels[stage]}闖關
      </PageTitle>
      <QuizGame
        key={round}
        questions={questions}
        color={meta.color}
        title={`${meta.name}闖關挑戰`}
        best={best}
        onFinish={(r) => recordGame(tid, r.score)}
        onRestart={() => setRound((n) => n + 1)}
      />
    </div>
  );
}
