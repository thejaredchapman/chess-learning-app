import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

interface Confetti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  gravity: number;
}

const CONFETTI_COLORS = ['#00d4ff', '#bf5af2', '#ff2d78', '#39ff14', '#ffd700', '#6fffe9', '#ff6b6b'];

@Component({
  selector: 'app-celebration',
  standalone: true,
  template: `<canvas #canvas class="celebration-canvas"></canvas>`,
  styles: [`
    :host {
      display: none;
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
    }
    :host(.active) {
      display: block;
      animation: flash-in 0.2s ease-out;
    }
    .celebration-canvas { width: 100%; height: 100%; display: block; }
    @keyframes flash-in {
      0% { background: rgba(0, 212, 255, 0.1); }
      100% { background: transparent; }
    }
  `],
})
export class CelebrationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private confetti: Confetti[] = [];
  private animationId = 0;
  private active = false;
  private timeoutId: any = null;
  private hostEl!: HTMLElement;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.hostEl = canvas.closest('app-celebration')! as HTMLElement;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  trigger(): void {
    if (this.active) return;

    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.confetti = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
      this.confetti.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 5 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.4,
        width: 6 + Math.random() * 10,
        height: 4 + Math.random() * 6,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        gravity: 0.07 + Math.random() * 0.05,
      });
    }

    this.active = true;
    this.hostEl.classList.add('active');

    this.ngZone.runOutsideAngular(() => this.animate());

    this.timeoutId = setTimeout(() => {
      this.active = false;
      cancelAnimationFrame(this.animationId);
      this.hostEl.classList.remove('active');
    }, 2500);
  }

  private animate = (): void => {
    if (!this.active) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const c of this.confetti) {
      c.vy += c.gravity;
      c.vx *= 0.99;
      c.x += c.vx;
      c.y += c.vy;
      c.rotation += c.rotationSpeed;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation);
      ctx.fillStyle = c.color;
      ctx.shadowColor = c.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
      ctx.restore();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };
}
