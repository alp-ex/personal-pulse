"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import type {
  OpeningPath,
  AttemptRecord,
  MistakeRecord,
} from "@/lib/chess-types";

interface TrainingBoardProps {
  path: OpeningPath;
  isFirstTime: boolean;
  onComplete: (attempt: AttemptRecord) => void;
  onBack: () => void;
}

type FeedbackState =
  | { type: "idle" }
  | { type: "correct" }
  | { type: "wrong"; hint: string }
  | { type: "explanation"; text: string; moveSan: string };

export function TrainingBoard({
  path,
  isFirstTime,
  onComplete,
  onBack,
}: TrainingBoardProps) {
  const [game, setGame] = useState(new Chess());
  const gameRef = useRef(game);
  const [moveIndex, setMoveIndex] = useState(0);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>({ type: "idle" });
  const [waitingForUser, setWaitingForUser] = useState(false);
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [moveRevealed, setMoveRevealed] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep gameRef in sync so callbacks always see the latest game
  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  // Count how many moves the user needs to make
  const userMoveCount = path.moves.filter((_, i) => {
    // Black plays on odd indices (0-indexed: e4=0, c5=1, Nf3=2, d6=3, ...)
    return path.playerColor === "black" ? i % 2 === 1 : i % 2 === 0;
  }).length;

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Determine if current move is user's turn
  const isUserTurn = useCallback(
    (idx: number) => {
      if (idx >= path.moves.length) return false;
      return path.playerColor === "black" ? idx % 2 === 1 : idx % 2 === 0;
    },
    [path]
  );

  // Play opponent move automatically (uses gameRef to avoid stale closure)
  const playOpponentMove = useCallback(
    (idx: number) => {
      if (idx >= path.moves.length) return;
      const move = path.moves[idx];

      timeoutRef.current = setTimeout(() => {
        const gameCopy = new Chess(gameRef.current.fen());
        gameCopy.move({ from: move.from, to: move.to });
        setGame(gameCopy);

        const nextIdx = idx + 1;
        setMoveIndex(nextIdx);
        setWrongAttempts(0);
        setMoveRevealed(false);

        // Check if training is done
        if (nextIdx >= path.moves.length) {
          finishTraining();
          return;
        }

        // If next move is also opponent's, chain it
        if (!isUserTurn(nextIdx)) {
          playOpponentMove(nextIdx);
        } else {
          setWaitingForUser(true);
          showUserFeedback(nextIdx);
        }
      }, 600);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, isUserTurn]
  );

  // Show the appropriate feedback for the user's turn
  const showUserFeedback = useCallback(
    (idx: number) => {
      const move = path.moves[idx];
      if (isFirstTime && move.explanation) {
        setFeedback({
          type: "explanation",
          text: move.explanation,
          moveSan: move.san,
        });
      } else {
        setFeedback({ type: "idle" });
      }
    },
    [path, isFirstTime]
  );

  // Record and finish
  const finishTrainingRef = useRef<() => void>(null);
  finishTrainingRef.current = () => {
    const attempt: AttemptRecord = {
      date: new Date().toISOString(),
      totalMoves: userMoveCount,
      correctMoves: correctCount,
      mistakes: [...mistakes],
      completed: true,
    };
    onComplete(attempt);
  };

  const finishTraining = () => finishTrainingRef.current?.();

  // Start: play opponent move if they go first
  useEffect(() => {
    if (moveIndex === 0 && !isUserTurn(0)) {
      playOpponentMove(0);
    } else if (moveIndex === 0 && isUserTurn(0)) {
      setWaitingForUser(true);
      showUserFeedback(0);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle user's piece drop (react-chessboard v5 API)
  function handlePieceDrop({
    sourceSquare,
    targetSquare,
  }: {
    piece: { isSparePiece: boolean; position: string; pieceType: string };
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean {
    if (!waitingForUser || moveIndex >= path.moves.length || !targetSquare)
      return false;

    const expectedMove = path.moves[moveIndex];

    // Try the move on a copy first
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move({ from: sourceSquare, to: targetSquare });

    if (!result) return false; // Illegal move

    // Check if it matches the expected move
    if (
      sourceSquare === expectedMove.from &&
      targetSquare === expectedMove.to
    ) {
      // Correct move
      setGame(gameCopy);
      setCorrectCount((c) => c + 1);
      setWaitingForUser(false);
      setHighlightSquares({
        [targetSquare]: { backgroundColor: "rgba(34, 197, 94, 0.4)" },
      });
      setFeedback({ type: "correct" });

      const nextIdx = moveIndex + 1;
      setMoveIndex(nextIdx);
      setWrongAttempts(0);
      setMoveRevealed(false);

      timeoutRef.current = setTimeout(() => {
        setHighlightSquares({});

        if (nextIdx >= path.moves.length) {
          finishTraining();
          return;
        }

        if (!isUserTurn(nextIdx)) {
          playOpponentMove(nextIdx);
        } else {
          setWaitingForUser(true);
          showUserFeedback(nextIdx);
        }
      }, 400);

      return true;
    } else {
      // Wrong move — record mistake, undo, show hint
      setMistakes((prev) => [
        ...prev,
        {
          moveIndex: moveIndex,
          played: result.san,
          expected: expectedMove.san,
        },
      ]);

      setWrongAttempts((n) => n + 1);

      // Show hint feedback
      const hint =
        expectedMove.hint || "That's not quite right. Try another move.";
      setFeedback({ type: "wrong", hint });

      // If the move has been revealed, keep the amber highlight on from/to
      // squares. Otherwise flash the wrong square red and clear after 1.5s.
      if (!moveRevealed) {
        setHighlightSquares({
          [targetSquare]: { backgroundColor: "rgba(239, 68, 68, 0.4)" },
        });
        timeoutRef.current = setTimeout(() => {
          setHighlightSquares({});
        }, 1500);
      }

      return false;
    }
  }

  // Reveal the correct move: highlight from/to squares in amber
  const revealMove = () => {
    if (moveIndex >= path.moves.length) return;
    const expectedMove = path.moves[moveIndex];
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMoveRevealed(true);
    setHighlightSquares({
      [expectedMove.from]: { backgroundColor: "rgba(251, 191, 36, 0.5)" },
      [expectedMove.to]: { backgroundColor: "rgba(251, 191, 36, 0.5)" },
    });
  };

  // Build the move history display
  const playedMoves = path.moves.slice(0, moveIndex);
  const moveHistory: string[] = [];
  for (let i = 0; i < playedMoves.length; i += 2) {
    const moveNum = Math.floor(i / 2) + 1;
    const white = playedMoves[i]?.san || "";
    const black = playedMoves[i + 1]?.san || "";
    moveHistory.push(`${moveNum}.${white}${black ? ` ${black}` : ""}`);
  }

  // Count user moves so far
  const userMovesSoFar = playedMoves.filter((_, i) =>
    path.playerColor === "black" ? i % 2 === 1 : i % 2 === 0
  ).length;

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Move {userMovesSoFar}/{userMoveCount}
        </span>
      </div>

      {/* Path name */}
      <h3 className="text-base font-semibold mb-3 text-center">
        {path.name}
      </h3>

      {/* Chessboard */}
      <div className="flex justify-center mb-4">
        <div className="w-full max-w-[480px]">
          <Chessboard
            options={{
              position: game.fen(),
              onPieceDrop: handlePieceDrop,
              boardOrientation: path.playerColor,
              allowDragging: waitingForUser,
              animationDurationInMs: 300,
              boardStyle: { borderRadius: "8px" },
              darkSquareStyle: { backgroundColor: "#769656" },
              lightSquareStyle: { backgroundColor: "#eeeed2" },
              squareStyles: highlightSquares,
            }}
          />
        </div>
      </div>

      {/* Feedback area */}
      {feedback.type === "explanation" && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-900/20 p-4 mb-4">
          <div className="text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-1">
            Play <span className="font-bold">{feedback.moveSan}</span>
          </div>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            {feedback.text}
          </p>
        </div>
      )}

      {feedback.type === "correct" && (
        <div className="rounded-xl border border-green-200 dark:border-green-800/40 bg-green-50 dark:bg-green-900/20 p-3 mb-4 text-center">
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Correct!
          </span>
        </div>
      )}

      {feedback.type === "wrong" && (
        <div className="rounded-xl border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-900/20 p-4 mb-4">
          <div className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
            Not quite right
          </div>
          <p className="text-sm text-red-600 dark:text-red-400">
            {feedback.hint}
          </p>
          {moveRevealed && moveIndex < path.moves.length && (
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
              The move is{" "}
              <strong className="font-semibold">
                {path.moves[moveIndex].san}
              </strong>
              . The highlighted squares show where to play.
            </p>
          )}
          {wrongAttempts >= 2 && !moveRevealed && (
            <button
              onClick={revealMove}
              className="mt-3 text-xs font-medium text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 underline underline-offset-2"
            >
              Show me the move
            </button>
          )}
        </div>
      )}

      {feedback.type === "idle" && waitingForUser && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3 mb-4 text-center">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Your turn
          </span>
        </div>
      )}

      {/* Move history */}
      {moveHistory.length > 0 && (
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
            {moveHistory.join("  ")}
          </p>
        </div>
      )}
    </div>
  );
}
