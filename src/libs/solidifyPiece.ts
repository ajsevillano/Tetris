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
  const piece = states.getPiece();
  const nextPiece = states.getNextPiece();
  const board = states.getBoard();
  let setPiece = states.setPiece;
  let setIsGameOver = states.setIsGameOver;
  let setNextPiece = states.setNextPiece;

  piece.shape.forEach((row: any, y: any) => {
    row.forEach((value: any, x: any) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = {
          color: piece.color,
          border: piece.border,
        };
      }
    });
  });

  // Check and remove rows before resetting the position
  checkAndRemoveRows();

  // reset position
  setPiece({
    ...piece,
    position: {
      x: Math.floor(CANVAS_CONFIG.MAIN.BOARD_WIDTH / 2),
      y: 0,
    },
  });

  // Get the next piece
  setPiece(nextPiece);

  // Generate a new next piece
  setNextPiece(generateRandomPiece());

  // Game over check for the new piece
  if (checkCollision()) {
    setIsGameOver(true);
    board.forEach((row: any) => row.fill(0));
  }

  drawNextPieceOnCanvas(nextPieceCanvas, nextPieceContext);
}
