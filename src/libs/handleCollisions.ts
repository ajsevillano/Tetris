import { globalVariables } from '../globalStates';
import checkCollision from './checkCollisions';
import solidifyPiece from './solidifyPiece';
import checkAndRemoveRows from './removeRows';
import generateRandomPiece from './generateRandomPiece';

export default function handleCollisions({
  time,
  piece,
  board,
  nextPiece,
  nextPieceCanvas,
  nextPieceContext,
}: any) {
  const deltaTime = time - globalVariables.lastTime;
  globalVariables.lastTime = time;
  globalVariables.dropCounter += deltaTime;
  if (globalVariables.dropCounter > globalVariables.fallSpeed) {
    piece.position.y++;
    if (checkCollision(piece, board)) {
      piece.position.y--;
      const updatePiece = solidifyPiece({
        piece,
        board,
        nextPiece,
        nextPieceCanvas,
        nextPieceContext,
      });
      piece = updatePiece.piece;
      nextPiece = updatePiece.nextPiece;
      checkAndRemoveRows(board);
      piece = generateRandomPiece();
    }
    globalVariables.dropCounter = 0;
  }
}
