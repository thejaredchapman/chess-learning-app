import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-evaluation-bar',
  standalone: true,
  template: `
    <div class="eval-bar">
      <div class="eval-fill" [style.height.%]="whitePercent()">
        <span class="eval-text" [class.dark-text]="whitePercent() > 60">{{ evalText() }}</span>
      </div>
    </div>
  `,
  styles: [`
    .eval-bar {
      width: 32px;
      height: 100%;
      background: linear-gradient(180deg, rgba(30, 30, 60, 0.9), rgba(10, 10, 25, 0.95));
      border-radius: var(--radius-md);
      border: 1px solid var(--border-glass);
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column-reverse;
      box-shadow:
        0 0 15px rgba(0, 0, 0, 0.3),
        inset 0 0 20px rgba(0, 0, 0, 0.2);
    }
    .eval-fill {
      background: linear-gradient(180deg, #f0f0ff, #d0d0e8);
      transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      min-height: 20px;
      box-shadow: 0 -4px 15px rgba(255, 255, 255, 0.15);
    }
    .eval-text {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 700;
      color: rgba(200, 200, 240, 0.9);
      padding: 4px 0;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      position: sticky;
      top: 4px;
      text-shadow: 0 0 6px rgba(0, 212, 255, 0.4);
    }
    .dark-text {
      color: #1a1a2e;
      text-shadow: none;
    }
  `],
})
export class EvaluationBarComponent {
  @Input() evaluation: number = 0; // centipawns from white's perspective
  @Input() isMate: boolean = false;
  @Input() mateIn: number = 0;

  whitePercent(): number {
    if (this.isMate) {
      return this.mateIn > 0 ? 95 : 5;
    }
    // Sigmoid mapping: small advantages barely move, large ones fill dramatically
    const cp = this.evaluation / 100;
    const sigmoid = 50 + 50 * (2 / (1 + Math.exp(-0.5 * cp)) - 1);
    return Math.max(3, Math.min(97, sigmoid));
  }

  evalText(): string {
    if (this.isMate) {
      return this.mateIn > 0 ? `M${this.mateIn}` : `M${Math.abs(this.mateIn)}`;
    }
    const pawns = this.evaluation / 100;
    const sign = pawns >= 0 ? '+' : '';
    return `${sign}${pawns.toFixed(1)}`;
  }
}
