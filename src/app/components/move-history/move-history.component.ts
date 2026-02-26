import { Component, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { MoveResult } from '../../models/chess.model';
import { MoveQuality, MOVE_QUALITY_CONFIG } from '../../models/move-quality.model';

@Component({
  selector: 'app-move-history',
  standalone: true,
  template: `
    <div class="move-history glass-panel" #scrollContainer>
      <h3>Moves</h3>
      <div class="moves-list">
        @for (pair of movePairs(); track $index) {
          <div class="move-row">
            <span class="move-number">{{ $index + 1 }}.</span>
            <span class="move white-move">
              @if (getQuality($index * 2)) {
                <span class="quality-dot" [style.background]="getQualityColor($index * 2)"></span>
              }
              {{ pair.white }}
            </span>
            @if (pair.black) {
              <span class="move black-move">
                @if (getQuality($index * 2 + 1)) {
                  <span class="quality-dot" [style.background]="getQualityColor($index * 2 + 1)"></span>
                }
                {{ pair.black }}
              </span>
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
      padding: 16px;
      max-height: 400px;
      overflow-y: auto;
      border-color: rgba(0, 212, 255, 0.08);
    }
    .move-history::-webkit-scrollbar { width: 4px; }
    .move-history::-webkit-scrollbar-track { background: transparent; }
    .move-history::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--neon-blue), var(--neon-purple));
      border-radius: 2px;
    }
    h3 {
      margin: 0 0 12px;
      font-size: 11px;
      font-family: var(--font-display);
      color: var(--neon-blue);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
    }
    .move-row {
      display: flex;
      gap: 8px;
      padding: 5px 0;
      font-size: 13px;
      font-family: var(--font-mono);
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }
    .move-row:last-child { border-bottom: none; }
    .move-number {
      color: var(--text-muted);
      min-width: 30px;
      font-weight: 600;
    }
    .move {
      min-width: 55px;
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      cursor: default;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all var(--transition-fast);
      font-weight: 500;
    }
    .move:hover {
      background: rgba(0, 212, 255, 0.08);
      color: var(--neon-blue);
    }
    .quality-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 0 6px currentColor;
    }
    .empty-message {
      color: var(--text-muted);
      font-size: 13px;
      text-align: center;
      padding: 24px 0;
      font-style: italic;
    }
  `],
})
export class MoveHistoryComponent implements AfterViewChecked {
  @Input() moves: MoveResult[] = [];
  @Input() moveQualities: (MoveQuality | null)[] = [];
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

  getQuality(moveIndex: number): MoveQuality | null {
    return this.moveQualities[moveIndex] || null;
  }

  getQualityColor(moveIndex: number): string {
    const q = this.moveQualities[moveIndex];
    if (!q) return 'transparent';
    return MOVE_QUALITY_CONFIG[q].color;
  }

  ngAfterViewChecked(): void {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
