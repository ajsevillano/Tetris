/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest';
import { drawBoard } from '../../libs/draws';

describe('Test suite for drawBoard function', () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  test('drawBoard should draw the board on the canvas', () => {
    const initialCanvasContent = canvas.toDataURL();
    drawBoard(context, canvas);
    const updatedCanvasContent = canvas.toDataURL();

    // The canvas content should be updated
    expect(updatedCanvasContent).not.toBe(initialCanvasContent);
  });
});
