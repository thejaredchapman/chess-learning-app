import { Component, signal, OnDestroy, ViewChild, computed } from '@angular/core';
import { ChessboardComponent } from '../../components/chessboard/chessboard.component';
import { MoveHistoryComponent } from '../../components/move-history/move-history.component';
import { GameControlsComponent } from '../../components/game-controls/game-controls.component';
import { EvaluationBarComponent } from '../../components/evaluation-bar/evaluation-bar.component';
import { CapturedPiecesComponent } from '../../components/captured-pieces/captured-pieces.component';
import { CelebrationComponent } from '../../components/celebration/celebration.component';
import { ChessEngineService } from '../../services/chess-engine.service';
import { StockfishService } from '../../services/stockfish.service';
import { SoundService } from '../../services/sound.service';
import { OpeningBookService } from '../../services/opening-book.service';
import { GameMode, DifficultyLevel, DIFFICULTY_LEVELS, PieceColor } from '../../models/chess.model';
import { MoveQuality, classifyMoveQuality } from '../../models/move-quality.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    ChessboardComponent, MoveHistoryComponent, GameControlsComponent,
    EvaluationBarComponent, CapturedPiecesComponent, CelebrationComponent,
  ],
  template: `
    <app-celebration #celebration />

    @if (!gameStarted()) {
      <div class="setup">
        <div class="setup-header">
          <h1>
            <span class="setup-icon">⚔️</span>
            PLAY CHESS
          </h1>
          <p class="setup-sub">Configure your match and enter the arena</p>
        </div>

        <div class="setup-card glass-panel">
          <div class="setup-section">
            <h2>GAME MODE</h2>
            <div class="option-row">
              <button
                class="option-btn"
                [class.selected]="selectedMode() === 'human'"
                (click)="selectedMode.set('human')"
              >
                <span class="opt-icon">👥</span>
                <span class="opt-label">Two Players</span>
                <span class="opt-desc">Play locally</span>
              </button>
              <button
                class="option-btn"
                [class.selected]="selectedMode() === 'computer'"
                (click)="selectedMode.set('computer')"
              >
                <span class="opt-icon">🤖</span>
                <span class="opt-label">vs Computer</span>
                <span class="opt-desc">Stockfish AI</span>
              </button>
            </div>
          </div>

          @if (selectedMode() === 'computer') {
            <div class="setup-section">
              <h2>PLAY AS</h2>
              <div class="option-row">
                <button
                  class="option-btn color-btn"
                  [class.selected]="selectedColor() === 'w'"
                  (click)="selectedColor.set('w')"
                >
                  <span class="color-circle white-circle">♔</span>
                  <span class="opt-label">White</span>
                </button>
                <button
                  class="option-btn color-btn"
                  [class.selected]="selectedColor() === 'b'"
                  (click)="selectedColor.set('b')"
                >
                  <span class="color-circle black-circle">♚</span>
                  <span class="opt-label">Black</span>
                </button>
              </div>
            </div>

            <div class="setup-section">
              <h2>DIFFICULTY</h2>
              <div class="option-row difficulty-row">
                @for (level of difficultyLevels; track level.name) {
                  <button
                    class="option-btn diff-btn"
                    [class.selected]="selectedDifficulty().name === level.name"
                    [class]="'diff-' + level.name.toLowerCase()"
                    (click)="selectedDifficulty.set(level)"
                  >
                    <span class="diff-depth">D{{ level.depth }}</span>
                    <span class="opt-label">{{ level.name }}</span>
                    <span class="opt-desc">{{ level.description }}</span>
                  </button>
                }
              </div>
            </div>
          }

          <button class="start-btn" (click)="startGame()">
            <span>START GAME</span>
            <span class="start-arrow">→</span>
          </button>
        </div>
      </div>
    } @else {
      <div class="game-layout">
        <!-- Left column: Board area -->
        <div class="board-column">
          <!-- Opponent bar -->
          <div class="player-bar top glass-panel">
            <div class="player-info">
              <span class="player-indicator opponent-dot"></span>
              <span class="player-name">{{ opponentName() }}</span>
            </div>
            <app-captured-pieces
              [moves]="engine.moveHistory()"
              [color]="boardOrientation() === 'white' ? 'w' : 'b'"
            />
          </div>

          <!-- Board + eval bar -->
          <div class="board-with-eval">
            @if (selectedMode() === 'computer') {
              <app-evaluation-bar
                [evaluation]="stockfish.evaluation().value"
                [isMate]="stockfish.evaluation().type === 'mate'"
                [mateIn]="stockfish.evaluation().type === 'mate' ? stockfish.evaluation().value : 0"
              />
            }

            <app-chessboard
              [position]="engine.fen()"
              [interactive]="canMove()"
              [orientation]="boardOrientation()"
              [lastMove]="engine.lastMove()"
              [checkSquare]="checkSquare()"
              (moveMade)="onMoveMade($event)"
            />
          </div>

          <!-- Player bar -->
          <div class="player-bar bottom glass-panel">
            <div class="player-info">
              <span class="player-indicator player-dot"></span>
              <span class="player-name">{{ playerName() }}</span>
            </div>
            <app-captured-pieces
              [moves]="engine.moveHistory()"
              [color]="boardOrientation() === 'white' ? 'b' : 'w'"
            />
          </div>
        </div>

        <!-- Right column: Info panel -->
        <div class="info-column">
          <!-- Turn indicator -->
          <div class="turn-indicator glass-panel">
            <span class="turn-dot" [class.white-turn]="engine.turn() === 'w'" [class.black-turn]="engine.turn() === 'b'"></span>
            <span class="turn-text">{{ engine.turn() === 'w' ? 'White' : 'Black' }} to move</span>
            @if (engine.isCheck()) {
              <span class="check-badge">CHECK</span>
            }
          </div>

          <!-- Opening identification -->
          @if (openingBook.openingName()) {
            <div class="opening-pill glass-panel">
              <span class="eco-code">{{ openingBook.ecoCode() }}</span>
              <span class="opening-name">{{ openingBook.openingName() }}</span>
            </div>
          }

          <!-- Game controls -->
          <app-game-controls
            [canUndo]="engine.moveHistory().length > 0 && !engine.isGameOver()"
            [showResign]="!engine.isGameOver() && selectedMode() === 'computer'"
            (undoClicked)="undo()"
            (flipClicked)="flipBoard()"
            (newGameClicked)="resetGame()"
            (resignClicked)="resign()"
          />

          <!-- Move history -->
          <app-move-history
            [moves]="engine.moveHistory()"
            [moveQualities]="moveQualities()"
          />

          <!-- Game over banner -->
          @if (engine.isGameOver()) {
            <div class="game-over-banner glass-panel">
              <div class="game-over-icon">{{ engine.isCheckmate() ? '👑' : '🤝' }}</div>
              <h3>{{ statusText() }}</h3>
              <div class="game-over-actions">
                <button class="start-btn compact" (click)="resetGame()">
                  <span>Play Again</span>
                </button>
                @if (selectedMode() === 'computer' && !analyzed()) {
                  <button class="analyze-btn" (click)="analyzeGame()">Analyze Game</button>
                }
              </div>
            </div>
          }

          <!-- Thinking indicator -->
          @if (stockfish.isThinking()) {
            <div class="thinking-indicator glass-panel">
              <div class="thinking-dots">
                <span></span><span></span><span></span>
              </div>
              Computer is thinking...
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    /* Setup Screen */
    .setup {
      max-width: 650px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .setup-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .setup-header h1 {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 4px;
      margin: 0 0 8px;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    .setup-icon { font-size: 36px; }
    .setup-sub {
      color: var(--text-secondary);
      font-size: 16px;
      margin: 0;
    }
    .setup-card {
      padding: 32px;
    }
    .setup-section {
      margin-bottom: 28px;
    }
    .setup-section h2 {
      font-family: var(--font-display);
      font-size: 11px;
      color: var(--neon-blue);
      margin: 0 0 14px;
      letter-spacing: 3px;
      font-weight: 700;
    }
    .option-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .option-btn {
      flex: 1;
      min-width: 140px;
      padding: 18px 20px;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-md);
      background: rgba(10, 10, 30, 0.5);
      cursor: pointer;
      transition: all var(--transition-normal);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: var(--text-primary);
    }
    .option-btn:hover {
      border-color: rgba(0, 212, 255, 0.3);
      background: rgba(0, 212, 255, 0.05);
    }
    .option-btn.selected {
      border-color: var(--neon-blue);
      background: rgba(0, 212, 255, 0.1);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.15), inset 0 0 20px rgba(0, 212, 255, 0.05);
    }
    .opt-icon { font-size: 28px; }
    .opt-label { font-size: 15px; font-weight: 600; }
    .opt-desc { font-size: 11px; color: var(--text-muted); }
    .option-btn.selected .opt-desc { color: var(--neon-blue); }
    .color-circle {
      font-size: 32px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    .white-circle { background: rgba(255,255,255,0.1); }
    .black-circle { background: rgba(0,0,0,0.3); }
    .diff-depth {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 2px 8px;
      border-radius: var(--radius-pill);
      background: rgba(0, 212, 255, 0.1);
      color: var(--neon-blue);
      font-weight: 600;
    }
    .diff-btn.selected .diff-depth { background: rgba(0, 212, 255, 0.2); }
    .difficulty-row { gap: 10px; }
    .diff-btn { min-width: 120px; }

    .start-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all var(--transition-normal);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
    }
    .start-btn:hover {
      box-shadow: 0 0 40px rgba(0, 212, 255, 0.4);
      transform: translateY(-2px);
    }
    .start-btn.compact {
      width: auto;
      padding: 12px 32px;
      font-size: 13px;
    }
    .start-arrow { font-size: 18px; }

    /* Game Layout */
    .game-layout {
      display: flex;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .board-column {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .board-with-eval {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .player-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
    }
    .player-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .player-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .opponent-dot { background: var(--neon-pink); box-shadow: 0 0 8px rgba(255, 45, 120, 0.4); }
    .player-dot { background: var(--neon-green); box-shadow: 0 0 8px rgba(57, 255, 20, 0.4); }
    .player-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Info Column */
    .info-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 260px;
      max-width: 320px;
      flex: 1;
    }
    .turn-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
    }
    .turn-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transition: all var(--transition-normal);
    }
    .turn-dot.white-turn {
      background: #fff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    .turn-dot.black-turn {
      background: #333;
      border: 2px solid #666;
    }
    .turn-text {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .check-badge {
      margin-left: auto;
      padding: 3px 10px;
      border-radius: var(--radius-pill);
      font-family: var(--font-display);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--neon-pink);
      background: rgba(255, 45, 120, 0.15);
      border: 1px solid rgba(255, 45, 120, 0.3);
      animation: pulse-check 1s ease-in-out infinite;
    }
    @keyframes pulse-check {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .opening-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      animation: slideIn 0.3s ease;
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .eco-code {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--neon-blue);
      padding: 3px 8px;
      background: rgba(0, 212, 255, 0.12);
      border-radius: var(--radius-sm);
      border: 1px solid rgba(0, 212, 255, 0.2);
    }
    .opening-name {
      font-size: 13px;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .game-over-banner {
      text-align: center;
      padding: 24px;
      border-color: rgba(0, 212, 255, 0.2);
    }
    .game-over-icon { font-size: 36px; margin-bottom: 8px; }
    .game-over-banner h3 {
      margin: 0 0 16px;
      font-size: 18px;
      color: var(--text-primary);
    }
    .game-over-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }
    .analyze-btn {
      padding: 10px 24px;
      background: transparent;
      border: 1px solid var(--neon-purple);
      color: var(--neon-purple);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    .analyze-btn:hover {
      background: rgba(191, 90, 242, 0.1);
      box-shadow: 0 0 15px rgba(191, 90, 242, 0.2);
    }

    .thinking-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px;
      color: var(--neon-gold);
      font-size: 13px;
      font-weight: 600;
    }
    .thinking-dots {
      display: flex;
      gap: 4px;
    }
    .thinking-dots span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--neon-gold);
      animation: bounce-dot 1.4s ease-in-out infinite;
    }
    .thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
    .thinking-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce-dot {
      0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
      40% { transform: translateY(-6px); opacity: 1; }
    }

    @media (max-width: 768px) {
      .game-layout { flex-direction: column; align-items: center; }
      .info-column { max-width: 100%; min-width: auto; width: 100%; }
    }
  `],
})
export class PlayComponent implements OnDestroy {
  @ViewChild('celebration') celebration!: CelebrationComponent;

