import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-card',
  standalone: true,
  template: `
    <div class="lesson-card glass-panel" (click)="cardClicked.emit()" [class.completed]="progress >= 1">
      <div class="card-icon">{{ icon }}</div>
      <div class="card-content">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        @if (showProgress) {
          <div class="progress-row">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="progress * 100"></div>
            </div>
            <span class="progress-text">{{ Math.round(progress * 100) }}%</span>
          </div>
        }
      </div>
      @if (progress >= 1) {
        <div class="card-badge">✓</div>
      } @else {
        <div class="card-arrow">→</div>
      }
    </div>
  `,
  styles: [`
    .lesson-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 20px;
      cursor: pointer;
      transition: all var(--transition-normal);
      border-color: rgba(255, 255, 255, 0.06);
      position: relative;
      overflow: hidden;
    }
    .lesson-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.03), transparent 60%);
      opacity: 0;
      transition: opacity var(--transition-fast);
    }
    .lesson-card:hover::before { opacity: 1; }
    .lesson-card:hover {
      border-color: var(--neon-blue);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.1), 0 4px 20px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }
    .lesson-card.completed {
      border-color: rgba(57, 255, 20, 0.3);
    }
    .lesson-card.completed::before {
      background: linear-gradient(135deg, rgba(57, 255, 20, 0.04), transparent 60%);
      opacity: 1;
    }
    .lesson-card.completed:hover {
      box-shadow: 0 0 20px rgba(57, 255, 20, 0.1), 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    .card-icon {
      font-size: 30px;
      min-width: 44px;
      text-align: center;
      filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.2));
    }
    .card-content {
      flex: 1;
      min-width: 0;
    }
    .card-content h3 {
      margin: 0 0 4px;
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .card-content p {
      margin: 0;
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.4;
    }
    .progress-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
      border-radius: 2px;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 6px rgba(0, 212, 255, 0.3);
    }
    .completed .progress-fill {
      background: linear-gradient(90deg, var(--neon-green), #6fffe9);
      box-shadow: 0 0 6px rgba(57, 255, 20, 0.3);
    }
    .progress-text {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
      min-width: 32px;
      text-align: right;
    }
    .card-arrow {
      color: var(--text-muted);
      font-size: 18px;
      transition: all var(--transition-fast);
      opacity: 0.5;
    }
    .lesson-card:hover .card-arrow {
      color: var(--neon-blue);
      opacity: 1;
      transform: translateX(3px);
    }
    .card-badge {
      font-size: 16px;
      font-weight: 700;
      color: var(--neon-green);
      text-shadow: 0 0 10px rgba(57, 255, 20, 0.4);
      min-width: 24px;
      text-align: center;
    }
  `],
})
export class LessonCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() progress = 0;
  @Input() showProgress = false;

  @Output() cardClicked = new EventEmitter<void>();

  Math = Math;
}
