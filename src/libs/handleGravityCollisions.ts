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
    state.piece.position.y++;
    if (checkCollision()) {
      state.piece.position.y--;
      solidifyPiece({
        nextPieceCanvas,
        nextPieceContext,
      });

      checkAndRemoveRows();
    }
    state.dropCounter = 0;
  }
}
