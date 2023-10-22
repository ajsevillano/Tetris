import { drawPieces } from '../draws';
import { Cell } from './types';
import { state } from '../../globalStates';

export default function renderSolidifiedPieces(context: any) {
  state.board.forEach((row: (number | Cell)[], y: number) => {
    row.forEach((cell: Cell | number, x: number) => {
      // If the cell is not empty, draw it
      if (typeof cell !== 'number') {
        const pieceProps = {
          value: cell.color,
          border: cell.border,
          x: x,
          y: y,
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
