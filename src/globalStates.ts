// Libs
import createBoardMatrix from './libs/createBoardMatrix';
import generateRandomPiece from './libs/generateRandomPiece';
// Const
import { CANVAS_CONFIG, SCORE_CONFIG, SPEED_CONFIG } from './const';

export const state = {
  dropCounter: 0,
  lastTime: 0,
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
  let piece = generateRandomPiece();

  const setScore = (newScore: any) => {
    score = newScore;
  };

  const setLevel = (newLevel: any) => {
    level = newLevel;
  };

  const setTotalLinesRemoved = (newTotalLinesRemoved: any) => {
    totalLinesRemoved = newTotalLinesRemoved;
  };

  const setFallSpeed = (newFallSpeed: any) => {
    fallSpeed = newFallSpeed;
  };

  const setIsGameOver = (newIsGameOver: any) => {
    isGameOver = newIsGameOver;
  };

  const setIsPaused = (newIsPaused: any) => {
    isPaused = newIsPaused;
  };

  const setBoard = (newBoard: any) => {
    board = newBoard;
  };

  const setPiece = (newPiece: any) => {
    piece = newPiece;
  };

  const setNextPiece = (newNextPiece: any) => {
    nextPiece = newNextPiece;
  };

  // Getters
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

  const getNextPiece = () => {
    return nextPiece;
  };

  const getPiece = () => {
    return piece;
  };

  return {
    getPiece,
    getFallSpeed,
    getScore,
    getLevel,
    getTotalLinesRemoved,
    getIsGameOver,
    getIsPaused,
    getBoard,
    getNextPiece,
    setBoard,
    setNextPiece,
    setScore,
    setLevel,
    setTotalLinesRemoved,
    setFallSpeed,
    setIsGameOver,
    setIsPaused,
    setPiece,
  };
})();
