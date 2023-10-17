import { CANVAS_CONFIG } from '../const';

export default function checkAndRemoveRows(board: any, score: any) {
  const fullRows = [];
  let linesRemoved = 0;
  let updatedScore = score;

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

  if (linesRemoved === 1) {
    updatedScore += 10;
  } else if (linesRemoved === 2) {
    updatedScore += 30;
  } else if (linesRemoved === 3) {
    updatedScore += 50;
  } else if (linesRemoved === 4) {
    updatedScore += 80;
  }

  return updatedScore;
}