  readonly difficultyLevels = DIFFICULTY_LEVELS;

  gameStarted = signal(false);
  selectedMode = signal<GameMode>('human');
  selectedColor = signal<PieceColor>('w');
  selectedDifficulty = signal<DifficultyLevel>(DIFFICULTY_LEVELS[0]);
  boardOrientation = signal<'white' | 'black'>('white');
  moveQualities = signal<(MoveQuality | null)[]>([]);
  analyzed = signal(false);

  private stockfishSub: Subscription | null = null;

  constructor(
    public engine: ChessEngineService,
    public stockfish: StockfishService,
    private sound: SoundService,
    public openingBook: OpeningBookService,
  ) {}

  ngOnDestroy(): void {
    this.stockfishSub?.unsubscribe();
  }

  startGame(): void {
    this.engine.newGame();
    this.gameStarted.set(true);
    this.moveQualities.set([]);
    this.analyzed.set(false);
    this.openingBook.reset();

    if (this.selectedMode() === 'computer') {
      this.boardOrientation.set(this.selectedColor() === 'w' ? 'white' : 'black');
      this.stockfish.init().then(() => {
        if (this.selectedColor() === 'b') {
          this.makeComputerMove();
        }
      });
    } else {
      this.boardOrientation.set('white');
    }
  }

