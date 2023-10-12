// Styles
import './style.css';
// Constants
import { CANVAS_CONFIG, SPEED_CONFIG } from './const';
// Libs
import { handleKeyDown, handlePause } from './libs/keyboardEvents';
import generateRandomPiece from './libs/generateRandomPiece';
import checkCollision from './libs/checkCollisions';
import incrementFallSpeed from './libs/incrementFallSpeed';
import checkAndRemoveRows from './libs/removeRows';

// Canvas
const canvas: any = document.querySelector('canvas');
const context = canvas?.getContext('2d');
canvas.width = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_WIDTH;
canvas.height = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_HEIGHT;
context.scale(CANVAS_CONFIG.BLOCK_SIZE, CANVAS_CONFIG.BLOCK_SIZE);

// Score
const scoreElement: any = document.querySelector('span');
let score = 0;

// Fall speed
let level = 0;
let fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;

// Pause
let isPaused = false;

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

let dropCounter = 0;
let lastTime = 0;

// Game loop
function update(time = 0) {
  // Increase the piece speed of descent according to the constant POINTS_NEXT_LEVEL
  const result = incrementFallSpeed(score, level, fallSpeed);
  level = result.level;
  fallSpeed = result.fallSpeed;

  if (!isPaused) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > fallSpeed) {
      piece.position.y++;
      if (checkCollision(piece, board)) {
        piece.position.y--;
        solidifyPiece();
        checkAndRemoveRows(board, score);
        piece = generateRandomPiece();
      }
      dropCounter = 0;
    }
    draw();
  }
  window.requestAnimationFrame(update);
}

function drawGrid() {
  const gridSize = 1; // Size of the grid blocks

  context.strokeStyle = '#121212'; // Colour of the grid lines
  context.lineWidth = 0.04; // Width of the grid lines

  for (let x = 0; x < canvas.width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
}

function draw() {
  // Draw the board
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  // Loop through board and create pieces on the botton when solidified
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        createShapes(value, '#2e2e2e', x, y);
      }
    });
  });

  scoreElement.innerText = score;

  // Loop through piece
  piece.shape.forEach((row: any[], y: number) => {
    row.forEach((value, x) => {
      if (value) {
        createShapes(
          piece.color,
          '#2e2e2e',
          x + piece.position.x,
          y + piece.position.y,
        );
      }
    });
  });
}

function createShapes(value: string, border: any, x: number, y: number) {
  // Define color for pieces
  context.fillStyle = value;
  context.strokeStyle = border;
  context.lineWidth = 0.04;
  // Draw border for  pieces
  context.fillRect(x, y, 1, 1);
  context.strokeRect(x, y, 1, 1);
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
  const newScore = checkAndRemoveRows(board, score);
  score = newScore;

  // reset position
  piece.position.x = Math.floor(CANVAS_CONFIG.BOARD_WIDTH / 2);
  piece.position.y = 0;
  // get random piece
  piece = generateRandomPiece();
  // Game over
  if (checkCollision(piece, board)) {
    window.alert('Game Over');
    board.forEach((row) => row.fill(0));
    // Reset the score and fall speed
    score = 0;
    level = 0;
    fallSpeed = 1000;
  }
}

// Arrow key event listeners
document.addEventListener('keydown', (event) => {
  handleKeyDown({
    isPaused,
    event,
    piece,
    board,
    solidifyPiece,
    generateRandomPiece,
  });
});

// Pause key event listener
document.addEventListener('keydown', (event) => {
  isPaused = handlePause(event, isPaused);
});

update();
