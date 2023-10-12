export const CANVAS_CONFIG = {
  BLOCK_SIZE: 25,
  BOARD_WIDTH: 14,
  BOARD_HEIGHT: 30,
};

export const EVENT_MOVEMENTS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  PAUSE_UPPERCASE: 'P',
  PAUSE_LOWERCASE: 'p',
};

export const SCORE_CONFIG = {
  POINTS_NEXT_LEVEL: 100,
  // FUTURE IMPLEMENTATION
  // ONE_ROW: 100,
  // TWO_ROWS: 300,
  // THREE_ROWS: 500,
  // FOUR_ROWS: 800,
};

export const SPEED_CONFIG = {
  DEFAULT_FALL_SPEED: 1000, // 1 second
  SPEED_INCREMENT_PER_LEVEL: 50, // 50 milliseconds
};
