export const CANVAS_CONFIG = {
  MAIN: {
    BLOCK_SIZE: 25,
    BOARD_WIDTH: 14,
    BOARD_HEIGHT: 30,
  },
  NEXT_PIECE: {
    BLOCK_SIZE: 25,
    BOARD_WIDTH: 6,
    BOARD_HEIGHT: 6,
  },
};

export const EVENT_MOVEMENTS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  PAUSE_UPPERCASE: 'P',
  PAUSE_LOWERCASE: 'p',
  ENTER: 'Enter',
  RESTART_UPPERCASE: 'R',
  RESTART_LOWERCASE: 'r',
};

export const SCORE_CONFIG = {
  LINES_NEXT_LEVEL: 1,
  INITIAL_SCORE: 0,
  INITIAL_LEVEL: 0,
  // Original BPS scoring system
  ONE_ROW: 40,
  TWO_ROWS: 100,
  THREE_ROWS: 300,
  FOUR_ROWS: 1200,
};

export const SPEED_CONFIG = {
  DEFAULT_FALL_SPEED: 1000, // 1 second
  SPEED_INCREMENT_PER_LEVEL: 50, // 50 milliseconds
};
