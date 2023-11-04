import { states } from '../globalStates';
import { SCORE_CONFIG } from '../const';

export default function updateScore(linesRemoved: any) {
  const { ONE_ROW, TWO_ROWS, THREE_ROWS, FOUR_ROWS } = SCORE_CONFIG;
  const SCORES = [0, ONE_ROW, TWO_ROWS, THREE_ROWS, FOUR_ROWS];
  let score = states.getScore();
  let setScore = states.setScore;

  // Update score
  if (linesRemoved >= 1 && linesRemoved <= 4) {
    setScore((score += SCORES[linesRemoved]));
  }
  // Update high score
  updateHighScore(score);
}

function updateHighScore(score: number) {
  const hiScoreElement: HTMLElement | null =
    document.querySelector('.hi-score-box-text');
  const highScore = localStorage.getItem('hi-score');
  if (highScore === null || score > parseInt(highScore)) {
    localStorage.setItem('hi-score', score.toString());
    hiScoreElement!.innerText = score.toString();
  }
}
