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
  let score = states.getScore();
  let level = states.getLevel();
  let totalLinesRemoved = states.getTotalLinesRemoved();

  drawBoard(context, canvas);
  renderFallingPieces(context);
  renderSolidifiedPieces(context);
  // Update state
  updateElementText(scoreElement, score);
  updateElementText(levelElement, level);
  updateElementText(linesElement, totalLinesRemoved);
}
