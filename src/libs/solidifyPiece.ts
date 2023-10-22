import checkAndRemoveRows from './removeRows';
import { CANVAS_CONFIG } from '../const';
import generateRandomPiece from './generateRandomPiece';
import checkCollision from './checkCollisions';
import { state } from '../globalStates';
import { drawNextPieceOnCanvas } from './draws';

export default function solidifyPiece({
  piece,

  nextPiece,
  nextPieceCanvas,
  nextPieceContext,
}: any) {
  piece.shape.forEach((row: any, y: any) => {
    row.forEach((value: any, x: any) => {
      if (value === 1) {
        state.board[y + piece.position.y][x + piece.position.x] = {
          color: piece.color,
          border: piece.border,
        };
      }
    });
  });

  // Check and remove rows before resetting the position
  checkAndRemoveRows();

  // reset position
  piece.position.x = Math.floor(CANVAS_CONFIG.MAIN.BOARD_WIDTH / 2);
  piece.position.y = 0;

  // Get the next piece
  piece = nextPiece;

  // Generate a new next piece
  nextPiece = generateRandomPiece();

  // Game over check for the new piece
  if (checkCollision(piece)) {
    state.isGameOver = true;
    state.board.forEach((row: any) => row.fill(0));
  }

  drawNextPieceOnCanvas(nextPiece, nextPieceCanvas, nextPieceContext);
  console.log('nextPiece', nextPiece);
  return { piece, nextPiece };
}
