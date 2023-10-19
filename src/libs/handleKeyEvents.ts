import { EVENT_MOVEMENTS } from '../const';
import checkCollision from './checkCollisions';
import generateRandomPiece from './generateRandomPiece';

export function handleEnterKey(
  event: KeyboardEvent,
  isGameOver: boolean,
  reStartGame: () => void,
) {
  if (event.key === 'Enter') {
    if (isGameOver) {
      reStartGame();
    }
  }
}

export function handleRkey(event: KeyboardEvent, reStartGame: () => void) {
  if (event.code === 'KeyR' || event.code === 'Keyr') {
    reStartGame();
  }
}

export function handleArrowKeys(
  event: KeyboardEvent,
  piece: any,
  board: any,
  solidifyPiece: () => void,
) {
  let updatedPiece = { ...piece };

  if (event.key === EVENT_MOVEMENTS.LEFT) {
    updatedPiece.position.x--;
    if (checkCollision(updatedPiece, board)) {
      updatedPiece.position.x++;
    }
  }
  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    updatedPiece.position.x++;
    if (checkCollision(updatedPiece, board)) {
      updatedPiece.position.x--;
    }
  }
  if (event.key === EVENT_MOVEMENTS.DOWN) {
    updatedPiece.position.y++;
    if (checkCollision(updatedPiece, board)) {
      updatedPiece.position.y--;
      solidifyPiece();

      updatedPiece = generateRandomPiece();
    }
  }
  if (event.key === EVENT_MOVEMENTS.UP) {
    if (event.key === EVENT_MOVEMENTS.UP) {
      const rotated = [];

      for (let i = 0; i < updatedPiece.shape[0].length; i++) {
        const row = [];

        for (let j = updatedPiece.shape.length - 1; j >= 0; j--) {
          row.push(updatedPiece.shape[j][i]);
        }
        rotated.push(row);
      }
      const previousShape = updatedPiece.shape;
      updatedPiece.shape = rotated;
      if (checkCollision(updatedPiece, board)) {
        updatedPiece.shape = previousShape;
      }
    }
  }
  return updatedPiece;
}

export function handlePause(event: KeyboardEvent, isPaused: boolean) {
  let updatedIsPaused = isPaused;
  if (event.code === 'KeyP' || event.code === 'Keyp') {
    updatedIsPaused = !isPaused;
  }
  return updatedIsPaused;
}
