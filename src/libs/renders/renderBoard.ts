import { drawBoard } from '../draws';
import updateElementText from '../../helpers/validators';
import renderFallingPieces from './renderFallingPieces';
import renderSolidifiedPieces from './renderSolidifiedPieces';
import { RenderBoardProps } from './types';
import { globalVariables } from '../../globalStates';

export default function renderBoard({
  context,
  canvas,
  piece,
  board,
  linesElement,
  levelElement,
  scoreElement,
}: RenderBoardProps) {
  drawBoard(context, canvas);
  renderFallingPieces(piece, context);
  renderSolidifiedPieces(board, context);
  // Update states
  updateElementText(scoreElement, globalVariables.score);
  updateElementText(levelElement, globalVariables.level);
  updateElementText(linesElement, globalVariables.totalLinesRemoved);
}
