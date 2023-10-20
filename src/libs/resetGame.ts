import { state } from '../globalStates';
import { SPEED_CONFIG } from '../const';

export default function resetGame(board: any, piece: any, gameLoop: any) {
  // Empty the board & reset score
  board.forEach((row: any) => row.fill(0));
  rebootVariables(piece);
  gameLoop();
}

function rebootVariables(piece: any) {
  state.score = 0;
  state.level = 0;
  state.totalLinesRemoved = 0;
  state.fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;
  // Set the initial position of the piece
  piece.position.x = 5;
  piece.position.y = -1;
  state.isGameOver = false;
}
