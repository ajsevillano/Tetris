import { state, states } from '../globalStates';
import { SPEED_CONFIG } from '../const';
import generateRandomPiece from './generateRandomPiece';

export default function resetGame(gameLoop: any) {
  // Empty the board & reset score
  state.board.forEach((row: any) => row.fill(0));
  rebootVariables();
  gameLoop();
}

function rebootVariables() {
  states.updateScore(0);
  states.updateLevel(0);
  states.updateTotalLinesRemoved(0);
  states.updateIsGameOver(false);
  states.updateFallSpeed(SPEED_CONFIG.DEFAULT_FALL_SPEED);

  // Set the initial position of the piece
  state.piece.position.x = 5;
  state.piece.position.y = -1;
  state.nextPiece = generateRandomPiece();
  state.piece = generateRandomPiece();
}
