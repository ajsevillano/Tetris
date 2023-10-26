import { states } from '../globalStates';
import { SPEED_CONFIG } from '../const';
import generateRandomPiece from './generateRandomPiece';

export default function resetGame(gameLoop: any) {
  // Empty the board & reset score
  states.getBoard().forEach((row: any) => row.fill(0));
  rebootVariables();
  gameLoop();
}

function rebootVariables() {
  states.setScore(0);
  states.setLevel(0);
  states.setTotalLinesRemoved(0);
  states.setIsGameOver(false);
  states.setFallSpeed(SPEED_CONFIG.DEFAULT_FALL_SPEED);

  // Set the initial position of the piece

  states.setPiece({
    ...states.getPiece(),
    position: {
      x: 5,
      y: 0,
    },
  });

  states.setNextPiece(generateRandomPiece());
  states.setPiece(generateRandomPiece());
}
