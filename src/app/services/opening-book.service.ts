import { Injectable, signal, computed } from '@angular/core';
import { OPENINGS_BOOK, Opening } from '../data/openings-book';

@Injectable({ providedIn: 'root' })
export class OpeningBookService {
  private _currentMoves = signal<string[]>([]);
  private _matchedOpening = signal<Opening | null>(null);

  readonly matchedOpening = this._matchedOpening.asReadonly();

  readonly openingName = computed(() => {
    const opening = this._matchedOpening();
    return opening ? opening.name : null;
  });

  readonly ecoCode = computed(() => {
    const opening = this._matchedOpening();
    return opening ? opening.eco : null;
  });

  updateMoves(sanMoves: string[]): void {
    this._currentMoves.set(sanMoves);
    this._matchedOpening.set(this.findOpening(sanMoves));
  }

  reset(): void {
    this._currentMoves.set([]);
    this._matchedOpening.set(null);
  }

  private findOpening(moves: string[]): Opening | null {
    if (moves.length === 0) return null;

    const moveLine = moves.join(' ');
    let bestMatch: Opening | null = null;
    let bestLength = 0;

    for (const opening of OPENINGS_BOOK) {
      // Check if the opening move sequence is a prefix of (or equal to) the current game
      if (moveLine === opening.moves || moveLine.startsWith(opening.moves + ' ')) {
        if (opening.moves.length > bestLength) {
          bestLength = opening.moves.length;
          bestMatch = opening;
        }
      }
    }

    return bestMatch;
  }
}
