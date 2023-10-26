import checkAndRemoveRows from './removeRows';
import { CANVAS_CONFIG } from '../const';
import generateRandomPiece from './generateRandomPiece';
import checkCollision from './checkCollisions';
import { states } from '../globalStates';
import { drawNextPieceOnCanvas } from './draws';

export default function solidifyPiece({
  nextPieceCanvas,
  nextPieceContext,
}: any) {
  states.getPiece().shape.forEach((row: any, y: any) => {
    row.forEach((value: any, x: any) => {
      if (value === 1) {
        states.getBoard()[y + states.getPiece().position.y][
          x + states.getPiece().position.x
        ] = {
          color: states.getPiece().color,
          border: states.getPiece().border,
        };
      }
    });
  });

  // Check and remove rows before resetting the position
  checkAndRemoveRows();

  // reset position
  states.setPiece({
    ...states.getPiece(),
    position: {
      x: Math.floor(CANVAS_CONFIG.MAIN.BOARD_WIDTH / 2),
      y: 0,
    },
  });

  // Get the next piece
  states.setPiece(states.getNextPiece());

  // Generate a new next piece
  states.setNextPiece(generateRandomPiece());

  // Game over check for the new piece
  if (checkCollision()) {
    states.setIsGameOver(true);
    states.getBoard().forEach((row: any) => row.fill(0));
  }

  drawNextPieceOnCanvas(nextPieceCanvas, nextPieceContext);
}
