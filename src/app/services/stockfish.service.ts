import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockfishService {
  private worker: Worker | null = null;
  private messageSubject = new Subject<string>();
  private _isReady = signal(false);
  private _isThinking = signal(false);

  readonly isReady = this._isReady.asReadonly();
  readonly isThinking = this._isThinking.asReadonly();

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
            // Resolve anyway so the app doesn't hang - engine just won't be available
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

  private sendCommand(command: string): void {
    this.worker?.postMessage(command);
  }
}
