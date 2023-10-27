import generateRandomPiece from '../../libs/generateRandomPiece';
import TETROMINOES from '../../blocks';
import { describe, expect, test } from 'vitest';

describe('generateRandomPiece', () => {
  test('should return a random tetromino piece', () => {
    const piece = generateRandomPiece();
    const tetromino = TETROMINOES.find((t) => t.shape === piece.shape);

    expect(tetromino).toBeDefined();
    expect(piece.position).toEqual({ x: 5, y: 0 });
    expect(piece.color).toEqual(tetromino?.color);
    expect(piece.border).toEqual(tetromino?.border);
  });
});
