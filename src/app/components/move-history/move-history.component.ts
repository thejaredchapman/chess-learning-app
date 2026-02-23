import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { MoveResult } from '../../models/chess.model';

@Component({
  selector: 'app-move-history',
  standalone: true,
  template: `
    <div class="move-history" #scrollContainer>
      <h3>Moves</h3>
      <div class="moves-list">
        @for (pair of movePairs(); track $index) {
          <div class="move-row">
            <span class="move-number">{{ $index + 1 }}.</span>
            <span class="move white-move">{{ pair.white }}</span>
            @if (pair.black) {
              <span class="move black-move">{{ pair.black }}</span>
            }
          </div>
        }
        @if (moves.length === 0) {
          <p class="empty-message">No moves yet</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .move-history {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      max-height: 400px;
      overflow-y: auto;
    }
    h3 {
      margin: 0 0 12px;
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .move-row {
      display: flex;
      gap: 8px;
      padding: 4px 0;
      font-size: 14px;
      font-family: monospace;
    }
    .move-number {
      color: #999;
      min-width: 30px;
    }
    .move {
      min-width: 50px;
      padding: 2px 6px;
      border-radius: 3px;
      cursor: default;
    }
    .move:hover { background: #f0f0f0; }
    .empty-message {
      color: #999;
      font-size: 13px;
      text-align: center;
      padding: 20px 0;
    }
  `],
})
export class MoveHistoryComponent implements AfterViewChecked {
  @Input() moves: MoveResult[] = [];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  movePairs(): { white: string; black?: string }[] {
    const pairs: { white: string; black?: string }[] = [];
    for (let i = 0; i < this.moves.length; i += 2) {
      pairs.push({
        white: this.moves[i].san,
        black: this.moves[i + 1]?.san,
      });
    }
    return pairs;
  }

  ngAfterViewChecked(): void {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
