import { CANVAS_CONFIG } from '../const';
import { state } from '../globalStates';

export default function checkCollision() {
  for (let y = 0; y < state.piece.shape.length; y++) {
    for (let x = 0; x < state.piece.shape[y].length; x++) {
      if (state.piece.shape[y][x] !== 0) {
        const boardY = y + state.piece.position.y;
        const boardX = x + state.piece.position.x;
        if (
          boardY >= CANVAS_CONFIG.MAIN.BOARD_HEIGHT ||
          boardX < 0 ||
          boardX >= CANVAS_CONFIG.MAIN.BOARD_WIDTH ||
          (boardY >= 0 &&
            boardY < CANVAS_CONFIG.MAIN.BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < CANVAS_CONFIG.MAIN.BOARD_WIDTH &&
            state.board[boardY][boardX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
