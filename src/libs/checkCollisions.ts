import { CANVAS_CONFIG } from '../const';
import { states } from '../globalStates';

export default function checkCollision() {
  for (let y = 0; y < states.getPiece().shape.length; y++) {
    for (let x = 0; x < states.getPiece().shape[y].length; x++) {
      if (states.getPiece().shape[y][x] !== 0) {
        const boardY = y + states.getPiece().position.y;
        const boardX = x + states.getPiece().position.x;
        if (
          boardY >= CANVAS_CONFIG.MAIN.BOARD_HEIGHT ||
          boardX < 0 ||
          boardX >= CANVAS_CONFIG.MAIN.BOARD_WIDTH ||
          (boardY >= 0 &&
            boardY < CANVAS_CONFIG.MAIN.BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < CANVAS_CONFIG.MAIN.BOARD_WIDTH &&
            states.getBoard()[boardY][boardX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
