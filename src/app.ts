// Global state
import { states } from './globalStates';
// Styles
import './style.css';
// Constants
import { CANVAS_CONFIG } from './const';
// Libs
import shouldIncreaseFallSpeed from './libs/checkFallSpeed';
import renderBoard from './libs/renders/renderBoard';
import resetGame from './libs/resetGame';
import solidifyPiece from './libs/solidifyPiece';
import handleGravityCollisions from './libs/handleGravityCollisions';
import {
  handlePause,
  handleEnterKey,
  handleRkey,
  handleArrowKeys,
  handleSpace,
} from './libs/handleKeyEvents';
import {
  drawPauseScreen,
  drawGameOverScreen,
  drawNextPieceOnCanvas,
} from './libs/draws';
import checkCollision from './libs/checkCollisions';

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

let controllerIndex: any = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let greenPressed = false;
let bluePressed = false;

function gameLoop(time = 0) {
  console.log(states.getFallSpeed());
  // Check if the fall speed should be increased
  shouldIncreaseFallSpeed();
  drawNextPieceOnCanvas(nextPieceCanvas, nextPieceContext);

  if (states.getIsGameOver()) {
    drawGameOverScreen(context);
    return;
  }

  if (states.getIsPaused()) {
    drawPauseScreen(context);
    window.requestAnimationFrame(gameLoop);
    return;
  }

  if (!states.getIsPaused()) {
    let renderBoardProps: any = {
      context,
      canvas,
      linesElement,
      levelElement,
      scoreElement,
    };
    renderBoard(renderBoardProps);
    controllerInput();
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
    if (states.getIsPaused()) return;
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

  document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      handleSpace(() => solidifyPiece({ nextPieceCanvas, nextPieceContext }));
    }
  });
}

let lastMoveTime = 0;
const moveInterval = 60;
const downMoveInterval = 20;
const hardPushInterval = 200;

function controllerInput() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];

    if (gamepad) {
      const buttons = gamepad.buttons;
      const UpArrow = buttons[12].pressed;
      const DownArrow = buttons[13].pressed;
      const LeftArrow = buttons[14].pressed;
      const RightArrow = buttons[15].pressed;
      const greenButton = buttons[0].pressed;
      const blueButton = buttons[1].pressed;

      // Right arrow
      if (RightArrow && Date.now() - lastMoveTime > moveInterval) {
        const updatedPiece = states.getPiece();
        updatedPiece.position.x++;
        states.setPiece(updatedPiece);
        if (checkCollision()) {
          updatedPiece.position.x--;
          states.setPiece(updatedPiece);
        }
        lastMoveTime = Date.now();
      }

      // Left arrow
      if (LeftArrow && Date.now() - lastMoveTime > moveInterval) {
        const updatedPiece = states.getPiece();
        updatedPiece.position.x--;
        states.setPiece(updatedPiece);
        if (checkCollision()) {
          updatedPiece.position.x++;
          states.setPiece(updatedPiece);
        }
        lastMoveTime = Date.now();
      }

      // Down arrow
      if (DownArrow && Date.now() - lastMoveTime > downMoveInterval) {
        const updatedPiece = states.getPiece();
        updatedPiece.position.y++;
        states.setPiece(updatedPiece);
        if (checkCollision()) {
          updatedPiece.position.y--;
          states.setPiece(updatedPiece);
          solidifyPiece({ nextPieceCanvas, nextPieceContext }); // <-- pass an argument here
        }
        lastMoveTime = Date.now();
      }

      // Green button
      if (greenButton && !greenPressed) {
        const updatedPiece = states.getPiece();
        const rotated = [];
        greenPressed = true;

        for (let i = 0; i < updatedPiece.shape[0].length; i++) {
          const row = [];
          for (let j = updatedPiece.shape.length - 1; j >= 0; j--) {
            row.push(updatedPiece.shape[j][i]);
          }
          rotated.push(row);
        }
        const previousShape = updatedPiece.shape;
        updatedPiece.shape = rotated;
        states.setPiece(updatedPiece);
        if (checkCollision()) {
          updatedPiece.shape = previousShape;
          states.setPiece(updatedPiece);
        }
      } else if (!greenButton) {
        greenPressed = false;
      }

      // Blue button
      if (blueButton && Date.now() - lastMoveTime > hardPushInterval) {
        let piece = states.getPiece();
        if (states.getIsGameOver()) return;
        while (!checkCollision()) {
          piece.position.y++;
          states.setPiece(piece);
        }

        piece.position.y--;

        states.setPiece(piece);
        solidifyPiece({ nextPieceCanvas, nextPieceContext });
        lastMoveTime = Date.now();
      }
    }
  }
}

// Execute the game for the first time
window.addEventListener('gamepadconnected', (e) => {
  controllerIndex = e.gamepad.index;
  console.log(
    'Gamepad connected at index %d: %s. %d buttons, %d axes.',
    e.gamepad.index,
    e.gamepad.id,
    e.gamepad.buttons.length,
    e.gamepad.axes.length,
  );
  console.log(e.gamepad);
});

window.addEventListener('gamepaddisconnected', (e) => {
  console.log(
    'Gamepad disconnected from index %d: %s',
    e.gamepad.index,
    e.gamepad.id,
  );
  controllerIndex = null;
});

addEventListeners();
gameLoop();
