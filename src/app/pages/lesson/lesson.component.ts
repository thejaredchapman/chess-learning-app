import { Component, signal, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChessboardComponent } from '../../components/chessboard/chessboard.component';
import { CelebrationComponent } from '../../components/celebration/celebration.component';
import { LessonService } from '../../services/lesson.service';
import { SoundService } from '../../services/sound.service';
import { Lesson, LessonStep } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [ChessboardComponent, CelebrationComponent],
  template: `
    <app-celebration #celebration />

    @if (lesson()) {
      <div class="lesson-page">
        <div class="lesson-header glass-panel">
          <button class="back-btn" (click)="goBack()">← Back</button>
          <div class="lesson-title-area">
            <h1>{{ lesson()!.title }}</h1>
            <div class="step-indicator">
              <span class="step-current">{{ currentStepIndex() + 1 }}</span>
              <span class="step-sep">/</span>
              <span class="step-total">{{ lesson()!.steps.length }}</span>
            </div>
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
            <!-- Step type badge -->
            <div class="step-type-badge" [class]="currentStep()!.type">
              @switch (currentStep()!.type) {
                @case ('explain') { 📖 Explanation }
                @case ('highlight') { 🔍 Observe }
                @case ('make-move') { 🎯 Your Turn }
                @case ('auto-play') { ▶ Watch }
              }
            </div>

            <div class="step-text glass-panel">
              <p>{{ currentStep()!.text }}</p>
            </div>

            @if (currentStep()!.type === 'make-move') {
              <div class="instruction-badge" [class.correct]="moveCorrect()" [class.wrong]="moveWrong()">
                @if (moveCorrect()) {
                  <span class="badge-icon">✅</span> Correct! Well done.
                } @else if (moveWrong()) {
                  <span class="badge-icon">❌</span> Not quite. Try again!
                } @else {
                  <span class="badge-icon">🎯</span> Make the correct move on the board.
                }
              </div>
            }

            <div class="progress-section">
              <div class="progress-bar-bg">
                <div
                  class="progress-bar-fill"
                  [style.width.%]="((currentStepIndex() + 1) / lesson()!.steps.length) * 100"
                ></div>
              </div>
              <span class="progress-label">{{ Math.round(((currentStepIndex() + 1) / lesson()!.steps.length) * 100) }}%</span>
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
      max-width: 1050px;
      margin: 0 auto;
      padding: 20px;
    }
    .lesson-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 20px;
      margin-bottom: 24px;
      border-color: rgba(0, 212, 255, 0.12);
    }
    .back-btn {
      padding: 8px 14px;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-sm);
      background: var(--bg-glass);
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
      transition: all var(--transition-fast);
    }
    .back-btn:hover {
      background: var(--bg-glass-hover);
      border-color: var(--neon-blue);
      color: var(--neon-blue);
    }
    .lesson-title-area {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .lesson-header h1 {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      color: var(--text-primary);
    }
    .step-indicator {
      font-family: var(--font-mono);
      font-size: 14px;
      display: flex;
      align-items: baseline;
      gap: 2px;
    }
    .step-current {
      font-size: 20px;
      font-weight: 700;
      color: var(--neon-blue);
    }
    .step-sep { color: var(--text-muted); }
    .step-total { color: var(--text-muted); }

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
      max-width: 420px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .step-type-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      width: fit-content;
    }
    .step-type-badge.explain {
      background: rgba(0, 212, 255, 0.1);
      color: var(--neon-blue);
      border: 1px solid rgba(0, 212, 255, 0.2);
    }
    .step-type-badge.highlight {
      background: rgba(191, 90, 242, 0.1);
      color: var(--neon-purple);
      border: 1px solid rgba(191, 90, 242, 0.2);
    }
    .step-type-badge.make-move {
      background: rgba(57, 255, 20, 0.1);
      color: var(--neon-green);
      border: 1px solid rgba(57, 255, 20, 0.2);
    }
    .step-type-badge.auto-play {
      background: rgba(255, 215, 0, 0.1);
      color: var(--neon-gold);
      border: 1px solid rgba(255, 215, 0, 0.2);
    }

    .step-text {
      padding: 20px;
    }
    .step-text p {
      margin: 0;
      font-size: 15px;
      line-height: 1.7;
      color: var(--text-primary);
    }
    .instruction-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 18px;
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 600;
      background: rgba(0, 212, 255, 0.1);
      color: var(--neon-blue);
      border: 1px solid rgba(0, 212, 255, 0.2);
    }
    .instruction-badge.correct {
      background: rgba(57, 255, 20, 0.1);
      color: var(--neon-green);
      border-color: rgba(57, 255, 20, 0.2);
      box-shadow: 0 0 15px rgba(57, 255, 20, 0.1);
    }
    .instruction-badge.wrong {
      background: rgba(255, 45, 120, 0.1);
      color: var(--neon-pink);
      border-color: rgba(255, 45, 120, 0.2);
      box-shadow: 0 0 15px rgba(255, 45, 120, 0.1);
    }
    .badge-icon { font-size: 18px; }

    .progress-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .progress-bar-bg {
      flex: 1;
      height: 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
      border-radius: 3px;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
    }
    .progress-label {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 600;
      min-width: 36px;
      text-align: right;
    }

    .nav-buttons {
      display: flex;
      gap: 12px;
      justify-content: space-between;
    }
    .nav-btn {
      padding: 12px 24px;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-sm);
      background: var(--bg-glass);
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      transition: all var(--transition-normal);
    }
    .nav-btn:hover:not(:disabled) {
      background: var(--bg-glass-hover);
      border-color: var(--neon-blue);
    }
    .nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .nav-btn.primary {
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
      color: #fff;
      border-color: transparent;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
    }
    .nav-btn.primary:hover:not(:disabled) {
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
      transform: translateY(-1px);
    }
    .not-found {
      text-align: center;
      padding: 60px 20px;
    }
    .not-found h2 { color: var(--text-muted); }
    @media (max-width: 768px) {
      .lesson-content { flex-direction: column; align-items: center; }
      .text-section { max-width: 100%; }
    }
  `],
})
export class LessonComponent implements OnInit {
  @ViewChild('celebration') celebration!: CelebrationComponent;
  Math = Math;

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
      this.celebration?.trigger();
      setTimeout(() => this.router.navigate(['/learn']), 2000);
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
