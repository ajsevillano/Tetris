import createBoardMatrix from '../../libs/createBoardMatrix';
import { describe, expect, test } from 'vitest';

describe('createBoardMatrix', () => {
  test('should create a board matrix with the correct dimensions', () => {
    const width = 10;
    const height = 20;
    const boardMatrix = createBoardMatrix(width, height);

    expect(boardMatrix.length).toBe(height);
    expect(boardMatrix[0].length).toBe(width);
  });

  test('should create a board matrix with all values set to 0', () => {
    const width = 5;
    const height = 5;
    const boardMatrix = createBoardMatrix(width, height);

    boardMatrix.forEach((row) => {
      row.forEach((value) => {
        expect(value).toBe(0);
      });
    });
  });
});
