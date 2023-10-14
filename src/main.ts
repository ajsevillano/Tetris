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
import { drawBoard, drawPauseScreen, drawPieces } from './libs/draws';

// Canvas
const canvas: any = document.querySelector('canvas');
const context = canvas?.getContext('2d');
canvas.width = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_WIDTH;
canvas.height = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_HEIGHT;
context.scale(CANVAS_CONFIG.BLOCK_SIZE, CANVAS_CONFIG.BLOCK_SIZE);

// Score
const scoreElement: any = document.querySelector('span');
const levelElement: any = document.querySelector('.level');
let score = 0;

// Fall speed
let level = 0;
let fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;

// Pause
let isPaused = false;

const createBoardMatrix = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
};

// Board
const board = createBoardMatrix(
  CANVAS_CONFIG.BOARD_WIDTH,
  CANVAS_CONFIG.BOARD_HEIGHT,
);

let piece = generateRandomPiece();
let dropCounter = 0;
let lastTime = 0;

function gameLoop(time = 0) {
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
    renderTetrisBoard();
  } else {
    drawPauseScreen(context);
  }
  window.requestAnimationFrame(gameLoop);
}

function renderTetrisBoard() {
  // Draw the board & it background grid
  drawBoard(context, canvas);

  // Loop through board and create pieces on the botton when solidified
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        drawPieces(value, '#2e2e2e', x, y, context);
      }
    });
  });

  scoreElement.innerText = score;
  levelElement.innerText = level;

  // Loop through piece and create the falling pieces
  piece.shape.forEach((row: any[], y: number) => {
    row.forEach((value, x) => {
      if (value) {
        drawPieces(
          piece.color,
          '#2e2e2e',
          x + piece.position.x,
          y + piece.position.y,
          context,
        );
      }
    });
  });
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

gameLoop();
