import { states } from '../../globalStates';
import { describe, expect, test } from 'vitest';
import resetGame from '../../libs/resetGame';

describe('Test suite for states functions', () => {
  test('setScore should correctly update the score in the states', () => {
    // Set mocks values
    states.setScore(400);
    states.setLevel(0);
    states.setTotalLinesRemoved(0);
    states.setIsGameOver(false);
    states.setIsPaused(false);
    states.setFallSpeed(1000);
    // Check the values are set correctly
    expect(states.getScore()).toBe(400);
    expect(states.getLevel()).toBe(0);
    expect(states.getTotalLinesRemoved()).toBe(0);
    expect(states.getIsGameOver()).toBe(false);
    expect(states.getIsPaused()).toBe(false);
    expect(states.getFallSpeed()).toBe(1000);
    // Reset the game
    resetGame(() => {});
    // Check the values are reset correctly
    expect(states.getScore()).toBe(0);
    expect(states.getLevel()).toBe(0);
    expect(states.getTotalLinesRemoved()).toBe(0);
    expect(states.getIsGameOver()).toBe(false);
    expect(states.getIsPaused()).toBe(false);
    expect(states.getFallSpeed()).toBe(1000);
    expect(states.getPiece().position.x).toBe(5);
    expect(states.getPiece().position.y).toBe(0);
    expect(states.getNextPiece().position.x).toBe(5);
    expect(states.getNextPiece().position.y).toBe(0);
  });
});
