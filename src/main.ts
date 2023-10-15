// Styles
import './style.css';
// Constants
import { CANVAS_CONFIG, SPEED_CONFIG } from './const';
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
} from './libs/draws';

// Canvas
const canvas: any = document.querySelector('canvas');
const context = canvas?.getContext('2d');
canvas.width = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_WIDTH;
canvas.height = CANVAS_CONFIG.BLOCK_SIZE * CANVAS_CONFIG.BOARD_HEIGHT;
context.scale(CANVAS_CONFIG.BLOCK_SIZE, CANVAS_CONFIG.BLOCK_SIZE);

// Next piece canvas
const nextPieceCanvas: any = document.getElementById('nextPieceCanvas');
const nextPieceContext = nextPieceCanvas.getContext('2d');

nextPieceContext.fillStyle = '#0d0d0d';
nextPieceContext.fillRect(0, 0, nextPieceCanvas.width, nextPieceCanvas.height);

// Score
const scoreElement: any = document.querySelector('span');
const levelElement: any = document.querySelector('.level');

// STATES
let score = 0;
// Fall speed
let level = 0;
let fallSpeed = SPEED_CONFIG.DEFAULT_FALL_SPEED;
// Pause
let isPaused = false;
// Game over
let isGameOver = false;
// Drop counter
let dropCounter = 0;
let lastTime = 0;

// Board
const board = createBoardMatrix(
  CANVAS_CONFIG.BOARD_WIDTH,
  CANVAS_CONFIG.BOARD_HEIGHT,
);

let piece = generateRandomPiece();

//////////////////////////////// NUEVO ///////////////////////////////////////
// Nueva función para generar la siguiente pieza
let nextPiece = generateRandomPiece();

// Función para mostrar la siguiente pieza en nextPieceCanvas
function drawNextPieceOnCanvas(piece: any) {
  nextPieceContext.clearRect(
    0,
    0,
    nextPieceCanvas.width,
    nextPieceCanvas.height,
  );

  const scale = 15; // Puedes ajustar el valor de escala según tus preferencias

  const pieceWidth = piece.shape[0].length;
  const pieceHeight = piece.shape.length;

  // Calcula el tamaño escalado de la pieza
  const scaledWidth = pieceWidth * scale;
  const scaledHeight = pieceHeight * scale;

  // Ajusta el desplazamiento para centrar la pieza
  const offsetX = (nextPieceCanvas.width - scaledWidth) / 2;
  const offsetY = (nextPieceCanvas.height - scaledHeight) / 2;

  // Dibuja la siguiente pieza escalada en el nextPieceCanvas
  piece.shape.forEach((row: any[], y: number) => {
    row.forEach((value, x: number) => {
      if (value) {
        const xPos = x * scale + offsetX;
        const yPos = y * scale + offsetY;
        nextPieceContext.fillStyle = piece.color;
        nextPieceContext.fillRect(xPos, yPos, scale, scale);
      }
    });
  });
}

//////////////////////////////// FIN DE NUEVO ///////////////////////////////////////

function gameLoop(time = 0) {
  // Increase the piece speed of descent according to the constant POINTS_NEXT_LEVEL
  const result = incrementFallSpeed(score, level, fallSpeed);
  level = result.level;
  fallSpeed = result.fallSpeed;

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
    isGameOver = true;
    board.forEach((row) => row.fill(0));
  }
  // Cambiar a la siguiente pieza en nextPieceCanvas
  nextPiece = generateRandomPiece();
  drawNextPieceOnCanvas(nextPiece);
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
drawNextPieceOnCanvas(nextPiece);

gameLoop();
