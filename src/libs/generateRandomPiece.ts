import TETROMINOES from '../blocks';

export default function generateRandomPiece() {
  const randomTetromino =
    TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];

  return {
    position: { x: 5, y: 0 },
    shape: randomTetromino.shape,
    color: randomTetromino.color,
    border: randomTetromino.border,
  };
}
