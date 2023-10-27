import checkCollision from '../../libs/checkCollisions';
import { states } from '../../globalStates';
import { describe, expect, test } from 'vitest';

// Mock CANVAS_CONFIG
const mockCanvasConfig = {
  MAIN: {
    BLOCK_SIZE: 25,
    BOARD_WIDTH: 10,
    BOARD_HEIGHT: 20,
  },
};

// jest.mock('../const', () => ({
//   CANVAS_CONFIG: mockCanvasConfig,
// }));

describe('Test suite for checkCollision function', () => {
  test('checkCollision should return false when there is no collision', () => {
    // Assuming there is no collision for the current piece in the mock state
    states.setBoard(
      Array(mockCanvasConfig.MAIN.BOARD_HEIGHT)
        .fill(0)
        .map(() => Array(mockCanvasConfig.MAIN.BOARD_WIDTH).fill(0)),
    );

    // Assuming a piece that doesn't collide with the board
    states.setPiece({
      position: { x: 5, y: 0 },
      shape: [
        [1, 1],
        [1, 1],
      ],
      color: '#FF0000',
      border: '#000000',
    });

    const result = checkCollision();
    expect(result).toBeFalsy();
  });

  test('checkCollision should return true when there is a collision', () => {
    // Assuming there is a collision for the current piece in the mock state
    const boardWithCollision = Array(mockCanvasConfig.MAIN.BOARD_HEIGHT)
      .fill(0)
      .map(() => Array(mockCanvasConfig.MAIN.BOARD_WIDTH).fill(1));
    states.setBoard(boardWithCollision);

    // Assuming a piece that collides with the board
    states.setPiece({
      position: { x: 5, y: 19 },
      shape: [
        [1, 1],
        [1, 1],
      ],
      color: '#FF0000',
      border: '#000000',
    });

    const result = checkCollision();
    expect(result).toBeTruthy();
  });
});
