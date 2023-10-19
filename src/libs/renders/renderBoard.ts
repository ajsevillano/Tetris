import { drawBoard } from '../draws';
import updateElementText from '../../helpers/validators';
import renderFallingPieces from './renderFallingPieces';
import renderSolidifiedPieces from './renderSolidifiedPieces';
import { RenderBoardProps } from './types';

export default function renderBoard({
  context,
  canvas,
  piece,
  board,
  totalLinesRemoved,
  level,
  score,
  linesElement,
  levelElement,
  scoreElement,
}: RenderBoardProps) {
  drawBoard(context, canvas);
  renderFallingPieces(piece, context);
  renderSolidifiedPieces(board, context);
  // Update states
  updateElementText(scoreElement, score);
  updateElementText(levelElement, level);
  updateElementText(linesElement, totalLinesRemoved);
}
