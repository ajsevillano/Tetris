import { drawPieces } from '../draws';
import { Piece } from './types';

export default function renderFallingPieces(piece: Piece, context: any) {
  piece.shape.forEach((row: number[], y: number) => {
    row.forEach((cell, x) => {
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
