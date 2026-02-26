import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface EvalScore {
  type: 'cp' | 'mate';
  value: number; // centipawns or moves to mate (positive = white advantage)
}

@Injectable({ providedIn: 'root' })
export class StockfishService {
  private worker: Worker | null = null;
  private messageSubject = new Subject<string>();
  private _isReady = signal(false);
  private _isThinking = signal(false);
  private _evaluation = signal<EvalScore>({ type: 'cp', value: 0 });

  readonly isReady = this._isReady.asReadonly();
  readonly isThinking = this._isThinking.asReadonly();
  readonly evaluation = this._evaluation.asReadonly();

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.worker = new Worker('assets/stockfish/stockfish.js');
        this.worker.onmessage = (event) => {
          const message = event.data;
          this.messageSubject.next(message);
          if (message === 'readyok') {
            this._isReady.set(true);
          }
          this.parseEvaluation(message);
        };
        this.worker.onerror = (err) => {
          console.error('Stockfish worker error:', err);
          reject(err);
        };
        this.sendCommand('uci');
        this.sendCommand('isready');

        const sub = this.messageSubject.subscribe((msg) => {
          if (msg === 'readyok') {
            sub.unsubscribe();
            resolve();
          }
        });

        setTimeout(() => {
          sub.unsubscribe();
          if (!this._isReady()) {
            console.warn('Stockfish initialization timed out');
            resolve();
          }
        }, 10000);
      } catch (e) {
        console.warn('Stockfish not available:', e);
        resolve();
      }
    });
  }

  getBestMove(fen: string, depth: number): Observable<string> {
    return new Observable((observer) => {
      if (!this.worker || !this._isReady()) {
        observer.error('Stockfish not ready');
        return;
      }

      this._isThinking.set(true);
      this.sendCommand(`position fen ${fen}`);
      this.sendCommand(`go depth ${depth}`);

      const sub = this.messageSubject.subscribe((msg) => {
        if (msg.startsWith('bestmove')) {
          const parts = msg.split(' ');
          const bestMove = parts[1];
          this._isThinking.set(false);
          observer.next(bestMove);
          observer.complete();
          sub.unsubscribe();
        }
      });
    });
  }

  analyzePosition(fen: string, depth: number): Observable<EvalScore> {
    return new Observable((observer) => {
      if (!this.worker || !this._isReady()) {
        observer.error('Stockfish not ready');
        return;
      }

      this.sendCommand(`position fen ${fen}`);
      this.sendCommand(`go depth ${depth}`);

      const sub = this.messageSubject.subscribe((msg) => {
        if (msg.startsWith('bestmove')) {
          observer.next(this._evaluation());
          observer.complete();
          sub.unsubscribe();
        }
      });
    });
  }

  stop(): void {
    if (this.worker) {
      this.sendCommand('stop');
      this._isThinking.set(false);
    }
  }

  destroy(): void {
    if (this.worker) {
      this.sendCommand('quit');
      this.worker.terminate();
      this.worker = null;
      this._isReady.set(false);
    }
  }

  getFen(): string | null {
    return null;
  }

  private parseEvaluation(message: string): void {
    if (!message.startsWith('info') || !message.includes('score')) return;

    // Only parse the deepest line (seldepth present and it's the main line pv)
    const depthMatch = message.match(/\bdepth (\d+)/);
    if (!depthMatch) return;

    const mateMatch = message.match(/score mate (-?\d+)/);
    if (mateMatch) {
      this._evaluation.set({ type: 'mate', value: parseInt(mateMatch[1], 10) });
      return;
    }

    const cpMatch = message.match(/score cp (-?\d+)/);
    if (cpMatch) {
      this._evaluation.set({ type: 'cp', value: parseInt(cpMatch[1], 10) });
    }
  }

  private sendCommand(command: string): void {
    this.worker?.postMessage(command);
  }
}
