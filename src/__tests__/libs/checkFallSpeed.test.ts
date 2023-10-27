import shouldIncreaseFallSpeed from '../../libs/checkFallSpeed';
import { states } from '../../globalStates';
import { describe, expect, test, beforeEach } from 'vitest';

describe('shouldIncreaseFallSpeed', () => {
  beforeEach(() => {
    // Reset global state before each test
    states.setLevel(0);
    states.setFallSpeed(1000);
    states.setTotalLinesRemoved(0);
  });

  test('should not increase fall speed if total lines removed is less than the required amount', () => {
    states.setTotalLinesRemoved(17);
    states.setLevel(1);
    shouldIncreaseFallSpeed();
    expect(states.getLevel()).toBe(1);
    expect(states.getFallSpeed()).toBe(1000);
  });

  test('should increase level and decrease fall speed if total lines removed is greater than or equal to the required amount', () => {
    // Set total lines removed to the required amount for level 1
    states.setTotalLinesRemoved(10);
    shouldIncreaseFallSpeed();
    expect(states.getLevel()).toBe(1);
    expect(states.getFallSpeed()).toBe(950);
  });

  test('should cap fall speed at 50', () => {
    // Set total lines removed to the required amount for level 20
    states.setLevel(23);
    states.setTotalLinesRemoved(240);
    states.setFallSpeed(10);
    shouldIncreaseFallSpeed();
    expect(states.getLevel()).toBe(24);
    expect(states.getFallSpeed()).toBe(50);
  });
});
