import { CANVAS_CONFIG, SCORE_CONFIG } from '../const';
import { globalVariables } from '../globalStates';

export default function checkAndRemoveRows(board: any) {
  const fullRows = [];
  let linesRemoved = 0;

  globalVariables.score;

  for (let y = 0; y < CANVAS_CONFIG.MAIN.BOARD_HEIGHT; y++) {
    if (board[y].every((value: any) => value !== 0)) {
      fullRows.push(y);
    }
  }

  // Remove full rows and add new empty ones at the top
  fullRows.forEach((y) => {
    board.splice(y, 1);
    board.unshift(Array(CANVAS_CONFIG.MAIN.BOARD_WIDTH).fill(0));
    linesRemoved++;
  });

  globalVariables.totalLinesRemoved += linesRemoved;

  switch (linesRemoved) {
    case 1:
      globalVariables.score += SCORE_CONFIG.ONE_ROW;
      break;
    case 2:
      globalVariables.score += SCORE_CONFIG.TWO_ROWS;
      break;
    case 3:
      globalVariables.score += SCORE_CONFIG.THREE_ROWS;
      break;
    case 4:
      globalVariables.score += SCORE_CONFIG.FOUR_ROWS;
      break;
    default:
      break;
  }
}
