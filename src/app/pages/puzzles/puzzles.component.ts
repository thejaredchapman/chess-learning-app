import { Component, signal, computed } from '@angular/core';
import { ChessboardComponent } from '../../components/chessboard/chessboard.component';
import { LessonService } from '../../services/lesson.service';
import { SoundService } from '../../services/sound.service';
import { ChessEngineService } from '../../services/chess-engine.service';
import { Puzzle } from '../../models/lesson.model';

@Component({
  selector: 'app-puzzles',
  standalone: true,
  imports: [ChessboardComponent],
  template: `
    <div class="puzzles-page">
      <div class="puzzles-header">
        <h1>Tactical Puzzles</h1>
        <p class="subtitle">
          Solved {{ stats().solved }} of {{ stats().total }} puzzles
        </p>
      </div>

      @if (!activePuzzle()) {
        <div class="puzzle-filters">
          <button
            class="filter-btn"
            [class.active]="activeFilter() === 'all'"
            (click)="activeFilter.set('all')"
          >All</button>
          <button
            class="filter-btn"
            [class.active]="activeFilter() === 'easy'"
            (click)="activeFilter.set('easy')"
          >Easy</button>
          <button
            class="filter-btn"
            [class.active]="activeFilter() === 'medium'"
            (click)="activeFilter.set('medium')"
          >Medium</button>
          <button
            class="filter-btn"
            [class.active]="activeFilter() === 'hard'"
            (click)="activeFilter.set('hard')"
          >Hard</button>
        </div>

        <div class="puzzle-grid">
          @for (puzzle of filteredPuzzles(); track puzzle.id) {
            <div
              class="puzzle-card"
              [class.solved]="isPuzzleSolved(puzzle.id)"
              (click)="startPuzzle(puzzle)"
            >
              <div class="puzzle-badge" [class]="puzzle.difficulty">{{ puzzle.difficulty }}</div>
              <h3>{{ puzzle.title }}</h3>
              <p>{{ puzzle.theme }}</p>
              @if (isPuzzleSolved(puzzle.id)) {
                <span class="solved-badge">✓ Solved</span>
              }
            </div>
          }
        </div>
      } @else {
        <div class="puzzle-active">
          <div class="puzzle-info">
            <button class="back-btn" (click)="exitPuzzle()">← Back</button>
            <h2>{{ activePuzzle()!.title }}</h2>
            <span class="puzzle-theme">{{ activePuzzle()!.theme }}</span>
          </div>

          <div class="puzzle-layout">
            <div class="board-section">
              <app-chessboard
                [position]="puzzleFen()"
                [interactive]="!puzzleSolved() && !puzzleFailed()"
                [orientation]="activePuzzle()!.orientation"
                [lastMove]="lastMove()"
                (moveMade)="onPuzzleMove($event)"
              />
            </div>

            <div class="puzzle-side">
              <p class="puzzle-desc">{{ activePuzzle()!.description }}</p>

              <div class="puzzle-status"
                [class.correct]="puzzleSolved()"
                [class.wrong]="puzzleFailed()"
              >
                @if (puzzleSolved()) {
                  Puzzle solved! Well done.
                } @else if (puzzleFailed()) {
                  Incorrect. Try again!
                } @else {
                  {{ turnToMove() }} to move. Find the best move!
                }
              </div>

              <div class="puzzle-actions">
                @if (puzzleFailed()) {
                  <button class="action-btn" (click)="retryPuzzle()">Retry</button>
                }
                @if (puzzleSolved()) {
                  <button class="action-btn primary" (click)="nextPuzzle()">Next Puzzle →</button>
                }
                <button class="action-btn" (click)="showHint()">
                  @if (hintShown()) {
                    Hint: Move from {{ activePuzzle()!.solutionMoves[currentMoveIndex()].from }}
                  } @else {
                    Show Hint
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .puzzles-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    .puzzles-header h1 { font-size: 32px; margin: 0 0 4px; color: #1a1a1a; }
    .subtitle { color: #777; font-size: 16px; margin: 0 0 24px; }
    .puzzle-filters {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }
    .filter-btn {
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      background: #fff;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.15s;
    }
    .filter-btn:hover { border-color: #1976d2; }
    .filter-btn.active {
      background: #1976d2;
      color: #fff;
      border-color: #1976d2;
    }
    .puzzle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }
    .puzzle-card {
      padding: 16px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }
    .puzzle-card:hover {
      border-color: #1976d2;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .puzzle-card.solved { border-color: #4caf50; background: #f9fff9; }
    .puzzle-card h3 { margin: 8px 0 4px; font-size: 15px; color: #333; }
    .puzzle-card p { margin: 0; font-size: 12px; color: #999; }
    .puzzle-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 600;
    }
    .puzzle-badge.easy { background: #e8f5e9; color: #2e7d32; }
    .puzzle-badge.medium { background: #fff3e0; color: #e65100; }
    .puzzle-badge.hard { background: #fce4ec; color: #c62828; }
    .solved-badge {
      font-size: 12px;
      color: #4caf50;
      font-weight: 600;
    }
    .puzzle-active { }
    .puzzle-info {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
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
    .puzzle-info h2 { margin: 0; flex: 1; font-size: 22px; }
    .puzzle-theme { font-size: 13px; color: #999; }
    .puzzle-layout {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .puzzle-side {
      flex: 1;
      min-width: 260px;
      max-width: 350px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .puzzle-desc {
      font-size: 15px;
      color: #555;
      margin: 0;
      line-height: 1.5;
    }
    .puzzle-status {
      padding: 14px;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      background: #e3f2fd;
      color: #1976d2;
    }
    .puzzle-status.correct { background: #e8f5e9; color: #2e7d32; }
    .puzzle-status.wrong { background: #fce4ec; color: #c62828; }
    .puzzle-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .action-btn {
      padding: 10px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.15s;
    }
    .action-btn:hover { background: #f5f5f5; }
    .action-btn.primary {
      background: #1976d2;
      color: #fff;
      border-color: #1976d2;
    }
    .action-btn.primary:hover { background: #1565c0; }
    @media (max-width: 768px) {
      .puzzle-layout { flex-direction: column; align-items: center; }
      .puzzle-side { max-width: 100%; }
    }
  `],
})
export class PuzzlesComponent {
  activePuzzle = signal<Puzzle | null>(null);
  activeFilter = signal<'all' | 'easy' | 'medium' | 'hard'>('all');
  puzzleFen = signal('');
  puzzleSolved = signal(false);
  puzzleFailed = signal(false);
  hintShown = signal(false);
  currentMoveIndex = signal(0);
  lastMove = signal<{ from: string; to: string } | null>(null);

