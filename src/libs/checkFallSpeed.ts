import { SCORE_CONFIG, SPEED_CONFIG } from '../const';
import { states } from '../globalStates';

export default function shouldIncreaseFallSpeed() {
  let level = states.getLevel();
  let fallSpeed = states.getFallSpeed();
  let totalLinesRemoved = states.getTotalLinesRemoved();

  const { LINES_NEXT_LEVEL } = SCORE_CONFIG;
  const { SPEED_INCREMENT_PER_LEVEL } = SPEED_CONFIG;

  if (totalLinesRemoved >= (level + 1) * LINES_NEXT_LEVEL) {
    states.setLevel(level + 1);
    // Create a cap for the fall speed if is smaller than 50
    if (fallSpeed <= 50) {
      states.setFallSpeed(50);
      return;
    }
    states.setFallSpeed((fallSpeed -= SPEED_INCREMENT_PER_LEVEL));
  }
}
