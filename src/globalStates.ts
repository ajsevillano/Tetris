// Libs
import createBoardMatrix from './libs/createBoardMatrix';
import generateRandomPiece from './libs/generateRandomPiece';
// Const
import { CANVAS_CONFIG, SCORE_CONFIG, SPEED_CONFIG } from './const';

export const state = {
  dropCounter: 0,
  lastTime: 0,
  piece: generateRandomPiece(),
  board: createBoardMatrix(
    CANVAS_CONFIG.MAIN.BOARD_WIDTH,
    CANVAS_CONFIG.MAIN.BOARD_HEIGHT,
  ),
};

export const states = (function () {
  const { INITIAL_LEVEL, INITIAL_SCORE } = SCORE_CONFIG;
  const { DEFAULT_FALL_SPEED } = SPEED_CONFIG;

  let score = INITIAL_SCORE;
  let level = INITIAL_LEVEL;
  let totalLinesRemoved = 0;
  let fallSpeed = DEFAULT_FALL_SPEED;
  let isGameOver = false;
  let isPaused = false;
  let board = createBoardMatrix(
    CANVAS_CONFIG.MAIN.BOARD_WIDTH,
    CANVAS_CONFIG.MAIN.BOARD_HEIGHT,
  );
  let nextPiece = generateRandomPiece();

  const updateScore = (newScore: any) => {
    score = newScore;
  };

  const updateLevel = (newLevel: any) => {
    level = newLevel;
  };

  const updateTotalLinesRemoved = (newTotalLinesRemoved: any) => {
    totalLinesRemoved = newTotalLinesRemoved;
  };

  const updateFallSpeed = (newFallSpeed: any) => {
    fallSpeed = newFallSpeed;
  };

  const updateIsGameOver = (newIsGameOver: any) => {
    isGameOver = newIsGameOver;
  };

  const updateIsPaused = (newIsPaused: any) => {
    isPaused = newIsPaused;
  };

  const getScore = () => {
    return score;
  };

  const getLevel = () => {
    return level;
  };

  const getTotalLinesRemoved = () => {
    return totalLinesRemoved;
  };

  const getFallSpeed = () => {
    return fallSpeed;
  };

  const getIsGameOver = () => {
    return isGameOver;
  };

  const getIsPaused = () => {
    return isPaused;
  };

  const getBoard = () => {
    return board;
  };

  const setBoard = (newBoard: any) => {
    board = newBoard;
  };

  const getNextPiece = () => {
    return nextPiece;
  };

  const setNextPiece = (newNextPiece: any) => {
    nextPiece = newNextPiece;
  };

  return {
    updateScore,
    updateLevel,
    updateTotalLinesRemoved,
    updateFallSpeed,
    updateIsGameOver,
    updateIsPaused,
    getFallSpeed,
    getScore,
    getLevel,
    getTotalLinesRemoved,
    getIsGameOver,
    getIsPaused,
    getBoard,
    setBoard,
    getNextPiece,
    setNextPiece,
  };
})();
