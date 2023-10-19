import { SCORE_CONFIG, SPEED_CONFIG } from '../const';

export default function shouldIncreaseFallSpeed(
  level: number,
  fallSpeed: number,
  totalLinesRemoved: number,
) {
  let updatedLevel = level;
  let updatedFallSpeed = fallSpeed;

  if (totalLinesRemoved >= (level + 1) * SCORE_CONFIG.LINES_NEXT_LEVEL) {
    updatedLevel++;

    // Cap fall speed at 20
    if (fallSpeed > 50) {
      updatedFallSpeed -= SPEED_CONFIG.SPEED_INCREMENT_PER_LEVEL;
    }
  }

  return { level: updatedLevel, fallSpeed: updatedFallSpeed };
}
