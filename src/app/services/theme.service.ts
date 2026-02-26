import { Injectable, signal } from '@angular/core';

export interface BoardTheme {
  name: string;
  light: string;
  dark: string;
  selectedLight: string;
  selectedDark: string;
  lastMoveLight: string;
  lastMoveDark: string;
  coordLight: string;
  coordDark: string;
}

export const BOARD_THEMES: BoardTheme[] = [
  {
    name: 'Classic Wood',
    light: '#edeed1',
    dark: '#779952',
    selectedLight: '#f7f769',
    selectedDark: '#bbcc44',
    lastMoveLight: '#f5f682',
    lastMoveDark: '#b9cc3b',
    coordLight: '#779952',
    coordDark: '#edeed1',
  },
  {
    name: 'Midnight Neon',
    light: '#2a2a3e',
    dark: '#1a1a2e',
    selectedLight: '#4f46e5',
    selectedDark: '#3730a3',
    lastMoveLight: '#3b3b5c',
    lastMoveDark: '#2d2d4a',
    coordLight: '#6366f1',
    coordDark: '#818cf8',
  },
  {
    name: 'Ocean Blue',
    light: '#d4e4f7',
    dark: '#4a82b0',
    selectedLight: '#ffd700',
    selectedDark: '#daa520',
    lastMoveLight: '#bfd4ea',
    lastMoveDark: '#3a729f',
    coordLight: '#4a82b0',
    coordDark: '#d4e4f7',
  },
  {
    name: 'Tournament Green',
    light: '#eeeed2',
    dark: '#769656',
    selectedLight: '#baca44',
    selectedDark: '#8ca53b',
    lastMoveLight: '#ced26b',
    lastMoveDark: '#6d9040',
    coordLight: '#769656',
    coordDark: '#eeeed2',
  },
];

const THEME_STORAGE_KEY = 'chess-app-board-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  currentBoardTheme = signal<BoardTheme>(this.loadTheme());

  applyBoardTheme(theme: BoardTheme): void {
    this.currentBoardTheme.set(theme);
    this.saveTheme(theme);
    this.setCssVariables(theme);
  }

  initTheme(): void {
    this.setCssVariables(this.currentBoardTheme());
  }

  private setCssVariables(theme: BoardTheme): void {
    const root = document.documentElement.style;
    root.setProperty('--board-light', theme.light);
    root.setProperty('--board-dark', theme.dark);
    root.setProperty('--board-selected-light', theme.selectedLight);
    root.setProperty('--board-selected-dark', theme.selectedDark);
    root.setProperty('--board-lastmove-light', theme.lastMoveLight);
    root.setProperty('--board-lastmove-dark', theme.lastMoveDark);
    root.setProperty('--board-coord-light', theme.coordLight);
    root.setProperty('--board-coord-dark', theme.coordDark);
  }

  private loadTheme(): BoardTheme {
    try {
      const data = localStorage.getItem(THEME_STORAGE_KEY);
      if (data) {
        const saved = JSON.parse(data);
        const match = BOARD_THEMES.find((t) => t.name === saved.name);
        if (match) return match;
      }
    } catch {}
    return BOARD_THEMES[0];
  }

  private saveTheme(theme: BoardTheme): void {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ name: theme.name }));
  }
}
