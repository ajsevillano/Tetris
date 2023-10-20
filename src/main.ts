import { globalVariables } from './globalStates';

// Styles
import './style.css';
// Constants
import { CANVAS_CONFIG } from './const';
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
import resetGame from './libs/resetGame';
import solidifyPiece from './libs/solidifyPiece';

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
      const updatePiece = solidifyPiece({
        piece,
        board,
        nextPiece,
        nextPieceCanvas,
        nextPieceContext,
      });
      piece = updatePiece.piece;
      nextPiece = updatePiece.nextPiece;
      checkAndRemoveRows(board);
      piece = generateRandomPiece();
    }
    dropCounter = 0;
  }
}

function gameLoop(time = 0) {
  // Check if the fall speed should be increased
  shouldIncreaseFallSpeed();
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
      linesElement,
      levelElement,
      scoreElement,
    };
    renderBoard(renderBoardProps);
  }

  handleCollisions(time);

  window.requestAnimationFrame(gameLoop);
}

// EVENT LISTENERS

// Arrow key event listeners
document.addEventListener('keydown', (event) => {
  if (globalVariables.isPaused) return;
  handleArrowKeys(event, piece, board, () => {
    const updatePiece = solidifyPiece({
      piece,
      board,
      nextPiece,
      nextPieceCanvas,
      nextPieceContext,
    });
    piece = updatePiece.piece;
    nextPiece = updatePiece.nextPiece;
  });
});
// Pause key event listener
document.addEventListener(
  'keydown',
  (event) =>
    (globalVariables.isPaused = handlePause(event, globalVariables.isPaused)),
);

// Enter key event listener
document.addEventListener('keydown', (event) =>
  handleEnterKey(event, globalVariables.isGameOver, () =>
    resetGame(board, piece, gameLoop),
  ),
);

// R key event listener
document.addEventListener('keydown', (event) =>
  handleRkey(event, () => resetGame(board, piece, gameLoop)),
);

// Execute the game for the first time
gameLoop();
