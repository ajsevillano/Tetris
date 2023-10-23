import { state } from '../globalStates';
import { SPEED_CONFIG } from '../const';
import generateRandomPiece from './generateRandomPiece';

export default function resetGame(piece: any, gameLoop: any) {
  // Empty the board & reset score
  state.board.forEach((row: any) => row.fill(0));
  const updatedPiece = rebootVariables(piece);
  gameLoop();
  return updatedPiece;
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
  state.nextPiece = generateRandomPiece();
  piece = generateRandomPiece();
  return piece;
}
