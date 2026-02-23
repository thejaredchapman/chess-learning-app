import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  template: `
    <div class="game-controls">
      <button class="control-btn" (click)="undoClicked.emit()" [disabled]="!canUndo" title="Undo">
        ↩ Undo
      </button>
      <button class="control-btn" (click)="flipClicked.emit()" title="Flip board">
        🔄 Flip
      </button>
      <button class="control-btn" (click)="newGameClicked.emit()" title="New game">
        ✚ New Game
      </button>
      @if (showResign) {
        <button class="control-btn resign" (click)="resignClicked.emit()" title="Resign">
          ⚑ Resign
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
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background: #fff;
      color: #333;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .control-btn:hover:not(:disabled) {
      background: #f5f5f5;
      border-color: #ccc;
    }
    .control-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .resign { color: #d32f2f; }
    .resign:hover:not(:disabled) { background: #fde; }
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
