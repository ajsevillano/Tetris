import { drawPieces } from '../draws';
import { Cell } from './types';
import { states } from '../../globalStates';

export default function renderFallingPieces(context: any) {
  let piece = states.getPiece();

  piece.shape.forEach((row: number[], y: number) => {
    row.forEach((cell: Cell | number, x: number) => {
      if (cell) {
        const pieceProps = {
          value: piece.color,
          border: piece.border,
          x: x + piece.position.x,
          y: y + piece.position.y,
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
