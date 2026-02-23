import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home">
      <section class="hero">
        <h1>Learn Chess</h1>
        <p>Master the game of kings with interactive lessons, practice games, and tactical puzzles.</p>
      </section>

      <section class="cards">
        <div class="nav-card" (click)="navigate('/learn')">
          <div class="card-icon">📚</div>
          <h2>Learn</h2>
          <p>Interactive lessons on pieces, rules, openings, and strategy</p>
        </div>

        <div class="nav-card" (click)="navigate('/play')">
          <div class="card-icon">♟</div>
          <h2>Play</h2>
          <p>Play against a friend or challenge the computer at various difficulty levels</p>
        </div>

        <div class="nav-card" (click)="navigate('/puzzles')">
          <div class="card-icon">🧩</div>
          <h2>Puzzles</h2>
          <p>Sharpen your tactics with mate-in-1, mate-in-2, and tactical puzzles</p>
        </div>
      </section>

      <section class="features">
        <h2>Why Learn Here?</h2>
        <div class="feature-grid">
          <div class="feature">
            <strong>Interactive Board</strong>
            <p>Click to move pieces with legal move hints</p>
          </div>
          <div class="feature">
            <strong>Step-by-Step Lessons</strong>
            <p>Learn at your own pace with guided tutorials</p>
          </div>
          <div class="feature">
            <strong>Play vs Computer</strong>
            <p>Powered by Stockfish with adjustable difficulty</p>
          </div>
          <div class="feature">
            <strong>Track Progress</strong>
            <p>Your progress is saved automatically</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home { max-width: 900px; margin: 0 auto; padding: 20px; }
    .hero {
      text-align: center;
      padding: 48px 20px;
    }
    .hero h1 {
      font-size: 42px;
      color: #1a1a1a;
      margin: 0 0 12px;
    }
    .hero p {
      font-size: 18px;
      color: #666;
      max-width: 500px;
      margin: 0 auto;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 48px;
    }
    .nav-card {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 32px 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-card:hover {
      border-color: #1976d2;
      box-shadow: 0 4px 12px rgba(25, 118, 210, 0.12);
      transform: translateY(-2px);
    }
    .card-icon { font-size: 48px; margin-bottom: 12px; }
    .nav-card h2 { margin: 0 0 8px; color: #333; font-size: 22px; }
    .nav-card p { margin: 0; color: #777; font-size: 14px; }
    .features {
      background: #f5f5f5;
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 32px;
    }
    .features h2 {
      text-align: center;
      margin: 0 0 24px;
      color: #333;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
    }
    .feature {
      text-align: center;
    }
    .feature strong { color: #333; font-size: 15px; }
    .feature p { color: #777; font-size: 13px; margin: 4px 0 0; }
  `],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
