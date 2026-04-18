"use client";

import { useState } from "react";
import { OPENINGS } from "@/lib/chess-openings";
import { useChessTraining } from "@/hooks/useChessTraining";
import type { AttemptRecord } from "@/lib/chess-types";
import { OpeningSelector } from "./chess/OpeningSelector";
import { PathList } from "./chess/PathList";
import { TrainingBoard } from "./chess/TrainingBoard";
import { TrainingResult } from "./chess/TrainingResult";

type ChessView =
  | { screen: "select-opening" }
  | { screen: "select-path"; openingId: string }
  | { screen: "training"; openingId: string; pathId: string }
  | {
      screen: "result";
      openingId: string;
      pathId: string;
      attempt: AttemptRecord;
    };

export function ChessTrainer() {
  const [view, setView] = useState<ChessView>({ screen: "select-opening" });
  // Key to force remount of TrainingBoard when restarting
  const [trainingKey, setTrainingKey] = useState(0);

  const {
    isFirstTime,
    recordAttempt,
    getOpeningStats,
    getPathStatus,
    getLastAttempt,
  } = useChessTraining();

  if (view.screen === "select-opening") {
    return (
      <OpeningSelector
        openings={OPENINGS}
        getStats={getOpeningStats}
        onSelect={(openingId) =>
          setView({ screen: "select-path", openingId })
        }
      />
    );
  }

  if (view.screen === "select-path") {
    const opening = OPENINGS.find((o) => o.id === view.openingId);
    if (!opening) return null;

    return (
      <PathList
        opening={opening}
        getPathStatus={getPathStatus}
        getLastAttempt={getLastAttempt}
        stats={getOpeningStats(opening.id)}
        onSelectPath={(pathId) =>
          setView({ screen: "training", openingId: view.openingId, pathId })
        }
        onBack={() => setView({ screen: "select-opening" })}
      />
    );
  }

  if (view.screen === "training") {
    const opening = OPENINGS.find((o) => o.id === view.openingId);
    const path = opening?.paths.find((p) => p.id === view.pathId);
    if (!opening || !path) return null;

    return (
      <TrainingBoard
        key={trainingKey}
        path={path}
        isFirstTime={isFirstTime(path.id)}
        onComplete={(attempt) => {
          recordAttempt(path.id, opening.id, attempt);
          setView({
            screen: "result",
            openingId: view.openingId,
            pathId: view.pathId,
            attempt,
          });
        }}
        onBack={() =>
          setView({ screen: "select-path", openingId: view.openingId })
        }
      />
    );
  }

  if (view.screen === "result") {
    const opening = OPENINGS.find((o) => o.id === view.openingId);
    const path = opening?.paths.find((p) => p.id === view.pathId);
    if (!opening || !path) return null;

    const pathStatus = getPathStatus(path.id);

    return (
      <TrainingResult
        pathName={path.name}
        attempt={view.attempt}
        isMastered={pathStatus === "mastered"}
        onTrainAgain={() => {
          setTrainingKey((k) => k + 1);
          setView({
            screen: "training",
            openingId: view.openingId,
            pathId: view.pathId,
          });
        }}
        onBackToPaths={() =>
          setView({ screen: "select-path", openingId: view.openingId })
        }
      />
    );
  }

  return null;
}
