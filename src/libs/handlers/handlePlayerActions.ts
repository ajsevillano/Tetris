import { states } from '../../globalStates';
import checkCollision from '../checkCollisions';

export function handleLeftMovement() {
  const updatedPiece = states.getPiece();
  updatedPiece.position.x--;
  states.setPiece(updatedPiece);

  if (checkCollision()) {
    updatedPiece.position.x++;
    states.setPiece(updatedPiece);
  }
}

export function handleRightMovement() {
  const updatedPiece = states.getPiece();
  updatedPiece.position.x++;
  states.setPiece(updatedPiece);

  if (checkCollision()) {
    updatedPiece.position.x--;
    states.setPiece(updatedPiece);
  }
}

export function handleDownMovement(solidifyPiece: () => void) {
  const updatedPiece = states.getPiece();
  updatedPiece.position.y++;
  states.setPiece(updatedPiece);

  if (checkCollision()) {
    updatedPiece.position.y--;
    states.setPiece(updatedPiece);
    solidifyPiece();
  }
}

export function handleRotation() {
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

export function handleHardPush(solidifyPiece: () => void) {
  let piece = states.getPiece();

  if (states.getIsGameOver()) return;
  while (!checkCollision()) {
    piece.position.y++;
    states.setPiece(piece);
  }

  piece.position.y--;
  states.setPiece(piece);
  solidifyPiece();
}
