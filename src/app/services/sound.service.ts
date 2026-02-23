import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  playMove(): void {
    this.playTone(400, 0.08, 'sine');
  }

  playCapture(): void {
    this.playTone(300, 0.12, 'square');
  }

  playCheck(): void {
    this.playTone(600, 0.15, 'sawtooth');
    setTimeout(() => this.playTone(800, 0.1, 'sawtooth'), 100);
  }

  playGameOver(): void {
    this.playTone(500, 0.15, 'sine');
    setTimeout(() => this.playTone(400, 0.15, 'sine'), 150);
    setTimeout(() => this.playTone(300, 0.2, 'sine'), 300);
  }

  playSuccess(): void {
    this.playTone(523, 0.1, 'sine');
    setTimeout(() => this.playTone(659, 0.1, 'sine'), 100);
    setTimeout(() => this.playTone(784, 0.15, 'sine'), 200);
  }

  playError(): void {
    this.playTone(200, 0.15, 'square');
  }

  private playTone(frequency: number, duration: number, type: OscillatorType): void {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }
}
