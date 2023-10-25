import { EVENT_MOVEMENTS } from '../const';
import { state, states } from '../globalStates';
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

  solidifyPiece: () => void,
) {
  switch (event.key) {
    case LEFT: {
      handleLeftMovement();
      break;
    }
    case RIGHT: {
      handleRightMovement();
      break;
    }
    case DOWN: {
      handleDownMovement(solidifyPiece);
      generateRandomPiece();
      break;
    }
    case UP: {
      handleUpMovement();
      break;
    }
  }
}

function handleDownMovement(solidifyPiece: () => void) {
  state.piece.position.y++;
  if (checkCollision()) {
    state.piece.position.y--;
    solidifyPiece();
  }
}

function handleLeftMovement() {
  state.piece.position.x--;
  if (checkCollision()) {
    state.piece.position.x++;
  }
}

function handleRightMovement() {
  state.piece.position.x++;
  if (checkCollision()) {
    state.piece.position.x--;
  }
}

function handleUpMovement() {
  const rotated = [];

  for (let i = 0; i < state.piece.shape[0].length; i++) {
    const row = [];
    for (let j = state.piece.shape.length - 1; j >= 0; j--) {
      row.push(state.piece.shape[j][i]);
    }
    rotated.push(row);
  }
  const previousShape = state.piece.shape;
  state.piece.shape = rotated;
  if (checkCollision()) {
    state.piece.shape = previousShape;
  }
}

export function handlePause(event: KeyboardEvent) {
  if (event.key === PAUSE_LOWERCASE || event.key === PAUSE_UPPERCASE)
    states.updateIsPaused(!states.getIsPaused());
}

export function handleEnterKey(event: KeyboardEvent, reStartGame: () => void) {
  if (event.key === ENTER) {
    if (states.getIsGameOver()) {
      reStartGame();
    }
  }
}

export function handleRkey(event: KeyboardEvent, reStartGame: () => void) {
  if (event.key === RESTART_LOWERCASE || event.key === RESTART_UPPERCASE) {
    reStartGame();
  }
}