  canMove(): boolean {
    if (this.engine.isGameOver()) return false;
    if (this.selectedMode() === 'computer') {
      return this.engine.turn() === this.selectedColor() && !this.stockfish.isThinking();
    }
    return true;
  }

  onMoveMade(move: { from: string; to: string }): void {
    const result = this.engine.makeMove(move.from, move.to);
    if (result) {
      if (result.captured) {
        this.sound.playCapture();
      } else {
        this.sound.playMove();
      }
      if (this.engine.isCheck()) {
        this.sound.playCheck();
      }

      this.openingBook.updateMoves(this.engine.getHistory());

      if (this.engine.isGameOver()) {
        this.sound.playGameOver();
        if (this.engine.isCheckmate() && this.selectedMode() === 'computer') {
          const winner = this.engine.turn() === 'w' ? 'b' : 'w';
          if (winner === this.selectedColor()) {
            setTimeout(() => this.celebration?.trigger(), 300);
          }
        }
        return;
      }
      if (this.selectedMode() === 'computer' && this.engine.turn() !== this.selectedColor()) {
        this.makeComputerMove();
      }
    }
  }

  private makeComputerMove(): void {
    if (!this.stockfish.isReady()) return;
    this.stockfishSub?.unsubscribe();
    this.stockfishSub = this.stockfish
      .getBestMove(this.engine.getFen(), this.selectedDifficulty().depth)
      .subscribe((bestMove) => {
        if (bestMove && bestMove !== '(none)') {
          const from = bestMove.substring(0, 2);
          const to = bestMove.substring(2, 4);
          const promotion = bestMove.length > 4 ? bestMove[4] : undefined;
          const result = this.engine.makeMove(from, to, promotion);
          if (result) {
            if (result.captured) {
              this.sound.playCapture();
            } else {
              this.sound.playMove();
            }
            if (this.engine.isCheck()) {
              this.sound.playCheck();
            }

            this.openingBook.updateMoves(this.engine.getHistory());

            if (this.engine.isGameOver()) {
              this.sound.playGameOver();
            }
          }
        }
      });
  }

