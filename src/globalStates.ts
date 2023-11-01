// Libs
import createBoardMatrix from './libs/createBoardMatrix';
import generateRandomPiece from './libs/generateRandomPiece';
// Const
import { CANVAS_CONFIG, SCORE_CONFIG, SPEED_CONFIG } from './const';

export const state = {
  dropCounter: 0,
  lastTime: 0,
};

export const states: any = (function () {
  const { INITIAL_LEVEL, INITIAL_SCORE } = SCORE_CONFIG;
  const { DEFAULT_FALL_SPEED } = SPEED_CONFIG;

  let state = {
    score: INITIAL_SCORE,
    level: INITIAL_LEVEL,
    totalLinesRemoved: 0,
    fallSpeed: DEFAULT_FALL_SPEED,
    isGameOver: false,
    isPaused: false,
    board: createBoardMatrix(
      CANVAS_CONFIG.MAIN.BOARD_WIDTH,
      CANVAS_CONFIG.MAIN.BOARD_HEIGHT,
    ),
    nextPiece: generateRandomPiece(),
    piece: generateRandomPiece(),
    controllerIndex: null,
  };

  // Getters
  const getScore = () => state.score;
  const getLevel = () => state.level;
  const getTotalLinesRemoved = () => state.totalLinesRemoved;
  const getFallSpeed = () => state.fallSpeed;
  const getIsGameOver = () => state.isGameOver;
  const getIsPaused = () => state.isPaused;
  const getBoard = () => state.board;
  const getNextPiece = () => state.nextPiece;
  const getPiece = () => state.piece;
  const getControllerIndex = () => state.controllerIndex;

  // Setters
  const setScore = (newScore: any) => (state.score = newScore);
  const setLevel = (newLevel: any) => (state.level = newLevel);
  const setFallSpeed = (newFallSpeed: any) => (state.fallSpeed = newFallSpeed);
  const setIsGameOver = (newIsGameOver: any) =>
    (state.isGameOver = newIsGameOver);
  const setIsPaused = (newIsPaused: any) => (state.isPaused = newIsPaused);
  const setBoard = (newBoard: any) => (state.board = newBoard);
  const setPiece = (newPiece: any) => (state.piece = newPiece);
  const setNextPiece = (newNextPiece: any) => (state.nextPiece = newNextPiece);
  const setTotalLinesRemoved = (newTotalLinesRemoved: any) =>
    (state.totalLinesRemoved = newTotalLinesRemoved);
  const setControllerIndex = (newControllerIndex: any) =>
    (state.controllerIndex = newControllerIndex);

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
    getControllerIndex,
    setBoard,
    setNextPiece,
    setScore,
    setLevel,
    setTotalLinesRemoved,
    setFallSpeed,
    setIsGameOver,
    setIsPaused,
    setPiece,
    setControllerIndex,
  };
})();
