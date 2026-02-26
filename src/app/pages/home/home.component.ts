import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ParticleBackgroundComponent } from '../../components/particle-background/particle-background.component';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ParticleBackgroundComponent],
  template: `
    <div class="home">
      <app-particle-background />

      <!-- Animated grid lines -->
      <div class="grid-overlay"></div>

      <section class="hero">
        <div class="hero-badge">THE ULTIMATE CHESS TRAINING PLATFORM</div>
        <h1>
          <span class="hero-line-1">MASTER THE</span>
          <span class="hero-line-2">GAME OF KINGS</span>
        </h1>
        <p class="hero-sub">Interactive lessons, AI-powered gameplay, and tactical puzzles to transform your chess from beginner to brilliance.</p>
        <div class="hero-cta">
          <button class="cta-btn primary" (click)="navigate('/play')">Start Playing</button>
          <button class="cta-btn secondary" (click)="navigate('/learn')">Begin Learning</button>
        </div>
      </section>

      <!-- Stats bar -->
      <section class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ totalLessons() }}</span>
          <span class="stat-label">Lessons</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ totalPuzzles() }}</span>
          <span class="stat-label">Puzzles</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">4</span>
          <span class="stat-label">AI Levels</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ completedLessons() }}</span>
          <span class="stat-label">Completed</span>
        </div>
      </section>

      <!-- Main navigation cards -->
      <section class="cards">
        <div class="nav-card card-learn" (click)="navigate('/learn')">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-icon-wrap">
              <span class="card-icon">📚</span>
              <span class="card-icon-bg">📚</span>
            </div>
            <h2>LEARN</h2>
            <p>Interactive step-by-step lessons covering pieces, rules, openings, strategy & endgames</p>
            <div class="card-meta">
              <span class="meta-tag">{{ totalLessons() }} Lessons</span>
              <span class="meta-tag">5 Categories</span>
            </div>
            <div class="card-progress">
              <div class="card-progress-fill" [style.width.%]="lessonPercent()"></div>
            </div>
            <span class="card-arrow">→</span>
          </div>
        </div>

        <div class="nav-card card-play" (click)="navigate('/play')">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-icon-wrap">
              <span class="card-icon">⚔️</span>
              <span class="card-icon-bg">⚔️</span>
            </div>
            <h2>PLAY</h2>
            <p>Challenge the Stockfish AI engine or play against a friend locally with full analysis</p>
            <div class="card-meta">
              <span class="meta-tag">vs AI</span>
              <span class="meta-tag">vs Human</span>
              <span class="meta-tag">4 Difficulties</span>
            </div>
            <span class="card-arrow">→</span>
          </div>
        </div>

        <div class="nav-card card-puzzles" (click)="navigate('/puzzles')">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-icon-wrap">
              <span class="card-icon">🧩</span>
              <span class="card-icon-bg">🧩</span>
            </div>
            <h2>PUZZLES</h2>
            <p>Sharpen your tactical vision with mate-in-1, mate-in-2, and advanced tactical challenges</p>
            <div class="card-meta">
              <span class="meta-tag">{{ totalPuzzles() }} Puzzles</span>
              <span class="meta-tag">{{ solvedPuzzles() }} Solved</span>
            </div>
            <div class="card-progress">
              <div class="card-progress-fill puzzle-fill" [style.width.%]="puzzlePercent()"></div>
            </div>
            <span class="card-arrow">→</span>
          </div>
        </div>
      </section>

      <!-- Features grid -->
      <section class="features">
        <h2 class="section-title">
          <span class="title-accent">FEATURES</span>
          Everything You Need
        </h2>
        <div class="feature-grid">
          <div class="feature-card glass-panel">
            <div class="feature-icon">🎯</div>
            <strong>Interactive Board</strong>
            <p>Click to move with legal move hints, piece highlighting, and smooth animations</p>
          </div>
          <div class="feature-card glass-panel">
            <div class="feature-icon">🧠</div>
            <strong>AI Opponent</strong>
            <p>Powered by Stockfish 18 with 4 difficulty levels from Beginner to Master</p>
          </div>
          <div class="feature-card glass-panel">
            <div class="feature-icon">📊</div>
            <strong>Live Analysis</strong>
            <p>Real-time position evaluation bar and opening book identification</p>
          </div>
          <div class="feature-card glass-panel">
            <div class="feature-icon">🎓</div>
            <strong>Guided Lessons</strong>
            <p>Step-by-step tutorials with interactive board exercises</p>
          </div>
          <div class="feature-card glass-panel">
            <div class="feature-icon">⚡</div>
            <strong>Tactical Puzzles</strong>
            <p>80+ carefully curated puzzles across easy, medium, and hard difficulties</p>
          </div>
          <div class="feature-card glass-panel">
            <div class="feature-icon">💾</div>
            <strong>Progress Tracking</strong>
            <p>Your lesson progress and puzzle solves are saved automatically</p>
          </div>
          <div class="feature-card glass-panel">
            <div class="feature-icon">🎨</div>
            <strong>Board Themes</strong>
            <p>4 beautiful board themes to customize your playing experience</p>
          </div>
          <div class="feature-card glass-panel">
            <div class="feature-icon">🔊</div>
            <strong>Sound Effects</strong>
            <p>Audio feedback for moves, captures, checks, and game events</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      max-width: 1100px;
      margin: 0 auto;
      padding: 20px;
      position: relative;
    }

    /* Grid overlay */
    .grid-overlay {
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 0;
    }

    /* Hero Section */
    .hero {
      text-align: center;
      padding: 60px 20px 40px;
      position: relative;
      z-index: 1;
    }
    .hero-badge {
      display: inline-block;
      padding: 6px 20px;
      border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: var(--radius-pill);
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2px;
      color: var(--neon-blue);
      background: rgba(0, 212, 255, 0.06);
      margin-bottom: 24px;
      animation: pulse-glow 3s ease-in-out infinite;
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 5px rgba(0, 212, 255, 0.2); }
      50% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
    }
    .hero h1 {
      margin: 0 0 20px;
      line-height: 1.1;
    }
    .hero-line-1 {
      display: block;
      font-family: var(--font-display);
      font-size: clamp(32px, 6vw, 56px);
      font-weight: 800;
      letter-spacing: 4px;
      color: var(--text-primary);
    }
    .hero-line-2 {
      display: block;
      font-family: var(--font-display);
      font-size: clamp(36px, 7vw, 64px);
      font-weight: 900;
      letter-spacing: 4px;
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple), var(--neon-pink));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.3));
    }
    .hero-sub {
      font-size: 18px;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }
    .hero-cta {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .cta-btn {
      padding: 14px 36px;
      border: none;
      border-radius: var(--radius-pill);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all var(--transition-normal);
      letter-spacing: 1px;
      text-transform: uppercase;
      font-family: var(--font-display);
    }
    .cta-btn.primary {
      background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
      color: #fff;
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    }
    .cta-btn.primary:hover {
      box-shadow: 0 0 40px rgba(0, 212, 255, 0.5), 0 0 80px rgba(0, 212, 255, 0.2);
      transform: translateY(-2px);
    }
    .cta-btn.secondary {
      background: transparent;
      color: var(--neon-blue);
      border: 1px solid rgba(0, 212, 255, 0.4);
    }
    .cta-btn.secondary:hover {
      background: rgba(0, 212, 255, 0.1);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
      transform: translateY(-2px);
    }

    /* Stats Bar */
    .stats-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 20px;
      background: var(--bg-glass);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: var(--radius-lg);
      margin-bottom: 48px;
      position: relative;
      z-index: 1;
      flex-wrap: wrap;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 80px;
    }
    .stat-number {
      font-family: var(--font-display);
      font-size: 28px;
      font-weight: 800;
      color: var(--neon-blue);
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    }
    .stat-label {
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }
    .stat-divider {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, transparent, rgba(0, 212, 255, 0.3), transparent);
    }

    /* Navigation Cards */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 64px;
      position: relative;
      z-index: 1;
    }
    .nav-card {
      position: relative;
      border-radius: var(--radius-lg);
      cursor: pointer;
      overflow: hidden;
      background: var(--bg-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-glass);
      transition: all var(--transition-normal);
    }
    .nav-card:hover {
      transform: translateY(-6px);
      border-color: var(--neon-blue);
    }
    .card-glow {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity var(--transition-normal);
      pointer-events: none;
    }
    .card-learn .card-glow { background: radial-gradient(ellipse at center, rgba(0, 212, 255, 0.1), transparent 70%); }
    .card-play .card-glow { background: radial-gradient(ellipse at center, rgba(191, 90, 242, 0.1), transparent 70%); }
    .card-puzzles .card-glow { background: radial-gradient(ellipse at center, rgba(255, 45, 120, 0.1), transparent 70%); }
    .nav-card:hover .card-glow { opacity: 1; }

    .card-learn:hover { border-color: var(--neon-blue); box-shadow: 0 0 30px rgba(0, 212, 255, 0.15); }
    .card-play:hover { border-color: var(--neon-purple); box-shadow: 0 0 30px rgba(191, 90, 242, 0.15); }
    .card-puzzles:hover { border-color: var(--neon-pink); box-shadow: 0 0 30px rgba(255, 45, 120, 0.15); }

    .card-content {
      position: relative;
      padding: 32px 28px;
      z-index: 1;
    }
    .card-icon-wrap {
      position: relative;
      display: inline-block;
      margin-bottom: 16px;
    }
    .card-icon {
      font-size: 48px;
      position: relative;
      z-index: 1;
    }
    .card-icon-bg {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 48px;
      filter: blur(12px);
      opacity: 0.3;
    }
    .nav-card h2 {
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 3px;
      margin: 0 0 10px;
      color: var(--text-primary);
    }
    .nav-card p {
      margin: 0 0 16px;
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    .card-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .meta-tag {
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      font-size: 11px;
      font-weight: 600;
      border: 1px solid rgba(0, 212, 255, 0.2);
      color: var(--neon-blue);
      background: rgba(0, 212, 255, 0.06);
    }
    .card-play .meta-tag {
      border-color: rgba(191, 90, 242, 0.2);
      color: var(--neon-purple);
      background: rgba(191, 90, 242, 0.06);
    }
    .card-puzzles .meta-tag {
      border-color: rgba(255, 45, 120, 0.2);
      color: var(--neon-pink);
      background: rgba(255, 45, 120, 0.06);
    }
    .card-progress {
      height: 4px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .card-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
      border-radius: 2px;
      transition: width 0.5s;
      box-shadow: 0 0 6px rgba(0, 212, 255, 0.4);
    }
    .puzzle-fill {
      background: linear-gradient(90deg, var(--neon-pink), var(--neon-purple));
      box-shadow: 0 0 6px rgba(255, 45, 120, 0.4);
    }
    .card-arrow {
      position: absolute;
      top: 28px;
      right: 28px;
      font-size: 24px;
      color: var(--text-muted);
      transition: all var(--transition-normal);
    }
    .nav-card:hover .card-arrow {
      color: var(--neon-blue);
      transform: translateX(4px);
    }

    /* Features Section */
    .features {
      position: relative;
      z-index: 1;
      margin-bottom: 48px;
    }
    .section-title {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 32px;
      color: var(--text-primary);
    }
    .title-accent {
      display: block;
      font-family: var(--font-display);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 4px;
      color: var(--neon-blue);
      margin-bottom: 8px;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 16px;
    }
    .feature-card {
      padding: 24px;
      text-align: center;
      transition: all var(--transition-normal);
    }
    .feature-card:hover {
      border-color: rgba(0, 212, 255, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
    }
    .feature-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }
    .feature-card strong {
      display: block;
      font-size: 15px;
      color: var(--text-primary);
      margin-bottom: 6px;
    }
    .feature-card p {
      margin: 0;
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .hero { padding: 40px 16px 32px; }
      .stats-bar { gap: 16px; padding: 16px; }
      .stat-number { font-size: 22px; }
      .cards { grid-template-columns: 1fr; }
    }
  `],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private lessonService: LessonService,
  ) {}

  totalLessons = computed(() => this.lessonService.getLessons().length);
  totalPuzzles = computed(() => this.lessonService.getPuzzles().length);
  solvedPuzzles = computed(() => this.lessonService.getPuzzleStats().solved);

  completedLessons = computed(() => {
    const lessons = this.lessonService.getLessons();
    return lessons.filter(l => {
      const p = this.lessonService.getLessonProgress(l.id);
      return p?.completed;
    }).length;
  });

  lessonPercent = computed(() => {
    const total = this.totalLessons();
    return total > 0 ? (this.completedLessons() / total) * 100 : 0;
  });

  puzzlePercent = computed(() => {
    const stats = this.lessonService.getPuzzleStats();
    return stats.total > 0 ? (stats.solved / stats.total) * 100 : 0;
  });

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
