import { CANVAS_CONFIG } from '../const';
import { state, states } from '../globalStates';
import updateScore2 from '../helpers/updateScore';

export default function checkAndRemoveRows() {
  // Getters
  let totalLinesRemoved = states.getTotalLinesRemoved();

  const fullRows = [];
  let linesRemoved = 0;

  for (let y = 0; y < CANVAS_CONFIG.MAIN.BOARD_HEIGHT; y++) {
    if (state.board[y].every((value: any) => value !== 0)) {
      fullRows.push(y);
    }
  }

  // Remove full rows and add new empty ones at the top
  fullRows.forEach((y) => {
    state.board.splice(y, 1);
    state.board.unshift(Array(CANVAS_CONFIG.MAIN.BOARD_WIDTH).fill(0));
    linesRemoved++;
  });

  states.updateTotalLinesRemoved((totalLinesRemoved += linesRemoved));
  updateScore2(linesRemoved);
}
