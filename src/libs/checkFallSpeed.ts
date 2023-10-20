import { SCORE_CONFIG, SPEED_CONFIG } from '../const';
import { globalVariables } from '../globalStates';

export default function shouldIncreaseFallSpeed() {
  if (
    globalVariables.totalLinesRemoved >=
    (globalVariables.level + 1) * SCORE_CONFIG.LINES_NEXT_LEVEL
  ) {
    globalVariables.level++;

    // Cap fall speed at 20
    if (globalVariables.fallSpeed > 50) {
      globalVariables.fallSpeed -= SPEED_CONFIG.SPEED_INCREMENT_PER_LEVEL;
    }
  }
}
