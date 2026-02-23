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
      font-size: clamp(28px, 5vw, 48px);
      line-height: 1;
      user-select: none;
      pointer-events: none;
      filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.3));
    }
    .white-piece { color: #fff; -webkit-text-stroke: 0.5px #333; }
    .black-piece { color: #333; }
  `],
})
export class PieceComponent {
  @Input({ required: true }) type!: PieceType;
  @Input({ required: true }) color!: PieceColor;

  getUnicode(): string {
    return PIECE_UNICODE[`${this.color}${this.type}`] || '';
  }
}
