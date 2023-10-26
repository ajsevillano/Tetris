import { drawBoard } from '../draws';
import updateElementText from '../../helpers/validators';
import renderFallingPieces from './renderFallingPieces';
import renderSolidifiedPieces from './renderSolidifiedPieces';
import { RenderBoardProps } from './types';
import { states } from '../../globalStates';

export default function renderBoard({
  context,
  canvas,
  linesElement,
  levelElement,
  scoreElement,
}: RenderBoardProps) {
  drawBoard(context, canvas);
  renderFallingPieces(context);
  renderSolidifiedPieces(context);
  // Update state
  updateElementText(scoreElement, states.getScore());
  updateElementText(levelElement, states.getLevel());
  updateElementText(linesElement, states.getTotalLinesRemoved());
}
