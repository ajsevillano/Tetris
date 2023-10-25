import { drawPieces } from '../draws';
import { Cell } from './types';
import { states } from '../../globalStates';

export default function renderFallingPieces(context: any) {
  states.getPiece().shape.forEach((row: number[], y: number) => {
    row.forEach((cell: Cell | number, x: number) => {
      if (cell) {
        const pieceProps = {
          value: states.getPiece().color,
          border: states.getPiece().border,
          x: x + states.getPiece().position.x,
          y: y + states.getPiece().position.y,
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
