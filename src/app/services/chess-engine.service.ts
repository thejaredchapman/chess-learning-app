import { Injectable, signal, computed } from '@angular/core';
import { Chess } from 'chess.js';
import { GameState, MoveResult, ChessPiece, PieceColor } from '../models/chess.model';

@Injectable({ providedIn: 'root' })
export class ChessEngineService {
  private chess = new Chess();
  private _gameState = signal<GameState>(this.buildState());

  readonly gameState = this._gameState.asReadonly();
  readonly fen = computed(() => this._gameState().fen);
  readonly turn = computed(() => this._gameState().turn);
  readonly isCheck = computed(() => this._gameState().isCheck);
  readonly isCheckmate = computed(() => this._gameState().isCheckmate);
  readonly isStalemate = computed(() => this._gameState().isStalemate);
  readonly isDraw = computed(() => this._gameState().isDraw);
  readonly isGameOver = computed(() => this._gameState().isGameOver);
  readonly moveHistory = computed(() => this._gameState().moveHistory);
  readonly lastMove = computed(() => this._gameState().lastMove);

  newGame(fen?: string): void {
    if (fen) {
      this.chess = new Chess(fen);
    } else {
      this.chess = new Chess();
    }
    this._gameState.set(this.buildState());
  }

  loadFen(fen: string): boolean {
    try {
      this.chess.load(fen);
      this._gameState.set(this.buildState());
      return true;
    } catch {
      return false;
    }
  }

  makeMove(from: string, to: string, promotion?: string): MoveResult | null {
    try {
      const move = this.chess.move({ from, to, promotion: promotion || 'q' });
      if (move) {
        const result: MoveResult = {
          from: move.from,
          to: move.to,
          piece: move.piece as any,
          color: move.color as any,
          captured: move.captured as any,
          promotion: move.promotion as any,
          flags: move.flags,
          san: move.san,
        };
        this._gameState.set(this.buildState(result));
        return result;
      }
      return null;
    } catch {
      return null;
    }
  }

  getLegalMoves(square: string): string[] {
    const moves = this.chess.moves({ square: square as any, verbose: true });
    return moves.map((m: any) => m.to);
  }

  getAllLegalMoves(): { from: string; to: string; san: string }[] {
    return this.chess.moves({ verbose: true }).map((m: any) => ({
      from: m.from,
      to: m.to,
      san: m.san,
    }));
  }

  getPiece(square: string): ChessPiece | null {
    const piece = this.chess.get(square as any);
    if (!piece) return null;
    return { type: piece.type as any, color: piece.color as any };
  }

  getBoard(): (ChessPiece | null)[][] {
    return this.chess.board().map((row: any[]) =>
      row.map((cell: any) => (cell ? { type: cell.type, color: cell.color } : null))
    );
  }

  undo(): MoveResult | null {
    const move = this.chess.undo();
    if (move) {
      this._gameState.set(this.buildState());
      return {
        from: move.from,
        to: move.to,
        piece: move.piece as any,
        color: move.color as any,
        captured: move.captured as any,
        promotion: move.promotion as any,
        flags: move.flags,
        san: move.san,
      };
    }
    return null;
  }

  getFen(): string {
    return this.chess.fen();
  }

  getTurn(): PieceColor {
    return this.chess.turn() as PieceColor;
  }

  getHistory(): string[] {
    return this.chess.history();
  }

  isSquareAttacked(square: string, color: PieceColor): boolean {
    return this.chess.isAttacked(square as any, color);
  }

  private buildState(lastMoveResult?: MoveResult): GameState {
    const history = this.chess.history({ verbose: true });
    const lastHistoryMove = history.length > 0 ? history[history.length - 1] : null;

    return {
      fen: this.chess.fen(),
      turn: this.chess.turn() as PieceColor,
      isCheck: this.chess.isCheck(),
      isCheckmate: this.chess.isCheckmate(),
      isStalemate: this.chess.isStalemate(),
      isDraw: this.chess.isDraw(),
      isGameOver: this.chess.isGameOver(),
      moveHistory: history.map((m: any) => ({
        from: m.from,
        to: m.to,
        piece: m.piece,
        color: m.color,
        captured: m.captured,
        promotion: m.promotion,
        flags: m.flags,
        san: m.san,
      })),
      lastMove: lastHistoryMove ? { from: lastHistoryMove.from, to: lastHistoryMove.to } : null,
    };
  }
}
