import { CANVAS_CONFIG } from '../const';

export default function checkAndRemoveRows(board: any, score: any) {
  const fullRows = [];
  let updatedScore = score;

  for (let y = 0; y < CANVAS_CONFIG.BOARD_HEIGHT; y++) {
    if (board[y].every((value: any) => value !== 0)) {
      fullRows.push(y);
    }
  }

  // Remove full rows and add new empty ones at the top
  fullRows.forEach((y) => {
    board.splice(y, 1);
    board.unshift(Array(CANVAS_CONFIG.BOARD_WIDTH).fill(0));
  });
  updatedScore += fullRows.length * 10;
  return updatedScore;
}
