import { CANVAS_CONFIG } from '../const';
import { states } from '../globalStates';
import updateScore2 from '../helpers/updateScore';

export default function checkAndRemoveRows() {
  // Getters
  let totalLinesRemoved = states.getTotalLinesRemoved();

  const fullRows = [];
  let linesRemoved = 0;

  for (let y = 0; y < CANVAS_CONFIG.MAIN.BOARD_HEIGHT; y++) {
    if (states.getBoard()[y].every((value: any) => value !== 0)) {
      fullRows.push(y);
    }
  }

  // Remove full rows and add new empty ones at the top
  fullRows.forEach((y) => {
    const updatedBoard = states.getBoard();
    updatedBoard.splice(y, 1);
    updatedBoard.unshift(Array(CANVAS_CONFIG.MAIN.BOARD_WIDTH).fill(0));
    states.setBoard(updatedBoard);
    linesRemoved++;
  });

  states.updateTotalLinesRemoved((totalLinesRemoved += linesRemoved));
  updateScore2(linesRemoved);
}
