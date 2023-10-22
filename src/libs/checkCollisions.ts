import { CANVAS_CONFIG } from '../const';
import { state } from '../globalStates';

export default function checkCollision(piece: any) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardY = y + piece.position.y;
        const boardX = x + piece.position.x;
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
