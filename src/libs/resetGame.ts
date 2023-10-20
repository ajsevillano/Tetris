import { globalVariables } from '../globalStates';
import { SPEED_CONFIG } from '../const';

export default function resetGame(board: any, piece: any, gameLoop: any) {
  // Empty the board & reset score
  board.forEach((row: any) => row.fill(0));
  globalVariables.score = 0;
  globalVariables.level = 0;
  globalVariables.totalLinesRemoved = 0;
  globalVariables.fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;
  // Set the initial position of the piece
  piece.position.x = 5;
  piece.position.y = -1;
  globalVariables.isGameOver = false;
  gameLoop();
}
