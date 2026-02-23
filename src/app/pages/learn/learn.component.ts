import { Component } from '@angular/core';
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
      <h1>Learn Chess</h1>
      <p class="subtitle">Choose a topic to start learning</p>

      @for (category of categories; track category.id) {
        <section class="category-section">
          <h2>{{ category.title }}</h2>
          <p class="cat-desc">{{ category.description }}</p>
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
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      font-size: 32px;
      margin: 0 0 4px;
      color: #1a1a1a;
    }
    .subtitle {
      color: #777;
      margin: 0 0 32px;
      font-size: 16px;
    }
    .category-section {
      margin-bottom: 32px;
    }
    .category-section h2 {
      font-size: 20px;
      margin: 0 0 4px;
      color: #333;
    }
    .cat-desc {
      font-size: 14px;
      color: #777;
      margin: 0 0 12px;
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

  getLessons(category: LessonCategory) {
    return this.lessonService.getLessonsByCategory(category);
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
