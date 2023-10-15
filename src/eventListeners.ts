import { handleKeyDown } from './libs/keyboardEvents';

// Arrow key event listeners
export function addArrowKeyEventListener(
  isPaused: boolean,
  getPiece: () => void,
  getBoard: () => void,
  solidifyPiece: () => void,
  generateRandomPiece: () => void,
) {
  document.addEventListener('keydown', (event) => {
    const piece = getPiece();
    const board = getBoard();
    handleKeyDown({
      isPaused,
      event,
      piece,
      board,
      solidifyPiece,
      generateRandomPiece,
    });
  });
}

// Pause key event listener
export function addPauseKeyEventListener(callback: any) {
  document.addEventListener('keydown', (event) => {
    callback(event);
  });
}

// Enter key event listener
export function addEnterKeyEventListener(callback: any) {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      callback();
    }
  });
}

export function addRkeyEventListener(callback: any) {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyR' || event.code === 'Keyr') {
      callback();
    }
  });
}
