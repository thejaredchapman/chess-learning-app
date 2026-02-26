import { Component, Input } from '@angular/core';
import { PieceType, PieceColor } from '../../models/chess.model';

const PIECE_UNICODE: Record<string, string> = {
  'wk': '♔', 'wq': '♕', 'wr': '♖', 'wb': '♗', 'wn': '♘', 'wp': '♙',
  'bk': '♚', 'bq': '♛', 'br': '♜', 'bb': '♝', 'bn': '♞', 'bp': '♟',
};

@Component({
  selector: 'app-piece',
  standalone: true,
  template: `
    <span class="piece" [class.white-piece]="color === 'w'" [class.black-piece]="color === 'b'">
      {{ getUnicode() }}
    </span>
  `,
  styles: [`
    .piece {
      font-size: clamp(30px, 5.5vw, 52px);
      line-height: 1;
      user-select: none;
      pointer-events: none;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out;
    }
    .white-piece {
      color: #fff;
      -webkit-text-stroke: 0.5px rgba(0,0,0,0.4);
      filter: drop-shadow(0 0 6px rgba(255,255,255,0.3)) drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }
    .black-piece {
      color: #1a1a2e;
      filter: drop-shadow(0 0 4px rgba(0,0,0,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }
  `],
})
export class PieceComponent {
  @Input({ required: true }) type!: PieceType;
  @Input({ required: true }) color!: PieceColor;

  getUnicode(): string {
    return PIECE_UNICODE[`${this.color}${this.type}`] || '';
  }
}
