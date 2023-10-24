import checkAndRemoveRows from './removeRows';
import { CANVAS_CONFIG } from '../const';
import generateRandomPiece from './generateRandomPiece';
import checkCollision from './checkCollisions';
import { state } from '../globalStates';
import { drawNextPieceOnCanvas } from './draws';

export default function solidifyPiece({
  nextPieceCanvas,
  nextPieceContext,
}: any) {
  state.piece.shape.forEach((row: any, y: any) => {
    row.forEach((value: any, x: any) => {
      if (value === 1) {
        state.board[y + state.piece.position.y][x + state.piece.position.x] = {
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
  state.piece = state.nextPiece;

  // Generate a new next piece
  state.nextPiece = generateRandomPiece();

  // Game over check for the new piece
  if (checkCollision()) {
    state.isGameOver = true;
    state.board.forEach((row: any) => row.fill(0));
  }

  drawNextPieceOnCanvas(nextPieceCanvas, nextPieceContext);
}
