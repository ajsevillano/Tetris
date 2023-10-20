import { SCORE_CONFIG, SPEED_CONFIG } from './const';

export const state = {
  score: SCORE_CONFIG.INITIAL_SCORE,
  level: SCORE_CONFIG.INITIAL_LEVEL,
  totalLinesRemoved: 0,
  fallSpeed: SPEED_CONFIG.DEFAULT_FALL_SPEED,
  isPaused: false,
  isGameOver: false,
  dropCounter: 0,
  lastTime: 0,
};
