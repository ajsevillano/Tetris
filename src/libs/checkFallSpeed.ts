import { SCORE_CONFIG, SPEED_CONFIG } from '../const';
import { state } from '../globalStates';

export default function shouldIncreaseFallSpeed() {
  if (
    state.totalLinesRemoved >=
    (state.level + 1) * SCORE_CONFIG.LINES_NEXT_LEVEL
  ) {
    state.level++;

    // Cap fall speed at 20
    if (state.fallSpeed > 50) {
      state.fallSpeed -= SPEED_CONFIG.SPEED_INCREMENT_PER_LEVEL;
    }
  }
}
