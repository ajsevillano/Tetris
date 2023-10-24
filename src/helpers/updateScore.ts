import { state } from '../globalStates';
import { SCORE_CONFIG } from '../const';

export default function updateScore(linesRemoved: any) {
  switch (linesRemoved) {
    case 1:
      state.score += SCORE_CONFIG.ONE_ROW;
      break;
    case 2:
      state.score += SCORE_CONFIG.TWO_ROWS;
      break;
    case 3:
      state.score += SCORE_CONFIG.THREE_ROWS;
      break;
    case 4:
      state.score += SCORE_CONFIG.FOUR_ROWS;
      break;
    default:
      break;
  }
}
