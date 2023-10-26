import { SCORE_CONFIG, SPEED_CONFIG } from '../const';
import { states } from '../globalStates';

export default function shouldIncreaseFallSpeed() {
  let level = states.getLevel();
  let fallSpeed = states.getFallSpeed();

  if (
    states.getTotalLinesRemoved() >=
    (level + 1) * SCORE_CONFIG.LINES_NEXT_LEVEL
  ) {
    states.setLevel(level + 1);

    // Cap fall speed at 20
    if (states.getFallSpeed() > 50) {
      states.setFallSpeed(
        (fallSpeed -= SPEED_CONFIG.SPEED_INCREMENT_PER_LEVEL),
      );
    }
  }
}
