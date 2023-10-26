import { state, states } from '../globalStates';
// Libs
import checkCollision from './checkCollisions';
import solidifyPiece from './solidifyPiece';
import checkAndRemoveRows from './removeRows';

export default function handleGravityCollisions({
  time,
  nextPieceCanvas,
  nextPieceContext,
}: any) {
  const deltaTime = time - state.lastTime;
  state.lastTime = time;
  state.dropCounter += deltaTime;
  if (state.dropCounter > states.getFallSpeed()) {
    const updatedPiece = states.getPiece();
    updatedPiece.position.y++;
    states.setPiece(updatedPiece);
    if (checkCollision()) {
      const updatedPiece = states.getPiece();
      updatedPiece.position.y--;
      states.setPiece(updatedPiece);
      solidifyPiece({
        nextPieceCanvas,
        nextPieceContext,
      });

      checkAndRemoveRows();
    }
    state.dropCounter = 0;
  }
}
