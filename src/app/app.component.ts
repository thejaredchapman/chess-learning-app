import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <a class="nav-brand" routerLink="/">♔ Chess Learner</a>
      <div class="nav-links">
        <a routerLink="/learn" routerLinkActive="active">Learn</a>
        <a routerLink="/play" routerLinkActive="active">Play</a>
        <a routerLink="/puzzles" routerLinkActive="active">Puzzles</a>
      </div>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: #fff; }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: 56px;
      border-bottom: 1px solid #e0e0e0;
      background: #fff;
    }
    .nav-brand {
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      gap: 8px;
    }
    .nav-links a {
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      color: #555;
      transition: all 0.15s;
    }
    .nav-links a:hover { background: #f5f5f5; color: #333; }
    .nav-links a.active { background: #e3f2fd; color: #1976d2; }
    main { padding-bottom: 40px; }
  `],
})
export class AppComponent {}
