import { Component, signal, computed, ViewChild } from '@angular/core';
import { ChessboardComponent } from '../../components/chessboard/chessboard.component';
import { CelebrationComponent } from '../../components/celebration/celebration.component';
import { LessonService } from '../../services/lesson.service';
import { SoundService } from '../../services/sound.service';
import { ChessEngineService } from '../../services/chess-engine.service';
import { Puzzle } from '../../models/lesson.model';

@Component({
  selector: 'app-puzzles',
  standalone: true,
  imports: [ChessboardComponent, CelebrationComponent],
  template: `
    <app-celebration #celebration />

    <div class="puzzles-page">
      <div class="puzzles-header">
        <h1>
          <span class="header-icon">🧩</span>
          TACTICAL PUZZLES
        </h1>
        <p class="subtitle">Sharpen your tactical vision and pattern recognition</p>
      </div>

      <!-- Stats row -->
      <div class="puzzle-stats glass-panel">
        <div class="pstat">
          <span class="pstat-num total-num">{{ stats().total }}</span>
          <span class="pstat-label">Total</span>
        </div>
        <div class="pstat-divider"></div>
        <div class="pstat">
          <span class="pstat-num solved-num">{{ stats().solved }}</span>
          <span class="pstat-label">Solved</span>
        </div>
        <div class="pstat-divider"></div>
        <div class="pstat">
          <span class="pstat-num pct-num">{{ solvedPercent() }}%</span>
          <span class="pstat-label">Complete</span>
        </div>
        <div class="pstat-divider"></div>
        <div class="pstat">
          <span class="pstat-num remaining-num">{{ stats().total - stats().solved }}</span>
          <span class="pstat-label">Remaining</span>
        </div>
      </div>

      @if (!activePuzzle()) {
        <!-- Difficulty filters -->
        <div class="puzzle-filters">
          <button class="filter-btn" [class.active]="activeFilter() === 'all'" (click)="activeFilter.set('all')">
            All ({{ allPuzzlesCount() }})
          </button>
          <button class="filter-btn easy-filter" [class.active]="activeFilter() === 'easy'" (click)="activeFilter.set('easy')">
            Easy ({{ easyCount() }})
          </button>
          <button class="filter-btn medium-filter" [class.active]="activeFilter() === 'medium'" (click)="activeFilter.set('medium')">
            Medium ({{ mediumCount() }})
          </button>
          <button class="filter-btn hard-filter" [class.active]="activeFilter() === 'hard'" (click)="activeFilter.set('hard')">
            Hard ({{ hardCount() }})
          </button>
        </div>

        <!-- Puzzle grid -->
        <div class="puzzle-grid">
          @for (puzzle of filteredPuzzles(); track puzzle.id) {
            <div
              class="puzzle-card glass-panel"
              [class.solved]="isPuzzleSolved(puzzle.id)"
              (click)="startPuzzle(puzzle)"
            >
              <div class="puzzle-card-top">
                <div class="puzzle-badge" [class]="puzzle.difficulty">{{ puzzle.difficulty }}</div>
                @if (isPuzzleSolved(puzzle.id)) {
                  <span class="solved-check">✓</span>
                }
              </div>
              <h3>{{ puzzle.title }}</h3>
              <p class="puzzle-theme-label">{{ puzzle.theme }}</p>
              <p class="puzzle-desc-preview">{{ puzzle.description }}</p>
            </div>
          }
        </div>
      } @else {
        <!-- Active puzzle view -->
        <div class="puzzle-active">
          <div class="puzzle-info-bar glass-panel">
            <button class="back-btn" (click)="exitPuzzle()">← Back</button>
            <div class="puzzle-title-area">
              <h2>{{ activePuzzle()!.title }}</h2>
              <div class="puzzle-info-tags">
                <span class="puzzle-badge" [class]="activePuzzle()!.difficulty">{{ activePuzzle()!.difficulty }}</span>
                <span class="puzzle-theme-tag">{{ activePuzzle()!.theme }}</span>
              </div>
            </div>
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
                  <span class="status-icon">🎉</span> Puzzle solved! Well done.
                } @else if (puzzleFailed()) {
                  <span class="status-icon">❌</span> Incorrect. Try again!
                } @else {
                  <span class="status-icon">🎯</span> {{ turnToMove() }} to move. Find the best move!
                }
              </div>

              <!-- Move progress -->
              <div class="move-progress">
                <span class="move-prog-label">Moves: {{ currentMoveIndex() }} / {{ activePuzzle()!.solutionMoves.length }}</span>
                <div class="move-prog-bar">
                  <div class="move-prog-fill" [style.width.%]="(currentMoveIndex() / activePuzzle()!.solutionMoves.length) * 100"></div>
                </div>
              </div>

              <div class="puzzle-actions">
                @if (puzzleFailed()) {
                  <button class="action-btn retry-btn" (click)="retryPuzzle()">
                    ↻ Retry Puzzle
                  </button>
                }
                @if (puzzleSolved()) {
                  <button class="action-btn next-btn" (click)="nextPuzzle()">
                    Next Puzzle →
                  </button>
                }
                <button class="action-btn hint-btn" (click)="showHint()">
                  @if (hintShown()) {
                    💡 Hint: Move from {{ activePuzzle()!.solutionMoves[currentMoveIndex()].from }}
                  } @else {
                    💡 Show Hint
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
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    .puzzles-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .puzzles-header h1 {
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
      font-size: 16px;
      margin: 0;
    }

    /* Stats */
    .puzzle-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 18px;
      margin-bottom: 24px;
      border-color: rgba(255, 45, 120, 0.12);
      flex-wrap: wrap;
    }
    .pstat {
      text-align: center;
      min-width: 70px;
    }
    .pstat-num {
      display: block;
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 800;
    }
    .total-num { color: var(--neon-blue); }
    .solved-num { color: var(--neon-green); text-shadow: 0 0 15px rgba(57, 255, 20, 0.3); }
    .pct-num { color: var(--neon-purple); }
    .remaining-num { color: var(--neon-pink); }
    .pstat-label {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }
    .pstat-divider {
      width: 1px;
      height: 36px;
      background: linear-gradient(to bottom, transparent, rgba(255, 45, 120, 0.3), transparent);
    }

    /* Filters */
    .puzzle-filters {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .filter-btn {
      padding: 8px 18px;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-pill);
      background: var(--bg-glass);
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
      transition: all var(--transition-normal);
    }
    .filter-btn:hover {
      border-color: rgba(0, 212, 255, 0.3);
      color: var(--text-primary);
    }
    .filter-btn.active {
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
      color: #fff;
      border-color: transparent;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    }
    .easy-filter.active {
      background: rgba(57, 255, 20, 0.15);
      color: var(--neon-green);
      border-color: rgba(57, 255, 20, 0.3);
      box-shadow: 0 0 12px rgba(57, 255, 20, 0.2);
    }
    .medium-filter.active {
      background: rgba(255, 215, 0, 0.15);
      color: var(--neon-gold);
      border-color: rgba(255, 215, 0, 0.3);
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.2);
    }
    .hard-filter.active {
      background: rgba(255, 45, 120, 0.15);
      color: var(--neon-pink);
      border-color: rgba(255, 45, 120, 0.3);
      box-shadow: 0 0 12px rgba(255, 45, 120, 0.2);
    }

    /* Puzzle grid */
    .puzzle-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 14px;
    }
    .puzzle-card {
      padding: 18px;
      cursor: pointer;
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }
    .puzzle-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.03), transparent);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }
    .puzzle-card:hover::before { opacity: 1; }
    .puzzle-card:hover {
      border-color: rgba(0, 212, 255, 0.3);
      transform: translateY(-3px);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
    }
    .puzzle-card.solved {
      border-color: rgba(57, 255, 20, 0.3);
    }
    .puzzle-card.solved:hover {
      box-shadow: 0 0 20px rgba(57, 255, 20, 0.1);
    }
    .puzzle-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .puzzle-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: var(--radius-pill);
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .puzzle-badge.easy {
      background: rgba(57, 255, 20, 0.12);
      color: var(--neon-green);
      border: 1px solid rgba(57, 255, 20, 0.2);
    }
    .puzzle-badge.medium {
      background: rgba(255, 215, 0, 0.12);
      color: var(--neon-gold);
      border: 1px solid rgba(255, 215, 0, 0.2);
    }
    .puzzle-badge.hard {
      background: rgba(255, 45, 120, 0.12);
      color: var(--neon-pink);
      border: 1px solid rgba(255, 45, 120, 0.2);
    }
    .solved-check {
      font-size: 16px;
      font-weight: 700;
      color: var(--neon-green);
      text-shadow: 0 0 8px rgba(57, 255, 20, 0.5);
    }
    .puzzle-card h3 {
      margin: 0 0 4px;
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .puzzle-theme-label {
      margin: 0 0 6px;
      font-size: 12px;
      color: var(--neon-blue);
      font-weight: 500;
    }
    .puzzle-desc-preview {
      margin: 0;
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Active puzzle */
    .puzzle-info-bar {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 18px;
      margin-bottom: 20px;
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
    .puzzle-title-area { flex: 1; }
    .puzzle-title-area h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .puzzle-info-tags {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 4px;
    }
    .puzzle-theme-tag {
      font-size: 12px;
      color: var(--text-muted);
    }

    .puzzle-layout {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .board-section { flex-shrink: 0; }
    .puzzle-side {
      flex: 1;
      min-width: 280px;
      max-width: 380px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .puzzle-desc {
      font-size: 15px;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.6;
    }
    .puzzle-status {
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
    .puzzle-status.correct {
      background: rgba(57, 255, 20, 0.1);
      color: var(--neon-green);
      border-color: rgba(57, 255, 20, 0.2);
      box-shadow: 0 0 15px rgba(57, 255, 20, 0.1);
    }
    .puzzle-status.wrong {
      background: rgba(255, 45, 120, 0.1);
      color: var(--neon-pink);
      border-color: rgba(255, 45, 120, 0.2);
      box-shadow: 0 0 15px rgba(255, 45, 120, 0.1);
    }
    .status-icon { font-size: 18px; }

    .move-progress {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .move-prog-label {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 600;
    }
    .move-prog-bar {
      height: 4px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 2px;
      overflow: hidden;
    }
    .move-prog-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-green));
      border-radius: 2px;
      transition: width 0.3s;
      box-shadow: 0 0 6px rgba(0, 212, 255, 0.4);
    }

    .puzzle-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .action-btn {
      padding: 12px 18px;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-sm);
      background: var(--bg-glass);
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      transition: all var(--transition-normal);
    }
    .action-btn:hover {
      background: var(--bg-glass-hover);
      border-color: var(--neon-blue);
    }
    .next-btn {
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
      color: #fff;
      border-color: transparent;
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
    }
    .next-btn:hover {
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
      transform: translateY(-1px);
    }
    .retry-btn {
      border-color: var(--neon-pink);
      color: var(--neon-pink);
    }
    .retry-btn:hover {
      background: rgba(255, 45, 120, 0.1);
      box-shadow: 0 0 15px rgba(255, 45, 120, 0.2);
    }
    .hint-btn {
      border-color: rgba(255, 215, 0, 0.3);
      color: var(--neon-gold);
    }
    .hint-btn:hover {
      background: rgba(255, 215, 0, 0.08);
    }

    @media (max-width: 768px) {
      .puzzle-layout { flex-direction: column; align-items: center; }
      .puzzle-side { max-width: 100%; }
      .puzzle-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class PuzzlesComponent {
  @ViewChild('celebration') celebration!: CelebrationComponent;

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

  solvedPercent = computed(() => {
    const s = this.stats();
    return s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0;
  });

  allPuzzlesCount = computed(() => this.lessonService.getPuzzles().length);
  easyCount = computed(() => this.lessonService.getPuzzles().filter(p => p.difficulty === 'easy').length);
  mediumCount = computed(() => this.lessonService.getPuzzles().filter(p => p.difficulty === 'medium').length);
  hardCount = computed(() => this.lessonService.getPuzzles().filter(p => p.difficulty === 'hard').length);

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
          setTimeout(() => this.celebration?.trigger(), 200);
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
