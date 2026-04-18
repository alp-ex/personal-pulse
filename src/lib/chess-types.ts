// A single move in a path with explanation (first time) and hint (on mistakes)
export interface PathMove {
  from: string; // e.g. "e2"
  to: string; // e.g. "e4"
  san: string; // Standard Algebraic Notation, e.g. "e4"
  explanation?: string; // Shown in bubble on first-time training (user moves only)
  hint?: string; // Shown on mistakes during repeat training (user moves only)
}

// A named variation path through an opening
export interface OpeningPath {
  id: string;
  name: string;
  description: string;
  moves: PathMove[]; // Full sequence (both white and black interleaved)
  playerColor: "white" | "black";
}

// A top-level opening containing multiple paths
export interface Opening {
  id: string;
  name: string;
  description: string;
  icon: string;
  paths: OpeningPath[];
}

// A single training attempt
export interface AttemptRecord {
  date: string;
  totalMoves: number;
  correctMoves: number;
  mistakes: MistakeRecord[];
  completed: boolean;
}

// Record of a mistake during training
export interface MistakeRecord {
  moveIndex: number;
  played: string; // SAN of what user played
  expected: string; // SAN of correct move
}

// User's progress on a single path
export interface PathProgress {
  pathId: string;
  openingId: string;
  firstCompleted: string | null;
  attempts: AttemptRecord[];
  mastered: boolean;
}

// Complete stored state
export interface ChessTrainingState {
  progress: Record<string, PathProgress>;
}
