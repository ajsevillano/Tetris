import './style.css';
import TETROMINOES from './blocks';
import { CANVAS_CONFIG, EVENT_MOVEMENTS } from './const';

// Canvas
const canvas: any = document.querySelector('canvas');
const context = canvas?.getContext('2d');
canvas.width = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_WIDTH;
canvas.height = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_HEIGHT;
context.scale(CANVAS_CONFIG.BLOCK_SIZE, CANVAS_CONFIG.BLOCK_SIZE);

// Score
const $score: any = document.querySelector('span');
let score = 0;

const createBoard = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
};

// Board
const board = createBoard(
  CANVAS_CONFIG.BOARD_WIDTH,
  CANVAS_CONFIG.BOARD_HEIGHT,
);

let piece = generateRandomPiece();

function generateRandomPiece() {
  const randomTetromino =
    TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];

  return {
    position: { x: 5, y: 0 },
    shape: randomTetromino.shape,
    color: randomTetromino.color,
  };
}

let dropCounter = 0;
let lastTime = 0;

// Game loop
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > 1000) {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      checkAndRemoveRows();
      piece = generateRandomPiece();
    }
    dropCounter = 0;
  }
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  // Draw the board
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Loop through board
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        createShapes(value, x, y);
      }
    });
  });

  $score.innerText = score;

  // Loop through piece
  piece.shape.forEach((row: any[], y: number) => {
    row.forEach((value, x) => {
      if (value) {
        createShapes(piece.color, x + piece.position.x, y + piece.position.y);
      }
    });
  });
}

function createShapes(value: string, x: number, y: number) {
  // Define color for pieces
  context.fillStyle = value;
  context.strokeStyle = '#000000';
  context.lineWidth = 0.04;
  // Draw border for  pieces
  context.fillRect(x, y, 1, 1);
  context.strokeRect(x, y, 1, 1);
}

function checkCollision() {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] !== 0) {
        const boardY = y + piece.position.y;
        const boardX = x + piece.position.x;
        if (
          boardY >= CANVAS_CONFIG.BOARD_HEIGHT ||
          boardX < 0 ||
          boardX >= CANVAS_CONFIG.BOARD_WIDTH ||
          (boardY >= 0 &&
            boardY < CANVAS_CONFIG.BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < CANVAS_CONFIG.BOARD_WIDTH &&
            board[boardY][boardX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = piece.color;
      }
    });
  });

  // Check and remove rows before resetting the position
  checkAndRemoveRows();

  // reset position
  piece.position.x = Math.floor(CANVAS_CONFIG.BOARD_WIDTH / 2);
  piece.position.y = 0;
  // get random piece
  piece = generateRandomPiece();
  // Game over
  if (checkCollision()) {
    window.alert('Game Over');
    board.forEach((row) => row.fill(0));
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }
  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  }
  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      checkAndRemoveRows();
      piece = generateRandomPiece();
    }
  }
  if (event.key === EVENT_MOVEMENTS.UP) {
    const rotated = [];

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];

      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }
      rotated.push(row);
    }
    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = previousShape;
    }
  }
});

function checkAndRemoveRows() {
  const fullRows = [];

  for (let y = 0; y < CANVAS_CONFIG.BOARD_HEIGHT; y++) {
    if (board[y].every((value) => value !== 0)) {
      fullRows.push(y);
    }
  }

  // Remove full rows and add new empty ones at the top
  fullRows.forEach((y) => {
    board.splice(y, 1);
    board.unshift(Array(CANVAS_CONFIG.BOARD_WIDTH).fill(0));
    score += 10;
  });
}

update();
