import { drawPieces } from '../draws';
import { Cell } from './types';
import { state } from '../../globalStates';

export default function renderFallingPieces(context: any) {
  state.piece.shape.forEach((row: number[], y: number) => {
    row.forEach((cell: Cell | number, x: number) => {
      if (cell) {
        const pieceProps = {
          value: state.piece.color,
          border: state.piece.border,
          x: x + state.piece.position.x,
          y: y + state.piece.position.y,
          context: context,
          lineWidth: 0.06,
          width: 1,
          height: 1,
        };
        drawPieces(pieceProps);
      }
    });
  });
}
