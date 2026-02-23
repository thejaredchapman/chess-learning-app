export type LessonCategory = 'pieces' | 'rules' | 'openings' | 'strategy' | 'endgames';

export type LessonStepType = 'explain' | 'highlight' | 'make-move' | 'auto-play';

export interface LessonStep {
  type: LessonStepType;
  fen: string;
  text: string;
  highlightSquares?: string[];
  arrowFrom?: string;
  arrowTo?: string;
  correctMove?: { from: string; to: string };
  autoPlayMoves?: { from: string; to: string }[];
  orientation?: 'white' | 'black';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  icon: string;
  steps: LessonStep[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  currentStep: number;
  completedAt?: number;
}

export interface LessonCategoryInfo {
  id: LessonCategory;
  title: string;
  description: string;
  icon: string;
}

export const LESSON_CATEGORIES: LessonCategoryInfo[] = [
  { id: 'pieces', title: 'Piece Basics', description: 'Learn how each piece moves', icon: '♞' },
  { id: 'rules', title: 'Special Rules', description: 'Castling, en passant, and more', icon: '♔' },
  { id: 'openings', title: 'Opening Principles', description: 'Start your games right', icon: '📖' },
  { id: 'strategy', title: 'Strategy', description: 'Middlegame and endgame concepts', icon: '🧠' },
  { id: 'endgames', title: 'Endgames', description: 'Win the final phase', icon: '🏁' },
];

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  fen: string;
  solutionMoves: { from: string; to: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
  theme: string;
  orientation: 'white' | 'black';
}

export interface PuzzleProgress {
  puzzleId: string;
  solved: boolean;
  attempts: number;
  solvedAt?: number;
}
