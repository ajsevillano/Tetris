// SEGUNDO CAMBIO: fix de keyboard handler

// Styles
import './style.css';
// Constants
import { CANVAS_CONFIG, SCORE_CONFIG, SPEED_CONFIG } from './const';
// Libs
import generateRandomPiece from './libs/generateRandomPiece';
import checkCollision from './libs/checkCollisions';
import shouldIncreaseFallSpeed from './libs/checkFallSpeed';
import checkAndRemoveRows from './libs/removeRows';
import createBoardMatrix from './libs/createBoardMatrix';
import renderBoard from './libs/renders/renderBoard';

import {
  drawPauseScreen,
  drawGameOverScreen,
  drawNextPieceOnCanvas,
} from './libs/draws';
import {
  handleEnterKey,
  handleRkey,
  handlePause,
  handleArrowKeys,
} from './libs/handleKeyEvents';

// Main Canvas
const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
const context = canvas?.getContext('2d');

if (canvas) {
  canvas.width = CANVAS_CONFIG.MAIN.BLOCK_SIZE * CANVAS_CONFIG.MAIN.BOARD_WIDTH;
  canvas.height =
    CANVAS_CONFIG.MAIN.BLOCK_SIZE * CANVAS_CONFIG.MAIN.BOARD_HEIGHT;
}

if (context)
  context.scale(CANVAS_CONFIG.MAIN.BLOCK_SIZE, CANVAS_CONFIG.MAIN.BLOCK_SIZE);

// Next piece canvas
const nextPieceCanvas: any = document.querySelector('.next-piece-canvas');
const nextPieceContext = nextPieceCanvas.getContext('2d');
nextPieceCanvas.width =
  CANVAS_CONFIG.NEXT_PIECE.BLOCK_SIZE * CANVAS_CONFIG.NEXT_PIECE.BOARD_WIDTH;
nextPieceCanvas.height =
  CANVAS_CONFIG.NEXT_PIECE.BLOCK_SIZE * CANVAS_CONFIG.NEXT_PIECE.BOARD_HEIGHT;

// Score,lines and level elements
const linesElement: HTMLElement | null = document.querySelector('#lines');
const levelElement: HTMLElement | null = document.querySelector('.level');
const scoreElement: HTMLElement | null =
  document.querySelector('.score-box-text');

// STATES
let score = SCORE_CONFIG.INITIAL_SCORE;
// Level
let level = SCORE_CONFIG.INITIAL_LEVEL;
// Total lines removed
let totalLinesRemoved = 0;
// Pieces fall speed
let fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;
// Pause
let isPaused = false;
// Game over
let isGameOver = false;
// Drop counter
let dropCounter = 0;
let lastTime = 0;
// Pieces
let piece = generateRandomPiece();
let nextPiece = generateRandomPiece();

// Board
const board = createBoardMatrix(
  CANVAS_CONFIG.MAIN.BOARD_WIDTH,
  CANVAS_CONFIG.MAIN.BOARD_HEIGHT,
);

function gameLoop(time = 0) {
  // Check if the fall speed should be increased
  const result = shouldIncreaseFallSpeed(level, fallSpeed, totalLinesRemoved);
  level = result.level;
  fallSpeed = result.fallSpeed;

  // Render the next piece on the nextPieceCanvas
  drawNextPieceOnCanvas(nextPiece, nextPieceCanvas, nextPieceContext);

  // Game over logic
  if (isGameOver) {
    drawGameOverScreen(context);
    // Stop the game loop
    return;
  }

  // If the game is not paused:
  if (!isPaused) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > fallSpeed) {
      piece.position.y++;
      if (checkCollision(piece, board)) {
        piece.position.y--;
        solidifyPiece();
        const newScore = checkAndRemoveRows(board, score, totalLinesRemoved);
        score = newScore.updatedScore;
        totalLinesRemoved = newScore.totalLinesRemoved;

        piece = generateRandomPiece();
      }
      dropCounter = 0;
    }
    let renderBoardProps = {
      context,
      canvas,
      piece,
      board,
      totalLinesRemoved,
      level,
      score,
      linesElement,
      levelElement,
      scoreElement,
    };
    renderBoard(renderBoardProps);
  } else {
    drawPauseScreen(context);
  }
  window.requestAnimationFrame(gameLoop);
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = {
          color: piece.color,
          border: piece.border,
        };
      }
    });
  });

  // Check and remove rows before resetting the position
  const newScore = checkAndRemoveRows(board, score, totalLinesRemoved);
  score = newScore.updatedScore;
  totalLinesRemoved = newScore.totalLinesRemoved;

  // Game over
  if (checkCollision(nextPiece, board)) {
    isGameOver = true;
    board.forEach((row) => row.fill(0));
    return;
  }

  // reset position
  piece.position.x = Math.floor(CANVAS_CONFIG.MAIN.BOARD_WIDTH / 2);
  piece.position.y = 0;

  // Get the next piece
  piece = nextPiece;

  // Generate a new next piece
  nextPiece = generateRandomPiece();

  // Game over check for the new piece
  if (checkCollision(piece, board)) {
    isGameOver = true;
    board.forEach((row) => row.fill(0));
  }

  drawNextPieceOnCanvas(nextPiece, nextPieceCanvas, nextPieceContext);
}

function reStartGame() {
  // Empty the board & reset score
  board.forEach((row) => row.fill(0));
  score = 0;
  level = 0;
  fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;
  // Set the initial position of the piece
  piece.position.x = 5;
  piece.position.y = -1;
  isGameOver = false;
  piece = generateRandomPiece();
  gameLoop();
}

// EVENT LISTENERS

// Event listeners
document.addEventListener('keydown', (event) => {
  if (isPaused) return;
  piece = handleArrowKeys(event, piece, board, solidifyPiece);
});
document.addEventListener(
  'keydown',
  (event) => (isPaused = handlePause(event, isPaused)),
);
document.addEventListener('keydown', (event) => handleRkey(event, reStartGame));
document.addEventListener('keydown', (event) =>
  handleEnterKey(event, isGameOver, reStartGame),
);

// Execute the game for the first time
gameLoop();
