import { Component, Input, Output, EventEmitter, signal, computed, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
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
      <div class="board" [class.flipped]="orientation === 'black'" [style.transform]="tiltTransform()">
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
      border: 2px solid var(--board-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow:
        var(--shadow-lg),
        0 0 30px rgba(0, 212, 255, 0.15),
        0 0 60px rgba(191, 90, 242, 0.08),
        inset 0 0 30px rgba(0, 0, 0, 0.3);
      perspective: 800px;
      position: relative;
    }
    .board-container::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple), var(--neon-pink), var(--neon-blue));
      background-size: 300% 300%;
      animation: gradient-slide 6s ease infinite;
      z-index: -1;
      opacity: 0.6;
    }
    .board {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      width: clamp(280px, 80vmin, 560px);
      height: clamp(280px, 80vmin, 560px);
      will-change: transform;
      transition: transform 0.15s ease-out;
    }
    .square {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
    }
    .square:hover {
      z-index: 1;
      box-shadow: inset 0 0 12px rgba(0, 212, 255, 0.15);
    }
    .light { background-color: var(--board-light); }
    .dark { background-color: var(--board-dark); }
    .selected.light { background-color: var(--board-selected-light); box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.3); }
    .selected.dark { background-color: var(--board-selected-dark); box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.3); }
    .last-move.light { background-color: var(--board-lastmove-light); }
    .last-move.dark { background-color: var(--board-lastmove-dark); }
    .highlighted.light { background-color: var(--board-highlight); box-shadow: inset 0 0 15px rgba(191, 90, 242, 0.3); }
    .highlighted.dark { background-color: var(--board-highlight); box-shadow: inset 0 0 15px rgba(191, 90, 242, 0.3); }
    .check.light { background-color: var(--board-check-light); box-shadow: inset 0 0 25px rgba(255, 45, 120, 0.4); }
    .check.dark { background-color: var(--board-check-dark); box-shadow: inset 0 0 25px rgba(255, 45, 120, 0.4); }

    .legal-move-dot {
      position: absolute;
      width: 28%;
      height: 28%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.5), rgba(0, 212, 255, 0.15));
      pointer-events: none;
      box-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
      animation: pulse-glow 1.5s ease-in-out infinite;
    }
    .capture-dot {
      width: 85%;
      height: 85%;
      background: transparent;
      border: 4px solid rgba(255, 45, 120, 0.4);
      border-radius: 50%;
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(255, 45, 120, 0.2), inset 0 0 10px rgba(255, 45, 120, 0.1);
    }
    .coord-rank {
      position: absolute;
      top: 2px;
      left: 3px;
      font-size: 10px;
      font-weight: 700;
      font-family: var(--font-mono);
      pointer-events: none;
      opacity: 0.7;
    }
    .light .coord-rank { color: var(--board-coord-light); }
    .dark .coord-rank { color: var(--board-coord-dark); }
    .coord-file {
      position: absolute;
      bottom: 1px;
      right: 3px;
      font-size: 10px;
      font-weight: 700;
      font-family: var(--font-mono);
      pointer-events: none;
      opacity: 0.7;
    }
    .light .coord-file { color: var(--board-coord-light); }
    .dark .coord-file { color: var(--board-coord-dark); }

    @keyframes gradient-slide {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
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
  private tiltX = signal(0);
  private tiltY = signal(0);

  tiltTransform = computed(() => {
    const x = this.tiltX();
    const y = this.tiltY();
    if (x === 0 && y === 0) return 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    return `perspective(800px) rotateX(${x}deg) rotateY(${y}deg)`;
  });

  constructor(private elRef: ElementRef) {
    this.parseFen();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const boardEl = this.elRef.nativeElement.querySelector('.board');
    if (!boardEl) return;
    const rect = boardEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxTilt = 4;

    const xPercent = (event.clientX - centerX) / (rect.width / 2);
    const yPercent = (event.clientY - centerY) / (rect.height / 2);

    this.tiltY.set(xPercent * maxTilt);
    this.tiltX.set(-yPercent * maxTilt);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.tiltX.set(0);
    this.tiltY.set(0);
  }

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
