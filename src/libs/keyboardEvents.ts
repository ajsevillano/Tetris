import { EVENT_MOVEMENTS } from '../const';
import checkCollision from './checkCollisions';

export function handleKeyDown({
  isPaused,
  event,
  piece,
  board,
  solidifyPiece,
  generateRandomPiece,
}: any) {
  if (!isPaused) {
    if (event.key === EVENT_MOVEMENTS.LEFT) {
      piece.position.x--;
      if (checkCollision(piece, board)) {
        piece.position.x++;
      }
    }
    if (event.key === EVENT_MOVEMENTS.RIGHT) {
      piece.position.x++;
      if (checkCollision(piece, board)) {
        piece.position.x--;
      }
    }
    if (event.key === EVENT_MOVEMENTS.DOWN) {
      piece.position.y++;
      if (checkCollision(piece, board)) {
        piece.position.y--;
        solidifyPiece();

        piece = generateRandomPiece();
      }
    }
    if (event.key === EVENT_MOVEMENTS.UP) {
      if (event.key === EVENT_MOVEMENTS.UP) {
        const rotated = [];

        for (let i = 0; i < piece.shape[0].length; i++) {
          const row = [];

          for (let j = piece.shape.length - 1; j >= 0; j--) {
            row.push(piece.shape[j][i]);
          }
          rotated.push(row);
        }
        const previousShape = piece.shape;
        piece.shape = rotated;
        if (checkCollision(piece, board)) {
          piece.shape = previousShape;
        }
      }
    }
  } else {
    document.removeEventListener('keydown', handleKeyDown);
  }
}

export function handlePause(event: any, isPaused: boolean) {
  let updatedIsPaused = isPaused;
  if (
    event.key === EVENT_MOVEMENTS.PAUSE_UPPERCASE ||
    event.key === EVENT_MOVEMENTS.PAUSE_LOWERCASE
  ) {
    updatedIsPaused = !isPaused;

    if (updatedIsPaused) {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }
  return updatedIsPaused;
}
