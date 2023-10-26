import { CANVAS_CONFIG } from '../const';
import { states } from '../globalStates';
import updateScore from '../helpers/updateScore';

export default function checkAndRemoveRows() {
  // Getters and setters
  let totalLinesRemoved = states.getTotalLinesRemoved();
  let board = states.getBoard();
  let setBoard = states.setBoard;
  let setTotalLinesRemoved = states.setTotalLinesRemoved;

  const fullRows = [];
  let linesRemoved = 0;

  for (let y = 0; y < CANVAS_CONFIG.MAIN.BOARD_HEIGHT; y++) {
    if (board[y].every((value: any) => value !== 0)) {
      fullRows.push(y);
    }
  }

  // Remove full rows and add new empty ones at the top
  fullRows.forEach((y) => {
    const updatedBoard = board;
    updatedBoard.splice(y, 1);
    updatedBoard.unshift(Array(CANVAS_CONFIG.MAIN.BOARD_WIDTH).fill(0));
    setBoard(updatedBoard);
    linesRemoved++;
  });

  setTotalLinesRemoved((totalLinesRemoved += linesRemoved));
  updateScore(linesRemoved);
}
