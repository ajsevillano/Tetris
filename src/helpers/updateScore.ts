import { states } from '../globalStates';
import { SCORE_CONFIG } from '../const';

export default function updateScore(linesRemoved: any) {
  let score = states.getScore();

  switch (linesRemoved) {
    case 1:
      states.setScore((score += SCORE_CONFIG.ONE_ROW));
      break;
    case 2:
      states.setScore((score += SCORE_CONFIG.TWO_ROWS));
      break;
    case 3:
      states.setScore((score += SCORE_CONFIG.THREE_ROWS));
      break;
    case 4:
      states.setScore((score += SCORE_CONFIG.FOUR_ROWS));
      break;
    default:
      break;
  }
}