  constructor(
    private lessonService: LessonService,
    private sound: SoundService,
    private engine: ChessEngineService,
  ) {}

  stats = computed(() => this.lessonService.getPuzzleStats());

  filteredPuzzles = computed(() => {
    const all = this.lessonService.getPuzzles();
    const filter = this.activeFilter();
    if (filter === 'all') return all;
    return all.filter((p) => p.difficulty === filter);
  });

  isPuzzleSolved(id: string): boolean {
    return this.lessonService.getPuzzleProgress(id)?.solved || false;
  }

  turnToMove(): string {
    const puzzle = this.activePuzzle();
    if (!puzzle) return '';
    return puzzle.orientation === 'white' ? 'White' : 'Black';
  }

  startPuzzle(puzzle: Puzzle): void {
    this.activePuzzle.set(puzzle);
    this.puzzleFen.set(puzzle.fen);
    this.puzzleSolved.set(false);
    this.puzzleFailed.set(false);
    this.hintShown.set(false);
    this.currentMoveIndex.set(0);
    this.lastMove.set(null);
    this.engine.loadFen(puzzle.fen);
  }

  onPuzzleMove(move: { from: string; to: string }): void {
    const puzzle = this.activePuzzle();
    if (!puzzle) return;

    const expectedMove = puzzle.solutionMoves[this.currentMoveIndex()];
    if (!expectedMove) return;

    if (move.from === expectedMove.from && move.to === expectedMove.to) {
      const result = this.engine.makeMove(move.from, move.to);
      if (result) {
        this.lastMove.set({ from: move.from, to: move.to });
        this.puzzleFen.set(this.engine.getFen());
        const nextIdx = this.currentMoveIndex() + 1;

        if (nextIdx >= puzzle.solutionMoves.length) {
          this.puzzleSolved.set(true);
          this.sound.playSuccess();
          this.lessonService.updatePuzzleProgress(puzzle.id, true);
        } else {
          this.currentMoveIndex.set(nextIdx);
          this.sound.playMove();
          this.hintShown.set(false);
        }
      }
    } else {
      this.puzzleFailed.set(true);
      this.sound.playError();
      this.lessonService.updatePuzzleProgress(puzzle.id, false);
    }
  }

  retryPuzzle(): void {
    const puzzle = this.activePuzzle();
    if (puzzle) this.startPuzzle(puzzle);
  }

  nextPuzzle(): void {
    const puzzles = this.filteredPuzzles();
    const current = this.activePuzzle();
    if (!current) return;
    const idx = puzzles.findIndex((p) => p.id === current.id);
    const next = puzzles[(idx + 1) % puzzles.length];
    this.startPuzzle(next);
  }

  showHint(): void {
    this.hintShown.set(true);
  }

  exitPuzzle(): void {
    this.activePuzzle.set(null);
  }
}
