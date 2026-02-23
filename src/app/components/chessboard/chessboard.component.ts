import { Component, Input, Output, EventEmitter, signal, computed, OnChanges, SimpleChanges } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { ChessPiece } from '../../models/chess.model';
import { Chess } from 'chess.js';

interface SquareData {
  file: number;
  rank: number;
  name: string;
  piece: ChessPiece | null;
  isLight: boolean;
  isSelected: boolean;
  isLegalMove: boolean;
  isLastMoveFrom: boolean;
  isLastMoveTo: boolean;
  isHighlighted: boolean;
  isCheck: boolean;
}

@Component({
  selector: 'app-chessboard',
  standalone: true,
  imports: [PieceComponent],
  template: `
    <div class="board-container">
      <div class="board" [class.flipped]="orientation === 'black'">
        @for (square of squares(); track square.name) {
          <div
            class="square"
            [class.light]="square.isLight"
            [class.dark]="!square.isLight"
            [class.selected]="square.isSelected"
            [class.last-move]="square.isLastMoveFrom || square.isLastMoveTo"
            [class.highlighted]="square.isHighlighted"
            [class.check]="square.isCheck"
            (click)="onSquareClick(square)"
          >
            @if (square.piece) {
              <app-piece [type]="square.piece.type" [color]="square.piece.color" />
            }
            @if (square.isLegalMove) {
              <div class="legal-move-dot" [class.capture-dot]="square.piece !== null"></div>
            }
            @if (showCoordinates(square)) {
              <span class="coord-rank">{{ getRankLabel(square) }}</span>
            }
            @if (showFileCoord(square)) {
              <span class="coord-file">{{ getFileLabel(square) }}</span>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .board-container {
      display: inline-block;
      border: 2px solid #333;
      border-radius: 4px;
      overflow: hidden;
    }
    .board {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      width: clamp(280px, 80vmin, 560px);
      height: clamp(280px, 80vmin, 560px);
    }
    .square {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      transition: background-color 0.1s;
    }
    .light { background-color: #edeed1; }
    .dark { background-color: #779952; }
    .selected.light { background-color: #f7f769; }
    .selected.dark { background-color: #bbcc44; }
    .last-move.light { background-color: #f5f682; }
    .last-move.dark { background-color: #b9cc3b; }
    .highlighted.light { background-color: #ff6b6b55; }
    .highlighted.dark { background-color: #ff6b6b55; }
    .check.light { background-color: #ff4444; }
    .check.dark { background-color: #cc0000; }

    .legal-move-dot {
      position: absolute;
      width: 25%;
      height: 25%;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      pointer-events: none;
    }
    .capture-dot {
      width: 85%;
      height: 85%;
      background: transparent;
      border: 5px solid rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      box-sizing: border-box;
    }
    .coord-rank {
      position: absolute;
      top: 2px;
      left: 3px;
      font-size: 10px;
      font-weight: bold;
      pointer-events: none;
    }
    .light .coord-rank { color: #779952; }
    .dark .coord-rank { color: #edeed1; }
    .coord-file {
      position: absolute;
      bottom: 1px;
      right: 3px;
      font-size: 10px;
      font-weight: bold;
      pointer-events: none;
    }
    .light .coord-file { color: #779952; }
    .dark .coord-file { color: #edeed1; }
  `],
})
export class ChessboardComponent implements OnChanges {
  @Input() position: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  @Input() interactive: boolean = true;
  @Input() orientation: 'white' | 'black' = 'white';
  @Input() highlightSquares: string[] = [];
  @Input() legalMoveSquares: string[] = [];
  @Input() lastMove: { from: string; to: string } | null = null;
  @Input() checkSquare: string | null = null;

  @Output() moveMade = new EventEmitter<{ from: string; to: string }>();
  @Output() squareClicked = new EventEmitter<string>();

  private selectedSquare = signal<string | null>(null);
  private currentLegalMoves = signal<string[]>([]);
  private boardData = signal<(ChessPiece | null)[][]>([]);

  squares = computed(() => {
    const board = this.boardData();
    const selected = this.selectedSquare();
    const legalMoves = this.currentLegalMoves();
    const result: SquareData[] = [];

    for (let rank = 7; rank >= 0; rank--) {
      for (let file = 0; file < 8; file++) {
        const displayRank = this.orientation === 'white' ? 7 - rank : rank;
        const displayFile = this.orientation === 'white' ? file : 7 - file;
        const actualRank = 7 - displayRank;
        const actualFile = displayFile;
        const name = String.fromCharCode(97 + actualFile) + (actualRank + 1);
        const isLight = (actualFile + actualRank) % 2 === 1;
        const piece = board[7 - actualRank]?.[actualFile] || null;

        result.push({
          file: actualFile,
          rank: actualRank,
          name,
          piece,
          isLight,
          isSelected: name === selected,
          isLegalMove: legalMoves.includes(name),
          isLastMoveFrom: this.lastMove?.from === name,
          isLastMoveTo: this.lastMove?.to === name,
          isHighlighted: this.highlightSquares.includes(name),
          isCheck: this.checkSquare === name,
        });
      }
    }
    return result;
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position'] || changes['highlightSquares'] || changes['lastMove'] || changes['checkSquare']) {
      this.parseFen();
    }
    if (changes['position']) {
      this.selectedSquare.set(null);
      this.currentLegalMoves.set([]);
    }
  }

  constructor() {
    this.parseFen();
  }

  showCoordinates(square: SquareData): boolean {
    return this.orientation === 'white' ? square.file === 0 : square.file === 7;
  }

  showFileCoord(square: SquareData): boolean {
    return this.orientation === 'white' ? square.rank === 0 : square.rank === 7;
  }

  getRankLabel(square: SquareData): string {
    return String(square.rank + 1);
  }

  getFileLabel(square: SquareData): string {
    return String.fromCharCode(97 + square.file);
  }

  onSquareClick(square: SquareData): void {
    if (!this.interactive) return;

    this.squareClicked.emit(square.name);
    const selected = this.selectedSquare();

    if (selected && this.currentLegalMoves().includes(square.name)) {
      this.moveMade.emit({ from: selected, to: square.name });
      this.selectedSquare.set(null);
      this.currentLegalMoves.set([]);
      return;
    }

    if (square.piece) {
      const chess = new Chess(this.position);
      const turn = chess.turn();
      if (square.piece.color === turn) {
        this.selectedSquare.set(square.name);
        const moves = chess.moves({ square: square.name as any, verbose: true });
        this.currentLegalMoves.set(moves.map((m: any) => m.to));
        return;
      }
    }

    this.selectedSquare.set(null);
    this.currentLegalMoves.set([]);
  }

  private parseFen(): void {
    try {
      const chess = new Chess(this.position);
      this.boardData.set(
        chess.board().map((row: any[]) =>
          row.map((cell: any) => (cell ? { type: cell.type, color: cell.color } : null))
        )
      );
    } catch {
      this.boardData.set(Array(8).fill(null).map(() => Array(8).fill(null)));
    }
  }
}
