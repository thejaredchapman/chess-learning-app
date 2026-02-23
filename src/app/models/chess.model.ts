export type PieceColor = 'w' | 'b';
export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export type Square = string;

export interface MoveResult {
  from: string;
  to: string;
  piece: PieceType;
  color: PieceColor;
  captured?: PieceType;
  promotion?: PieceType;
  flags: string;
  san: string;
}

export interface GameState {
  fen: string;
  turn: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
  moveHistory: MoveResult[];
  lastMove: { from: string; to: string } | null;
}

export interface DifficultyLevel {
  name: string;
  depth: number;
  description: string;
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  { name: 'Beginner', depth: 2, description: 'Perfect for learning' },
  { name: 'Intermediate', depth: 6, description: 'A fair challenge' },
  { name: 'Advanced', depth: 12, description: 'Strong play' },
  { name: 'Master', depth: 18, description: 'Near-perfect chess' },
];

export type GameMode = 'human' | 'computer';
export type PlayerColor = 'white' | 'black' | 'random';

export interface GameSetup {
  mode: GameMode;
  playerColor: PlayerColor;
  difficulty: DifficultyLevel;
}
