import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  symbol: string;
}

const CHESS_SYMBOLS = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];

@Component({
  selector: 'app-particle-background',
  standalone: true,
  template: `<canvas #canvas class="particle-canvas"></canvas>`,
  styles: [`
    :host { display: block; position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
    .particle-canvas { width: 100%; height: 100%; display: block; opacity: 0.8; }
  `],
})
export class ParticleBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId = 0;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initParticles();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas.parentElement!);

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.resizeObserver?.disconnect();
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    const count = 40;
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.004,
        size: 35 + Math.random() * 45,
        opacity: 0.02 + Math.random() * 0.04,
        symbol: CHESS_SYMBOLS[Math.floor(Math.random() * CHESS_SYMBOLS.length)],
      });
    }
  }

  private animate = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      if (p.x < -p.size) p.x = canvas.width + p.size;
      if (p.x > canvas.width + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = canvas.height + p.size;
      if (p.y > canvas.height + p.size) p.y = -p.size;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      ctx.shadowColor = `rgba(0, 212, 255, ${p.opacity * 2})`;
      ctx.shadowBlur = 10;
      ctx.fillText(p.symbol, 0, 0);
      ctx.restore();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };
}
