import { state } from '../globalStates';
import checkCollision from './checkCollisions';
import solidifyPiece from './solidifyPiece';
import checkAndRemoveRows from './removeRows';

export default function handleGravityCollisions({
  time,
  piece,

  nextPieceCanvas,
  nextPieceContext,
}: any) {
  const deltaTime = time - state.lastTime;
  state.lastTime = time;
  state.dropCounter += deltaTime;
  if (state.dropCounter > state.fallSpeed) {
    piece.position.y++;
    if (checkCollision(piece)) {
      piece.position.y--;
      const updatePiece = solidifyPiece({
        piece,
        nextPieceCanvas,
        nextPieceContext,
      });
      piece = updatePiece.piece;

      checkAndRemoveRows();
    }
    state.dropCounter = 0;
  }
  return { piece };
}
