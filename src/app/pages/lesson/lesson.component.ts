import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChessboardComponent } from '../../components/chessboard/chessboard.component';
import { LessonService } from '../../services/lesson.service';
import { SoundService } from '../../services/sound.service';
import { Lesson, LessonStep } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [ChessboardComponent],
  template: `
    @if (lesson()) {
      <div class="lesson-page">
        <div class="lesson-header">
          <button class="back-btn" (click)="goBack()">← Back</button>
          <h1>{{ lesson()!.title }}</h1>
          <div class="step-indicator">
            Step {{ currentStepIndex() + 1 }} of {{ lesson()!.steps.length }}
          </div>
        </div>

        <div class="lesson-content">
          <div class="board-section">
            <app-chessboard
              [position]="currentStep()!.fen"
              [interactive]="currentStep()!.type === 'make-move'"
              [orientation]="currentStep()!.orientation || 'white'"
              [highlightSquares]="currentStep()!.highlightSquares || []"
              (moveMade)="onMoveMade($event)"
            />
          </div>

          <div class="text-section">
            <div class="step-text">
              <p>{{ currentStep()!.text }}</p>
            </div>

            @if (currentStep()!.type === 'make-move') {
              <div class="instruction-badge" [class.correct]="moveCorrect()" [class.wrong]="moveWrong()">
                @if (moveCorrect()) {
                  Correct! Well done.
                } @else if (moveWrong()) {
                  Not quite. Try again!
                } @else {
                  Your turn - make the correct move on the board.
                }
              </div>
            }

            <div class="progress-bar-container">
              <div class="progress-bar-bg">
                <div
                  class="progress-bar-fill"
                  [style.width.%]="((currentStepIndex() + 1) / lesson()!.steps.length) * 100"
                ></div>
              </div>
            </div>

            <div class="nav-buttons">
              <button
                class="nav-btn"
                (click)="prevStep()"
                [disabled]="currentStepIndex() === 0"
              >
                ← Previous
              </button>
              <button
                class="nav-btn primary"
                (click)="nextStep()"
                [disabled]="!canAdvance()"
              >
                @if (isLastStep()) {
                  Complete Lesson ✓
                } @else {
                  Next →
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="not-found">
        <h2>Lesson not found</h2>
        <button class="nav-btn" (click)="goBack()">← Back to lessons</button>
      </div>
    }
  `,
  styles: [`
    .lesson-page {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    .lesson-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .back-btn {
      padding: 6px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      font-size: 13px;
      color: #666;
    }
    .back-btn:hover { background: #f5f5f5; }
    .lesson-header h1 {
      flex: 1;
      font-size: 24px;
      margin: 0;
      color: #1a1a1a;
    }
    .step-indicator {
      font-size: 14px;
      color: #999;
    }
    .lesson-content {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .board-section { flex-shrink: 0; }
    .text-section {
      flex: 1;
      min-width: 280px;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .step-text {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 20px;
    }
    .step-text p {
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
      color: #333;
    }
    .instruction-badge {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
      background: #e3f2fd;
      color: #1976d2;
    }
    .instruction-badge.correct { background: #e8f5e9; color: #2e7d32; }
    .instruction-badge.wrong { background: #fce4ec; color: #c62828; }
    .progress-bar-container { padding: 0 4px; }
    .progress-bar-bg {
      height: 4px;
      background: #e0e0e0;
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: #1976d2;
      border-radius: 2px;
      transition: width 0.3s;
    }
    .nav-buttons {
      display: flex;
      gap: 12px;
      justify-content: space-between;
    }
    .nav-btn {
      padding: 10px 20px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      transition: all 0.15s;
    }
    .nav-btn:hover:not(:disabled) { background: #f5f5f5; }
    .nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .nav-btn.primary {
      background: #1976d2;
      color: #fff;
      border-color: #1976d2;
    }
    .nav-btn.primary:hover:not(:disabled) { background: #1565c0; }
    .not-found {
      text-align: center;
      padding: 60px 20px;
    }
    .not-found h2 { color: #999; }
    @media (max-width: 768px) {
      .lesson-content { flex-direction: column; align-items: center; }
      .text-section { max-width: 100%; }
    }
  `],
})
export class LessonComponent implements OnInit {
  lesson = signal<Lesson | null>(null);
  currentStepIndex = signal(0);
  moveCorrect = signal(false);
  moveWrong = signal(false);

  currentStep = signal<LessonStep | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private sound: SoundService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const lesson = this.lessonService.getLesson(id);
      if (lesson) {
        this.lesson.set(lesson);
        const progress = this.lessonService.getLessonProgress(id);
        const startStep = progress && !progress.completed ? progress.currentStep : 0;
        this.currentStepIndex.set(startStep);
        this.currentStep.set(lesson.steps[startStep]);
      }
    }
  }

  onMoveMade(move: { from: string; to: string }): void {
    const step = this.currentStep();
    if (step?.type !== 'make-move' || !step.correctMove) return;

    if (move.from === step.correctMove.from && move.to === step.correctMove.to) {
      this.moveCorrect.set(true);
      this.moveWrong.set(false);
      this.sound.playSuccess();
    } else {
      this.moveCorrect.set(false);
      this.moveWrong.set(true);
      this.sound.playError();
    }
  }

  canAdvance(): boolean {
    const step = this.currentStep();
    if (!step) return false;
    if (step.type === 'make-move') return this.moveCorrect();
    return true;
  }

  isLastStep(): boolean {
    const l = this.lesson();
    return l ? this.currentStepIndex() >= l.steps.length - 1 : false;
  }

  nextStep(): void {
    const l = this.lesson();
    if (!l) return;

    if (this.isLastStep()) {
      this.lessonService.updateLessonProgress(l.id, l.steps.length, true);
      this.router.navigate(['/learn']);
      return;
    }

    const next = this.currentStepIndex() + 1;
    this.currentStepIndex.set(next);
    this.currentStep.set(l.steps[next]);
    this.moveCorrect.set(false);
    this.moveWrong.set(false);
    this.lessonService.updateLessonProgress(l.id, next, false);
  }

  prevStep(): void {
    const l = this.lesson();
    if (!l || this.currentStepIndex() <= 0) return;

    const prev = this.currentStepIndex() - 1;
    this.currentStepIndex.set(prev);
    this.currentStep.set(l.steps[prev]);
    this.moveCorrect.set(false);
    this.moveWrong.set(false);
  }

  goBack(): void {
    this.router.navigate(['/learn']);
  }
}