  analyzeGame(): void {
    const history = this.engine.moveHistory();
    if (history.length < 2) return;

    this.analyzed.set(true);
    const qualities: (MoveQuality | null)[] = history.map(() => null);
    this.moveQualities.set(qualities);
  }

  checkSquare(): string | null {
    if (!this.engine.isCheck()) return null;
    const board = this.engine.getBoard();
    const turn = this.engine.turn();
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const piece = board[r][f];
        if (piece && piece.type === 'k' && piece.color === turn) {
          return String.fromCharCode(97 + f) + (8 - r);
        }
      }
    }
    return null;
  }

  statusText(): string {
    if (this.engine.isCheckmate()) {
      const winner = this.engine.turn() === 'w' ? 'Black' : 'White';
      return `Checkmate! ${winner} wins.`;
    }
    if (this.engine.isStalemate()) return 'Stalemate - Draw';
    if (this.engine.isDraw()) return 'Draw';
    return '';
  }

  playerName(): string {
    if (this.selectedMode() === 'human') {
      return this.boardOrientation() === 'white' ? 'White' : 'Black';
    }
    return 'You';
  }

  opponentName(): string {
    if (this.selectedMode() === 'human') {
      return this.boardOrientation() === 'white' ? 'Black' : 'White';
    }
    return `Stockfish (${this.selectedDifficulty().name})`;
  }

  undo(): void {
    this.engine.undo();
    if (this.selectedMode() === 'computer') {
      this.engine.undo();
    }
    this.openingBook.updateMoves(this.engine.getHistory());
  }

  flipBoard(): void {
    this.boardOrientation.set(this.boardOrientation() === 'white' ? 'black' : 'white');
  }

  resetGame(): void {
    this.gameStarted.set(false);
    this.engine.newGame();
    this.stockfishSub?.unsubscribe();
    this.openingBook.reset();
    this.moveQualities.set([]);
    this.analyzed.set(false);
  }

  resign(): void {
    this.sound.playGameOver();
  }
}
