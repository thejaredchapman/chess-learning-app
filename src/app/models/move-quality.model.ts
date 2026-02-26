export type MoveQuality = 'brilliant' | 'great' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';

export interface MoveQualityInfo {
  quality: MoveQuality;
  label: string;
  color: string;
  symbol: string;
}

export const MOVE_QUALITY_CONFIG: Record<MoveQuality, MoveQualityInfo> = {
  brilliant: { quality: 'brilliant', label: 'Brilliant', color: '#06b6d4', symbol: '!!' },
  great: { quality: 'great', label: 'Great', color: '#6366f1', symbol: '!' },
  good: { quality: 'good', label: 'Good', color: '#22c55e', symbol: '' },
  inaccuracy: { quality: 'inaccuracy', label: 'Inaccuracy', color: '#eab308', symbol: '?!' },
  mistake: { quality: 'mistake', label: 'Mistake', color: '#f97316', symbol: '?' },
  blunder: { quality: 'blunder', label: 'Blunder', color: '#ef4444', symbol: '??' },
};

export function classifyMoveQuality(evalBefore: number, evalAfter: number, isWhiteMove: boolean): MoveQuality {
  // evalBefore/evalAfter in centipawns from white's perspective
  const delta = isWhiteMove ? evalAfter - evalBefore : evalBefore - evalAfter;

  if (delta > 50) return 'brilliant';
  if (delta > 10) return 'great';
  if (delta >= -10) return 'good';
  if (delta >= -50) return 'inaccuracy';
  if (delta >= -150) return 'mistake';
  return 'blunder';
}
