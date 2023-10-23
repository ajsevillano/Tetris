import { EVENT_MOVEMENTS } from '../const';
import { state } from '../globalStates';
import checkCollision from './checkCollisions';
import generateRandomPiece from './generateRandomPiece';

const {
  LEFT,
  RIGHT,
  DOWN,
  UP,
  PAUSE_LOWERCASE,
  PAUSE_UPPERCASE,
  ENTER,
  RESTART_LOWERCASE,
  RESTART_UPPERCASE,
} = EVENT_MOVEMENTS;

export function handleArrowKeys(
  event: KeyboardEvent,
  piece: any,
  solidifyPiece: () => void,
) {
  let updatedPiece = { ...piece };

  if (event.key === LEFT) {
    updatedPiece.position.x--;
    if (checkCollision(updatedPiece)) {
      updatedPiece.position.x++;
    }
  }
  if (event.key === RIGHT) {
    updatedPiece.position.x++;
    if (checkCollision(updatedPiece)) {
      updatedPiece.position.x--;
    }
  }
  if (event.key === DOWN) {
    updatedPiece.position.y++;
    if (checkCollision(updatedPiece)) {
      updatedPiece.position.y--;
      solidifyPiece();
      piece = generateRandomPiece();
    }
  }
  if (event.key === UP) {
    if (event.key === UP) {
      const rotated = [];

      for (let i = 0; i < updatedPiece.shape[0].length; i++) {
        const row = [];

        for (let j = updatedPiece.shape.length - 1; j >= 0; j--) {
          row.push(updatedPiece.shape[j][i]);
        }
        rotated.push(row);
      }
      const previousShape = updatedPiece.shape;
      piece.shape = rotated;
      if (checkCollision(updatedPiece)) {
        updatedPiece.shape = previousShape;
      }
    }
  }
  return piece;
}

export function handlePause(event: KeyboardEvent) {
  if (event.key === PAUSE_LOWERCASE || event.key === PAUSE_UPPERCASE)
    state.isPaused = !state.isPaused;
}

export function handleEnterKey(event: KeyboardEvent, reStartGame: () => void) {
  if (event.key === ENTER) {
    if (state.isGameOver) {
      reStartGame();
    }
  }
}

export function handleRkey(event: KeyboardEvent, reStartGame: () => void) {
  if (event.key === RESTART_LOWERCASE || event.key === RESTART_UPPERCASE) {
    reStartGame();
  }
}
