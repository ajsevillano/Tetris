import checkAndRemoveRows from './removeRows';
import { CANVAS_CONFIG } from '../const';
import generateRandomPiece from './generateRandomPiece';
import checkCollision from './checkCollisions';
import { state, states } from '../globalStates';
import { drawNextPieceOnCanvas } from './draws';

export default function solidifyPiece({
  nextPieceCanvas,
  nextPieceContext,
}: any) {
  state.piece.shape.forEach((row: any, y: any) => {
    row.forEach((value: any, x: any) => {
      if (value === 1) {
        states.getBoard()[y + state.piece.position.y][
          x + state.piece.position.x
        ] = {
          color: state.piece.color,
          border: state.piece.border,
        };
      }
    });
  });

  // Check and remove rows before resetting the position
  checkAndRemoveRows();

  // reset position
  state.piece.position.x = Math.floor(CANVAS_CONFIG.MAIN.BOARD_WIDTH / 2);
  state.piece.position.y = 0;

  // Get the next piece

  state.piece = states.getNextPiece();

  // Generate a new next piece
  states.setNextPiece(generateRandomPiece());

  // Game over check for the new piece
  if (checkCollision()) {
    states.updateIsGameOver(true);
    states.getBoard().forEach((row: any) => row.fill(0));
  }

  drawNextPieceOnCanvas(nextPieceCanvas, nextPieceContext);
}
