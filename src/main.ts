import { globalVariables } from './globalStates';

// Styles
import './style.css';
// Constants
import { CANVAS_CONFIG, SPEED_CONFIG } from './const';
// Libs
import {
  handlePause,
  handleEnterKey,
  handleRkey,
  handleArrowKeys,
} from './libs/handleKeyEvents';
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

function handleCollisions(time: number) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > globalVariables.fallSpeed) {
    piece.position.y++;
    if (checkCollision(piece, board)) {
      piece.position.y--;
      solidifyPiece();
      const newScore = checkAndRemoveRows(
        board,
        globalVariables.score,
        globalVariables.totalLinesRemoved,
      );
      globalVariables.score = newScore.updatedScore;
      globalVariables.totalLinesRemoved = newScore.totalLinesRemoved;
      piece = generateRandomPiece();
    }
    dropCounter = 0;
  }
}

function gameLoop(time = 0) {
  // Check if the fall speed should be increased
  shouldIncreaseFallSpeed();
  console.log(globalVariables.fallSpeed);
  drawNextPieceOnCanvas(nextPiece, nextPieceCanvas, nextPieceContext);

  if (globalVariables.isGameOver) {
    drawGameOverScreen(context);
    return;
  }

  if (globalVariables.isPaused) {
    drawPauseScreen(context);
    window.requestAnimationFrame(gameLoop);
    return;
  }

  if (!globalVariables.isPaused) {
    let renderBoardProps: any = {
      context,
      canvas,
      piece,
      board,
      totalLinesRemoved: globalVariables.totalLinesRemoved,
      level: globalVariables.level,
      score: globalVariables.score,
      linesElement,
      levelElement,
      scoreElement,
    };
    renderBoard(renderBoardProps);
  }

  handleCollisions(time);

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
  const newScore = checkAndRemoveRows(
    board,
    globalVariables.score,
    globalVariables.totalLinesRemoved,
  );
  globalVariables.score = newScore.updatedScore;
  globalVariables.totalLinesRemoved = newScore.totalLinesRemoved;

  // reset position
  piece.position.x = Math.floor(CANVAS_CONFIG.MAIN.BOARD_WIDTH / 2);
  piece.position.y = 0;

  // Get the next piece
  piece = nextPiece;

  // Generate a new next piece
  nextPiece = generateRandomPiece();

  // Game over check for the new piece
  if (checkCollision(piece, board)) {
    globalVariables.isGameOver = true;
    board.forEach((row) => row.fill(0));
  }

  drawNextPieceOnCanvas(nextPiece, nextPieceCanvas, nextPieceContext);
}

function resetGame() {
  // Empty the board & reset score
  board.forEach((row) => row.fill(0));
  globalVariables.score = 0;
  globalVariables.level = 0;
  globalVariables.totalLinesRemoved = 0;
  globalVariables.fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;
  // Set the initial position of the piece
  piece.position.x = 5;
  piece.position.y = -1;
  globalVariables.isGameOver = false;
  gameLoop();
}

// EVENT LISTENERS

// Arrow key event listeners
document.addEventListener('keydown', (event) => {
  if (globalVariables.isPaused) return;
  handleArrowKeys(event, piece, board, solidifyPiece);
});
// Pause key event listener
document.addEventListener(
  'keydown',
  (event) =>
    (globalVariables.isPaused = handlePause(event, globalVariables.isPaused)),
);

// Enter key event listener
document.addEventListener('keydown', (event) =>
  handleEnterKey(event, globalVariables.isGameOver, resetGame),
);

// R key event listener
document.addEventListener('keydown', (event) => handleRkey(event, resetGame));

// Execute the game for the first time
gameLoop();
