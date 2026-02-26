import { Component, signal } from '@angular/core';
import { ThemeService, BOARD_THEMES, BoardTheme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  template: `
    <div class="theme-picker-wrapper">
      <button class="gear-btn" (click)="togglePicker()" title="Board Theme">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>
      </button>

      @if (isOpen()) {
        <div class="picker-dropdown glass-panel">
          <h4>Board Theme</h4>
          <div class="theme-grid">
            @for (theme of themes; track theme.name) {
              <button
                class="theme-option"
                [class.active]="themeService.currentBoardTheme().name === theme.name"
                (click)="selectTheme(theme)"
                [title]="theme.name"
              >
                <div class="mini-board">
                  <div class="mini-sq" [style.background]="theme.light"></div>
                  <div class="mini-sq" [style.background]="theme.dark"></div>
                  <div class="mini-sq" [style.background]="theme.dark"></div>
                  <div class="mini-sq" [style.background]="theme.light"></div>
                </div>
                <span class="theme-name">{{ theme.name }}</span>
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .theme-picker-wrapper {
      position: relative;
    }
    .gear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-sm);
      background: var(--bg-glass);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .gear-btn:hover {
      color: var(--neon-blue);
      border-color: var(--neon-blue);
      box-shadow: 0 0 12px rgba(0, 212, 255, 0.2);
    }
    .gear-btn:hover svg {
      filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.4));
    }
    .picker-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 260px;
      padding: 18px;
      z-index: 100;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.05);
      border-color: rgba(0, 212, 255, 0.12);
      animation: dropdown-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    h4 {
      margin: 0 0 14px;
      font-size: 11px;
      font-family: var(--font-display);
      color: var(--neon-blue);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      text-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
    }
    .theme-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .theme-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 12px 8px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-sm);
      background: transparent;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--text-primary);
    }
    .theme-option:hover {
      border-color: var(--neon-blue);
      background: rgba(0, 212, 255, 0.05);
      transform: translateY(-1px);
    }
    .theme-option.active {
      border-color: var(--neon-blue);
      background: rgba(0, 212, 255, 0.1);
      box-shadow: 0 0 12px rgba(0, 212, 255, 0.15);
    }
    .mini-board {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 44px;
      height: 44px;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    .mini-sq { }
    .theme-name {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
      text-align: center;
    }
    .theme-option.active .theme-name {
      color: var(--neon-blue);
      text-shadow: 0 0 6px rgba(0, 212, 255, 0.3);
    }
    @keyframes dropdown-in {
      0% { opacity: 0; transform: translateY(-8px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
  `],
})
export class ThemePickerComponent {
  themes = BOARD_THEMES;
  isOpen = signal(false);

  constructor(public themeService: ThemeService) {}

  togglePicker(): void {
    this.isOpen.update((v) => !v);
  }

  selectTheme(theme: BoardTheme): void {
    this.themeService.applyBoardTheme(theme);
    this.isOpen.set(false);
  }
}
