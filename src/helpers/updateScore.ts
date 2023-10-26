import { states } from '../globalStates';
import { SCORE_CONFIG } from '../const';

export default function updateScore(linesRemoved: any) {
  const { ONE_ROW, TWO_ROWS, THREE_ROWS, FOUR_ROWS } = SCORE_CONFIG;
  const SCORES = [0, ONE_ROW, TWO_ROWS, THREE_ROWS, FOUR_ROWS];
  let score = states.getScore();
  let setScore = states.setScore;

  if (linesRemoved >= 1 && linesRemoved <= 4) {
    setScore((score += SCORES[linesRemoved]));
  }
}
