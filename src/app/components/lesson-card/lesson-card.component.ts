import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-card',
  standalone: true,
  template: `
    <div class="lesson-card" (click)="cardClicked.emit()" [class.completed]="progress >= 1">
      <div class="card-icon">{{ icon }}</div>
      <div class="card-content">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        @if (showProgress) {
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="progress * 100"></div>
          </div>
          <span class="progress-text">{{ Math.round(progress * 100) }}% complete</span>
        }
      </div>
      <div class="card-arrow">→</div>
    </div>
  `,
  styles: [`
    .lesson-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .lesson-card:hover {
      border-color: #1976d2;
      box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
      transform: translateY(-1px);
    }
    .lesson-card.completed {
      border-color: #4caf50;
      background: #f9fff9;
    }
    .card-icon {
      font-size: 32px;
      min-width: 48px;
      text-align: center;
    }
    .card-content {
      flex: 1;
    }
    .card-content h3 {
      margin: 0 0 4px;
      font-size: 16px;
      color: #333;
    }
    .card-content p {
      margin: 0;
      font-size: 13px;
      color: #777;
    }
    .progress-bar {
      height: 4px;
      background: #e0e0e0;
      border-radius: 2px;
      margin-top: 8px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: #1976d2;
      border-radius: 2px;
      transition: width 0.3s;
    }
    .completed .progress-fill { background: #4caf50; }
    .progress-text {
      font-size: 11px;
      color: #999;
      margin-top: 2px;
      display: block;
    }
    .card-arrow {
      color: #ccc;
      font-size: 20px;
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
