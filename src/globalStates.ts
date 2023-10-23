import { SCORE_CONFIG, SPEED_CONFIG } from './const';
import createBoardMatrix from './libs/createBoardMatrix';
import { CANVAS_CONFIG } from './const';
import generateRandomPiece from './libs/generateRandomPiece';

export const state = {
  score: SCORE_CONFIG.INITIAL_SCORE,
  level: SCORE_CONFIG.INITIAL_LEVEL,
  totalLinesRemoved: 0,
  fallSpeed: SPEED_CONFIG.DEFAULT_FALL_SPEED,
  isPaused: false,
  isGameOver: false,
  dropCounter: 0,
  lastTime: 0,
  nextPiece: generateRandomPiece(),
  board: createBoardMatrix(
    CANVAS_CONFIG.MAIN.BOARD_WIDTH,
    CANVAS_CONFIG.MAIN.BOARD_HEIGHT,
  ),
};
