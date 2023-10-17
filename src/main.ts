// Styles
import './style.css';
// Constants
import { CANVAS_CONFIG, SCORE_CONFIG, SPEED_CONFIG } from './const';
// Libs
import { handlePause } from './libs/keyboardEvents';
import generateRandomPiece from './libs/generateRandomPiece';
import checkCollision from './libs/checkCollisions';
import incrementFallSpeed from './libs/incrementFallSpeed';
import checkAndRemoveRows from './libs/removeRows';
import createBoardMatrix from './libs/createBoardMatrix';
import {
  addArrowKeyEventListener,
  addEnterKeyEventListener,
  addPauseKeyEventListener,
  addRkeyEventListener,
} from './eventListeners';
import {
  drawBoard,
  drawPauseScreen,
  drawPieces,
  drawGameOverScreen,
  drawNextPieceOnCanvas,
} from './libs/draws';

// Canvas
const canvas: any = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = CANVAS_CONFIG.MAIN.BLOCK_SIZE * CANVAS_CONFIG.MAIN.BOARD_WIDTH;
canvas.height = CANVAS_CONFIG.MAIN.BLOCK_SIZE * CANVAS_CONFIG.MAIN.BOARD_HEIGHT;
context.scale(CANVAS_CONFIG.MAIN.BLOCK_SIZE, CANVAS_CONFIG.MAIN.BLOCK_SIZE);

// Next piece canvas
const nextPieceCanvas: any = document.getElementById('nextPieceCanvas');
const nextPieceContext = nextPieceCanvas.getContext('2d');
nextPieceCanvas.width =
  CANVAS_CONFIG.NEXT_PIECE.BLOCK_SIZE * CANVAS_CONFIG.NEXT_PIECE.BOARD_WIDTH;
nextPieceCanvas.height =
  CANVAS_CONFIG.NEXT_PIECE.BLOCK_SIZE * CANVAS_CONFIG.NEXT_PIECE.BOARD_HEIGHT;

// Score
const linesElement: any = document.querySelector('#lines');
const levelElement: any = document.querySelector('.level');

// STATES
let score = SCORE_CONFIG.INITIAL_SCORE;
// Total lines removed
let totalLinesRemoved = 0;
// Fall speed
let level = SCORE_CONFIG.INITIAL_LEVEL;
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

// Draw the next piece on the nextPieceCanvas

function gameLoop(time = 0) {
  // Increase the piece speed of descent according to the constant POINTS_NEXT_LEVEL
  const result = incrementFallSpeed(score, level, fallSpeed, totalLinesRemoved);
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

  // Game pause logic
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
    renderTetrisBoard();
  } else {
    drawPauseScreen(context);
  }
  window.requestAnimationFrame(gameLoop);
}

function renderTetrisBoard() {
  // Draw the board & it background grid
  drawBoard(context, canvas);

  // Loop through piece and create the falling pieces
  piece.shape.forEach((row: any[], y: number) => {
    row.forEach((value, x) => {
      if (value) {
        const pieceProps = {
          value: piece.color,
          border: piece.border,
          x: x + piece.position.x,
          y: y + piece.position.y,
          context: context,
          lineWidth: 0.06,
          width: 1,
          height: 1,
        };

        drawPieces(pieceProps);
      }
    });
  });

  // Loop through board and create pieces on the botton when solidified
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        const pieceProps = {
          value: cell.color,
          border: cell.border,
          x: x,
          y: y,
          context: context,
          lineWidth: 0.06,
          width: 1,
          height: 1,
        };

        drawPieces(pieceProps);
      }
    });
  });

  linesElement.innerText = totalLinesRemoved;
  levelElement.innerText = level;
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

  // reset position
  piece.position.x = Math.floor(CANVAS_CONFIG.MAIN.BOARD_WIDTH / 2);
  piece.position.y = 0;
  // get random piece
  piece = nextPiece;
  // Game over
  if (checkCollision(piece, board)) {
    isGameOver = true;
    board.forEach((row) => row.fill(0));
  }
  // Cambiar a la siguiente pieza en nextPieceCanvas
  nextPiece = generateRandomPiece();
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

// Getters
const getPiece = () => piece;
const getBoard = () => board;

// Arrow key event listeners
addArrowKeyEventListener(
  isPaused,
  getPiece,
  getBoard,
  solidifyPiece,
  generateRandomPiece,
);

// Pause key event listener
addPauseKeyEventListener((event: any) => {
  isPaused = handlePause(event, isPaused);
});

// Enter key event listener
addEnterKeyEventListener(() => {
  if (isGameOver) {
    reStartGame();
  }
});

// R key event listener
addRkeyEventListener(() => {
  reStartGame();
});

// Execute the game for the first time

gameLoop();
