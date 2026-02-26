import { Component, Input, computed, signal, OnChanges, SimpleChanges } from '@angular/core';
import { MoveResult, PieceColor, PieceType } from '../../models/chess.model';

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };
const PIECE_ORDER: PieceType[] = ['q', 'r', 'b', 'n', 'p'];

const PIECE_UNICODE: Record<string, string> = {
  'wp': '♙', 'wn': '♘', 'wb': '♗', 'wr': '♖', 'wq': '♕',
  'bp': '♟', 'bn': '♞', 'bb': '♝', 'br': '♜', 'bq': '♛',
};

@Component({
  selector: 'app-captured-pieces',
  standalone: true,
  template: `
    <div class="captured-row">
      <span class="captured-pieces">
        @for (piece of sortedCaptures(); track $index) {
          <span class="captured-piece">{{ piece.symbol }}</span>
        }
      </span>
      @if (materialAdvantage() !== 0) {
        <span class="material-badge">{{ materialText() }}</span>
      }
    </div>
  `,
  styles: [`
    .captured-row {
      display: flex;
      align-items: center;
      gap: 6px;
      min-height: 24px;
    }
    .captured-pieces {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
    }
    .captured-piece {
      font-size: 17px;
      line-height: 1;
      opacity: 0.6;
      filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.1));
      transition: opacity var(--transition-fast);
    }
    .captured-piece:hover {
      opacity: 1;
    }
    .material-badge {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--neon-green);
      padding: 2px 7px;
      background: rgba(57, 255, 20, 0.08);
      border: 1px solid rgba(57, 255, 20, 0.15);
      border-radius: var(--radius-pill);
      text-shadow: 0 0 6px rgba(57, 255, 20, 0.3);
    }
  `],
})
export class CapturedPiecesComponent implements OnChanges {
  @Input() moves: MoveResult[] = [];
  @Input() color: PieceColor = 'w'; // color of captured pieces to show

  private captures = signal<{ type: PieceType; color: PieceColor; symbol: string }[]>([]);
  private allCaptures = signal<{ white: number; black: number }>({ white: 0, black: 0 });

  sortedCaptures = computed(() => {
    return [...this.captures()].sort((a, b) => {
      return (PIECE_VALUES[b.type] || 0) - (PIECE_VALUES[a.type] || 0);
    });
  });

  materialAdvantage = computed(() => {
    const c = this.allCaptures();
    // Material advantage for the side whose captures we're showing
    // If we show white captures (pieces captured by black), advantage is black's captured value - white's
    return this.color === 'w' ? c.black - c.white : c.white - c.black;
  });

  materialText = computed(() => {
    const adv = this.materialAdvantage();
    return adv > 0 ? `+${adv}` : `${adv}`;
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['moves'] || changes['color']) {
      this.computeCaptures();
    }
  }

  private computeCaptures(): void {
    const captured: { type: PieceType; color: PieceColor; symbol: string }[] = [];
    let whiteValue = 0;
    let blackValue = 0;

    for (const move of this.moves) {
      if (move.captured) {
        const capturedColor = move.color === 'w' ? 'b' : 'w';
        const val = PIECE_VALUES[move.captured] || 0;

        if (capturedColor === 'w') whiteValue += val;
        else blackValue += val;

        if (capturedColor === this.color) {
          captured.push({
            type: move.captured,
            color: capturedColor,
            symbol: PIECE_UNICODE[`${capturedColor}${move.captured}`] || '',
          });
        }
      }
    }

    this.captures.set(captured);
    this.allCaptures.set({ white: whiteValue, black: blackValue });
  }
}
