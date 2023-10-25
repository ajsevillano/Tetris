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
  const updatedPiece = states.getPiece();
  updatedPiece.position.y++;
  states.setPiece(updatedPiece);
  if (checkCollision()) {
    updatedPiece.position.y--;
    states.setPiece(updatedPiece);
    solidifyPiece();
  }
}

function handleLeftMovement() {
  const updatedPiece = states.getPiece();
  updatedPiece.position.x--;
  states.setPiece(updatedPiece);
  if (checkCollision()) {
    updatedPiece.position.x++;
    states.setPiece(updatedPiece);
  }
}

function handleRightMovement() {
  const updatedPiece = states.getPiece();
  updatedPiece.position.x++;
  states.setPiece(updatedPiece);
  if (checkCollision()) {
    updatedPiece.position.x--;
    states.setPiece(updatedPiece);
  }
}

function handleUpMovement() {
  const updatedPiece = states.getPiece();
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
  states.setPiece(updatedPiece);
  if (checkCollision()) {
    updatedPiece.shape = previousShape;
    states.setPiece(updatedPiece);
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
