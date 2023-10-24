// Global state
import { state } from './globalStates';
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

import shouldIncreaseFallSpeed from './libs/checkFallSpeed';
import renderBoard from './libs/renders/renderBoard';
import {
  drawPauseScreen,
  drawGameOverScreen,
  drawNextPieceOnCanvas,
} from './libs/draws';
import resetGame from './libs/resetGame';
import solidifyPiece from './libs/solidifyPiece';

import handleGravityCollisions from './libs/handleGravityCollisions';

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

// Score,lines and level DOM elements
const linesElement: HTMLElement | null = document.querySelector('#lines');
const levelElement: HTMLElement | null = document.querySelector('.level');
const scoreElement: HTMLElement | null =
  document.querySelector('.score-box-text');

function gameLoop(time = 0) {
  // Check if the fall speed should be increased
  shouldIncreaseFallSpeed();
  drawNextPieceOnCanvas(nextPieceCanvas, nextPieceContext);

  if (state.isGameOver) {
    drawGameOverScreen(context);
    return;
  }

  if (state.isPaused) {
    drawPauseScreen(context);
    window.requestAnimationFrame(gameLoop);
    return;
  }

  if (!state.isPaused) {
    let renderBoardProps: any = {
      context,
      canvas,
      linesElement,
      levelElement,
      scoreElement,
    };
    renderBoard(renderBoardProps);
  }

  handleGravityCollisions({
    time,
    nextPieceCanvas,
    nextPieceContext,
  });

  window.requestAnimationFrame(gameLoop);
}

// EVENT LISTENERS
function addEventListeners() {
  // Arrow key event listeners
  document.addEventListener('keydown', (event) => {
    if (state.isPaused) return;
    handleArrowKeys(event, () =>
      solidifyPiece({ nextPieceCanvas, nextPieceContext }),
    );
  });

  // Pause key event listener
  document.addEventListener('keydown', (event) => handlePause(event));

  // Enter key event listener
  document.addEventListener('keydown', (event) =>
    handleEnterKey(event, () => resetGame(gameLoop)),
  );

  // R key event listener
  document.addEventListener('keydown', (event) =>
    handleRkey(event, () => resetGame(gameLoop)),
  );
}

// Execute the game for the first time
addEventListeners();
gameLoop();
