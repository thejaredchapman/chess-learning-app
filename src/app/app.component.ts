import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemePickerComponent],
  template: `
    <nav class="navbar">
      <a class="nav-brand" routerLink="/">
        <div class="brand-icon-wrap">
          <span class="brand-icon">♔</span>
          <span class="brand-icon-glow">♔</span>
        </div>
        <span class="brand-text">CHESS NEXUS</span>
      </a>
      <div class="nav-right">
        <div class="nav-links">
          <a routerLink="/learn" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">📚</span>
            <span>Learn</span>
          </a>
          <a routerLink="/play" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">⚔️</span>
            <span>Play</span>
          </a>
          <a routerLink="/puzzles" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">🧩</span>
            <span>Puzzles</span>
          </a>
        </div>
        <app-theme-picker />
      </div>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--bg-primary);
      position: relative;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      height: 64px;
      background: rgba(5, 5, 16, 0.85);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid rgba(0, 212, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--neon-blue), var(--neon-purple), var(--neon-pink), var(--neon-blue), transparent);
      background-size: 300% 100%;
      animation: gradient-slide 4s linear infinite;
    }
    @keyframes gradient-slide {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .brand-icon-wrap {
      position: relative;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-icon {
      font-size: 26px;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
    }
    .brand-icon-glow {
      position: absolute;
      font-size: 26px;
      filter: blur(8px);
      opacity: 0.4;
      color: var(--neon-blue);
      animation: pulse-icon 2s ease-in-out infinite;
    }
    @keyframes pulse-icon {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.1); }
    }
    .brand-text {
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 3px;
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: none;
    }
    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .nav-links {
      display: flex;
      gap: 6px;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-secondary);
      transition: all var(--transition-normal);
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
    }
    .nav-icon { font-size: 16px; }
    .nav-link::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(191, 90, 242, 0.1));
      opacity: 0;
      transition: opacity var(--transition-fast);
    }
    .nav-link:hover {
      color: var(--text-primary);
      border-color: rgba(0, 212, 255, 0.2);
    }
    .nav-link:hover::before { opacity: 1; }
    .nav-link.active {
      color: var(--neon-blue);
      background: rgba(0, 212, 255, 0.1);
      border-color: rgba(0, 212, 255, 0.3);
      box-shadow: 0 0 15px rgba(0, 212, 255, 0.15), inset 0 0 15px rgba(0, 212, 255, 0.05);
    }
    main {
      padding-bottom: 40px;
      position: relative;
      z-index: 1;
    }
    @media (max-width: 600px) {
      .navbar { padding: 0 12px; height: 56px; }
      .brand-text { display: none; }
      .nav-link { padding: 6px 12px; font-size: 13px; }
      .nav-link span:last-child { display: none; }
      .nav-icon { font-size: 20px; }
    }
  `],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}
