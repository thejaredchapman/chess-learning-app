import { Component, signal, OnDestroy } from '@angular/core';
import { ChessboardComponent } from '../../components/chessboard/chessboard.component';
import { MoveHistoryComponent } from '../../components/move-history/move-history.component';
import { GameControlsComponent } from '../../components/game-controls/game-controls.component';
import { ChessEngineService } from '../../services/chess-engine.service';
import { StockfishService } from '../../services/stockfish.service';
import { SoundService } from '../../services/sound.service';
import { GameMode, DifficultyLevel, DIFFICULTY_LEVELS, PieceColor } from '../../models/chess.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [ChessboardComponent, MoveHistoryComponent, GameControlsComponent],
  template: `
    @if (!gameStarted()) {
      <div class="setup">
        <h1>Play Chess</h1>

        <div class="setup-section">
          <h2>Game Mode</h2>
          <div class="option-row">
            <button
              class="option-btn"
              [class.selected]="selectedMode() === 'human'"
              (click)="selectedMode.set('human')"
            >
              👥 Two Players
            </button>
            <button
              class="option-btn"
              [class.selected]="selectedMode() === 'computer'"
              (click)="selectedMode.set('computer')"
            >
              🤖 vs Computer
            </button>
          </div>
        </div>

        @if (selectedMode() === 'computer') {
          <div class="setup-section">
            <h2>Play As</h2>
            <div class="option-row">
              <button
                class="option-btn"
                [class.selected]="selectedColor() === 'w'"
                (click)="selectedColor.set('w')"
              >
                ⬜ White
              </button>
              <button
                class="option-btn"
                [class.selected]="selectedColor() === 'b'"
                (click)="selectedColor.set('b')"
              >
                ⬛ Black
              </button>
            </div>
          </div>

          <div class="setup-section">
            <h2>Difficulty</h2>
            <div class="option-row">
              @for (level of difficultyLevels; track level.name) {
                <button
                  class="option-btn"
                  [class.selected]="selectedDifficulty().name === level.name"
                  (click)="selectedDifficulty.set(level)"
                >
                  {{ level.name }}
                  <small>{{ level.description }}</small>
                </button>
              }
            </div>
          </div>
        }

        <button class="start-btn" (click)="startGame()">Start Game</button>
      </div>
    } @else {
      <div class="game-layout">
        <div class="board-section">
          <div class="player-bar top">
            <span class="player-name">{{ opponentName() }}</span>
            @if (engine.isGameOver()) {
              <span class="game-status">{{ statusText() }}</span>
            }
          </div>

          <app-chessboard
            [position]="engine.fen()"
            [interactive]="canMove()"
            [orientation]="boardOrientation()"
            [lastMove]="engine.lastMove()"
            [checkSquare]="checkSquare()"
            (moveMade)="onMoveMade($event)"
          />

          <div class="player-bar bottom">
            <span class="player-name">{{ playerName() }}</span>
          </div>
        </div>

        <div class="side-panel">
          <app-game-controls
            [canUndo]="engine.moveHistory().length > 0 && !engine.isGameOver()"
            [showResign]="!engine.isGameOver() && selectedMode() === 'computer'"
            (undoClicked)="undo()"
            (flipClicked)="flipBoard()"
            (newGameClicked)="resetGame()"
            (resignClicked)="resign()"
          />

          <app-move-history [moves]="engine.moveHistory()" />

          @if (engine.isGameOver()) {
            <div class="game-over-banner">
              <h3>{{ statusText() }}</h3>
              <button class="start-btn" (click)="resetGame()">Play Again</button>
            </div>
          }

          @if (stockfish.isThinking()) {
            <div class="thinking-indicator">
              Computer is thinking...
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .setup {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
    }
    .setup h1 {
      font-size: 32px;
      margin-bottom: 32px;
      color: #1a1a1a;
    }
    .setup-section {
      margin-bottom: 24px;
    }
    .setup-section h2 {
      font-size: 16px;
      color: #666;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .option-row {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .option-btn {
      padding: 16px 24px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      background: #fff;
      cursor: pointer;
      font-size: 15px;
      transition: all 0.15s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 120px;
    }
    .option-btn:hover { border-color: #1976d2; }
    .option-btn.selected {
      border-color: #1976d2;
      background: #e3f2fd;
      color: #1976d2;
    }
    .option-btn small {
      font-size: 11px;
      color: #999;
    }
    .option-btn.selected small { color: #1976d2; }
    .start-btn {
      margin-top: 24px;
      padding: 14px 48px;
      background: #1976d2;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.15s;
    }
    .start-btn:hover { background: #1565c0; }
    .game-layout {
      display: flex;
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .board-section { display: flex; flex-direction: column; gap: 8px; }
    .player-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: #f5f5f5;
      border-radius: 6px;
    }
    .player-name { font-weight: 600; font-size: 14px; color: #333; }
    .game-status {
      font-size: 13px;
      color: #1976d2;
      font-weight: 600;
    }
    .side-panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 240px;
      max-width: 300px;
    }
    .game-over-banner {
      text-align: center;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .game-over-banner h3 { margin: 0 0 12px; color: #333; }
    .thinking-indicator {
      text-align: center;
      padding: 12px;
      background: #fff3e0;
      border-radius: 8px;
      color: #e65100;
      font-size: 13px;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    @media (max-width: 768px) {
      .game-layout { flex-direction: column; align-items: center; }
      .side-panel { max-width: 100%; min-width: auto; width: 100%; }
    }
  `],
})
export class PlayComponent implements OnDestroy {
  readonly difficultyLevels = DIFFICULTY_LEVELS;

  gameStarted = signal(false);
  selectedMode = signal<GameMode>('human');
  selectedColor = signal<PieceColor>('w');
  selectedDifficulty = signal<DifficultyLevel>(DIFFICULTY_LEVELS[0]);
  boardOrientation = signal<'white' | 'black'>('white');

  private stockfishSub: Subscription | null = null;

  constructor(
    public engine: ChessEngineService,
    public stockfish: StockfishService,
    private sound: SoundService,
  ) {}

  ngOnDestroy(): void {
    this.stockfishSub?.unsubscribe();
  }

  startGame(): void {
    this.engine.newGame();
    this.gameStarted.set(true);

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
      if (this.engine.isGameOver()) {
        this.sound.playGameOver();
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
            if (this.engine.isGameOver()) {
              this.sound.playGameOver();
            }
          }
        }
      });
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
  }

  flipBoard(): void {
    this.boardOrientation.set(this.boardOrientation() === 'white' ? 'black' : 'white');
  }

  resetGame(): void {
    this.gameStarted.set(false);
    this.engine.newGame();
    this.stockfishSub?.unsubscribe();
  }

  resign(): void {
    // Trigger game over display
    this.sound.playGameOver();
  }
}
