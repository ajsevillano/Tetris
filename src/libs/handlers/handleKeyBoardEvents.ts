import { EVENT_MOVEMENTS } from '../../const';
import { states } from '../../globalStates';
import generateRandomPiece from '../generateRandomPiece';
import {
  handleDownMovement,
  handleLeftMovement,
  handleRightMovement,
  handleRotation,
} from './handlePlayerActions';

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
      handleRotation();
      break;
    }
  }
}

export function handlePause(event: KeyboardEvent) {
  if (event.key === PAUSE_LOWERCASE || event.key === PAUSE_UPPERCASE)
    states.setIsPaused(!states.getIsPaused());
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
