import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { LessonCardComponent } from '../../components/lesson-card/lesson-card.component';
import { LessonService } from '../../services/lesson.service';
import { LESSON_CATEGORIES, LessonCategory } from '../../models/lesson.model';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [LessonCardComponent],
  template: `
    <div class="learn-page">
      <div class="learn-header">
        <h1>
          <span class="header-icon">📚</span>
          LEARN CHESS
        </h1>
        <p class="subtitle">Master every aspect of the game with interactive tutorials</p>
      </div>

      <!-- Overall progress -->
      <div class="overall-progress glass-panel">
        <div class="progress-stats">
          <div class="progress-stat">
            <span class="ps-number">{{ completedCount() }}</span>
            <span class="ps-label">Completed</span>
          </div>
          <div class="progress-stat">
            <span class="ps-number">{{ totalCount() }}</span>
            <span class="ps-label">Total Lessons</span>
          </div>
          <div class="progress-stat">
            <span class="ps-number">{{ overallPercent() }}%</span>
            <span class="ps-label">Progress</span>
          </div>
        </div>
        <div class="overall-bar">
          <div class="overall-bar-fill" [style.width.%]="overallPercent()"></div>
        </div>
      </div>

      <!-- Categories -->
      @for (category of categories; track category.id) {
        <section class="category-section">
          <div class="category-header">
            <div class="cat-title-row">
              <span class="cat-icon">{{ category.icon }}</span>
              <div>
                <h2>{{ category.title }}</h2>
                <p class="cat-desc">{{ category.description }}</p>
              </div>
            </div>
            <div class="cat-progress-badge">
              {{ getCategoryProgress(category.id).completed }}/{{ getCategoryProgress(category.id).total }}
            </div>
          </div>
          <div class="lessons-grid">
            @for (lesson of getLessons(category.id); track lesson.id) {
              <app-lesson-card
                [title]="lesson.title"
                [description]="lesson.description"
                [icon]="lesson.icon"
                [progress]="getLessonProgress(lesson.id)"
                [showProgress]="true"
                (cardClicked)="openLesson(lesson.id)"
              />
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: [`
    .learn-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    .learn-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .learn-header h1 {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 4px;
      margin: 0 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: var(--text-primary);
    }
    .header-icon { font-size: 32px; }
    .subtitle {
      color: var(--text-secondary);
      margin: 0;
      font-size: 16px;
    }

    /* Overall progress */
    .overall-progress {
      padding: 20px 24px;
      margin-bottom: 32px;
      border-color: rgba(0, 212, 255, 0.15);
    }
    .progress-stats {
      display: flex;
      gap: 32px;
      justify-content: center;
      margin-bottom: 16px;
    }
    .progress-stat {
      text-align: center;
    }
    .ps-number {
      display: block;
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 800;
      color: var(--neon-blue);
      text-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    }
    .ps-label {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }
    .overall-bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 3px;
      overflow: hidden;
    }
    .overall-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple), var(--neon-pink));
      border-radius: 3px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.4);
    }

    /* Categories */
    .category-section {
      margin-bottom: 32px;
    }
    .category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .cat-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .cat-icon { font-size: 28px; }
    .category-header h2 {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 2px;
      margin: 0;
      color: var(--text-primary);
    }
    .cat-desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin: 2px 0 0;
    }
    .cat-progress-badge {
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      color: var(--neon-blue);
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      background: rgba(0, 212, 255, 0.08);
      border: 1px solid rgba(0, 212, 255, 0.2);
    }
    .lessons-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `],
})
export class LearnComponent {
  categories = LESSON_CATEGORIES;

  constructor(
    private lessonService: LessonService,
    private router: Router,
  ) {}

  totalCount = computed(() => this.lessonService.getLessons().length);

  completedCount = computed(() => {
    return this.lessonService.getLessons().filter(l => {
      const p = this.lessonService.getLessonProgress(l.id);
      return p?.completed;
    }).length;
  });

  overallPercent = computed(() => {
    const total = this.totalCount();
    return total > 0 ? Math.round((this.completedCount() / total) * 100) : 0;
  });

  getLessons(category: LessonCategory) {
    return this.lessonService.getLessonsByCategory(category);
  }

  getCategoryProgress(category: LessonCategory) {
    const lessons = this.getLessons(category);
    const completed = lessons.filter(l => {
      const p = this.lessonService.getLessonProgress(l.id);
      return p?.completed;
    }).length;
    return { completed, total: lessons.length };
  }

  getLessonProgress(lessonId: string): number {
    const lesson = this.lessonService.getLesson(lessonId);
    const progress = this.lessonService.getLessonProgress(lessonId);
    if (!lesson || !progress) return 0;
    if (progress.completed) return 1;
    return progress.currentStep / lesson.steps.length;
  }

  openLesson(lessonId: string): void {
    this.router.navigate(['/learn', lessonId]);
  }
}
