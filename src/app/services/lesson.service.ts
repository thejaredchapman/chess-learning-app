import { Injectable, signal, computed } from '@angular/core';
import { Lesson, LessonProgress, LessonCategory, Puzzle, PuzzleProgress } from '../models/lesson.model';
import { PIECE_LESSONS } from '../data/piece-lessons';
import { RULES_LESSONS } from '../data/rules-lessons';
import { OPENING_LESSONS } from '../data/opening-lessons';
import { STRATEGY_LESSONS } from '../data/strategy-lessons';
import { PUZZLES_DATA } from '../data/puzzles-data';

const LESSON_PROGRESS_KEY = 'chess-app-lesson-progress';
const PUZZLE_PROGRESS_KEY = 'chess-app-puzzle-progress';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private allLessons: Lesson[] = [
    ...PIECE_LESSONS,
    ...RULES_LESSONS,
    ...OPENING_LESSONS,
    ...STRATEGY_LESSONS,
  ];

  private allPuzzles: Puzzle[] = PUZZLES_DATA;

  private _lessonProgress = signal<Map<string, LessonProgress>>(this.loadLessonProgress());
  private _puzzleProgress = signal<Map<string, PuzzleProgress>>(this.loadPuzzleProgress());

  readonly lessonProgress = this._lessonProgress.asReadonly();
  readonly puzzleProgress = this._puzzleProgress.asReadonly();

  getLessons(): Lesson[] {
    return this.allLessons;
  }

  getLessonsByCategory(category: LessonCategory): Lesson[] {
    return this.allLessons.filter((l) => l.category === category);
  }

  getLesson(id: string): Lesson | undefined {
    return this.allLessons.find((l) => l.id === id);
  }

  getLessonProgress(lessonId: string): LessonProgress | undefined {
    return this._lessonProgress().get(lessonId);
  }

  getCategoryProgress(category: LessonCategory): { completed: number; total: number } {
    const lessons = this.getLessonsByCategory(category);
    const completed = lessons.filter((l) => this._lessonProgress().get(l.id)?.completed).length;
    return { completed, total: lessons.length };
  }

  updateLessonProgress(lessonId: string, step: number, completed: boolean): void {
    const progress = new Map(this._lessonProgress());
    progress.set(lessonId, {
      lessonId,
      currentStep: step,
      completed,
      completedAt: completed ? Date.now() : undefined,
    });
    this._lessonProgress.set(progress);
    this.saveLessonProgress(progress);
  }

  getPuzzles(): Puzzle[] {
    return this.allPuzzles;
  }

  getPuzzle(id: string): Puzzle | undefined {
    return this.allPuzzles.find((p) => p.id === id);
  }

  getPuzzleProgress(puzzleId: string): PuzzleProgress | undefined {
    return this._puzzleProgress().get(puzzleId);
  }

  getPuzzleStats(): { solved: number; total: number } {
    const solved = Array.from(this._puzzleProgress().values()).filter((p) => p.solved).length;
    return { solved, total: this.allPuzzles.length };
  }

  updatePuzzleProgress(puzzleId: string, solved: boolean): void {
    const progress = new Map(this._puzzleProgress());
    const existing = progress.get(puzzleId);
    progress.set(puzzleId, {
      puzzleId,
      solved: solved || existing?.solved || false,
      attempts: (existing?.attempts || 0) + 1,
      solvedAt: solved ? Date.now() : existing?.solvedAt,
    });
    this._puzzleProgress.set(progress);
    this.savePuzzleProgress(progress);
  }

  private loadLessonProgress(): Map<string, LessonProgress> {
    try {
      const data = localStorage.getItem(LESSON_PROGRESS_KEY);
      if (data) {
        const arr: LessonProgress[] = JSON.parse(data);
        return new Map(arr.map((p) => [p.lessonId, p]));
      }
    } catch {}
    return new Map();
  }

  private saveLessonProgress(progress: Map<string, LessonProgress>): void {
    localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(Array.from(progress.values())));
  }

  private loadPuzzleProgress(): Map<string, PuzzleProgress> {
    try {
      const data = localStorage.getItem(PUZZLE_PROGRESS_KEY);
      if (data) {
        const arr: PuzzleProgress[] = JSON.parse(data);
        return new Map(arr.map((p) => [p.puzzleId, p]));
      }
    } catch {}
    return new Map();
  }

  private savePuzzleProgress(progress: Map<string, PuzzleProgress>): void {
    localStorage.setItem(PUZZLE_PROGRESS_KEY, JSON.stringify(Array.from(progress.values())));
  }
}
