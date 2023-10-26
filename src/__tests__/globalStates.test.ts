import { states } from '../globalStates';
import { describe, expect, test, beforeEach } from 'vitest';
import resetGame from '../libs/resetGame';

// globalStates.test.js

describe('Test suite for states functions', () => {
  beforeEach(() => {
    // Reset the state before each test
    resetGame(() => {});
  });

  test('setScore should correctly update the score in the states', () => {
    const newScore = 100;
    states.setScore(newScore);
    expect(states.getScore()).toBe(newScore);
  });

  test('getScore should return the current score from the states', () => {
    const currentScore = states.getScore();
    expect(currentScore).toBe(0); // Assuming the initial score is 0
  });

  test('setLevel should correctly update the level in the states', () => {
    const newLevel = 2;
    states.setLevel(newLevel);
    expect(states.getLevel()).toBe(newLevel);
  });

  test('getLevel should return the current level from the states', () => {
    const currentLevel = states.getLevel();
    expect(currentLevel).toBe(0);
  });
  test('setTotalLinesRemoved should correctly update the totalLinesRemoved in the states', () => {
    const newTotalLinesRemoved = 100;
    states.setTotalLinesRemoved(newTotalLinesRemoved);
    expect(states.getTotalLinesRemoved()).toBe(newTotalLinesRemoved);
  });
  test('getTotalLinesRemoved should return the current totalLinesRemoved from the states', () => {
    const currentTotalLinesRemoved = states.getTotalLinesRemoved();
    expect(currentTotalLinesRemoved).toBe(0);
  });
  test('setFallSpeed should correctly update the fallSpeed in the states', () => {
    const newFallSpeed = 100;
    states.setFallSpeed(newFallSpeed);
    expect(states.getFallSpeed()).toBe(newFallSpeed);
  });
  test('getFallSpeed should return the current fallSpeed from the states', () => {
    const currentFallSpeed = states.getFallSpeed();
    expect(currentFallSpeed).toBe(1000);
  });
  test('setIsGameOver should correctly update the isGameOver in the states', () => {
    const newIsGameOver = true;
    states.setIsGameOver(newIsGameOver);
    expect(states.getIsGameOver()).toBe(newIsGameOver);
  });
  test('getIsGameOver should return the current isGameOver from the states', () => {
    const currentIsGameOver = states.getIsGameOver();
    expect(currentIsGameOver).toBe(false);
  });
  test('setIsPaused should correctly update the isPaused in the states', () => {
    const newIsPaused = true;
    states.setIsPaused(newIsPaused);
    expect(states.getIsPaused()).toBe(newIsPaused);
  });
  test('getIsPaused should return the current isPaused from the states', () => {
    const currentIsPaused = states.getIsPaused();
    expect(currentIsPaused).toBe(false);
  });
});
