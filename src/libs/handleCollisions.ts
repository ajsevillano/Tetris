import { state } from '../globalStates';
import checkCollision from './checkCollisions';
import solidifyPiece from './solidifyPiece';
import checkAndRemoveRows from './removeRows';

export default function handleCollisions({
  time,
  piece,
  board,
  nextPiece,
  nextPieceCanvas,
  nextPieceContext,
}: any) {
  const deltaTime = time - state.lastTime;
  state.lastTime = time;
  state.dropCounter += deltaTime;
  if (state.dropCounter > state.fallSpeed) {
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
    }
    state.dropCounter = 0;
  }
  return { piece, nextPiece };
}
