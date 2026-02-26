import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  template: `
    <div class="game-controls">
      <button class="control-btn" (click)="undoClicked.emit()" [disabled]="!canUndo" title="Undo">
        <span class="btn-icon">↩</span> Undo
      </button>
      <button class="control-btn" (click)="flipClicked.emit()" title="Flip board">
        <span class="btn-icon">🔄</span> Flip
      </button>
      <button class="control-btn new-game" (click)="newGameClicked.emit()" title="New game">
        <span class="btn-icon">⚡</span> New Game
      </button>
      @if (showResign) {
        <button class="control-btn resign" (click)="resignClicked.emit()" title="Resign">
          <span class="btn-icon">🏳</span> Resign
        </button>
      }
    </div>
  `,
  styles: [`
    .game-controls {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .control-btn {
      padding: 9px 16px;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-sm);
      background: var(--bg-glass);
      backdrop-filter: blur(12px);
      color: var(--text-primary);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-icon { font-size: 14px; }
    .control-btn:hover:not(:disabled) {
      background: var(--bg-glass-hover);
      border-color: var(--neon-blue);
      box-shadow: 0 0 12px rgba(0, 212, 255, 0.15);
      color: var(--neon-blue);
      transform: translateY(-1px);
    }
    .control-btn:active:not(:disabled) {
      transform: translateY(0);
    }
    .control-btn:disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }
    .new-game:hover:not(:disabled) {
      border-color: var(--neon-green);
      color: var(--neon-green);
      box-shadow: 0 0 12px rgba(57, 255, 20, 0.15);
    }
    .resign {
      color: var(--neon-pink);
    }
    .resign:hover:not(:disabled) {
      border-color: var(--neon-pink);
      color: var(--neon-pink);
      box-shadow: 0 0 12px rgba(255, 45, 120, 0.2);
    }
  `],
})
export class GameControlsComponent {
  @Input() canUndo = false;
  @Input() showResign = false;

  @Output() undoClicked = new EventEmitter<void>();
  @Output() flipClicked = new EventEmitter<void>();
  @Output() newGameClicked = new EventEmitter<void>();
  @Output() resignClicked = new EventEmitter<void>();
}
