import { drawBoard, drawPieces } from './draws';

export default function renderTetrisBoard(
  context: any,
  canvas: any,
  piece: any,
  board: any,
  totalLinesRemoved: any,
  level: any,
  score: any,
  linesElement: HTMLElement | null,
  levelElement: HTMLElement | null,
  scoreElement: HTMLElement | null,
) {
  // Draw the board & it background grid
  drawBoard(context, canvas);

  // Loop through piece and create the falling pieces
  piece.shape.forEach((row: any[], y: number) => {
    row.forEach((value, x) => {
      if (value) {
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

  // Loop through board and create pieces on the botton when solidified
  board.forEach((row: any, y: any) => {
    row.forEach((cell: any, x: any) => {
      if (cell !== 0) {
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

  if (scoreElement) scoreElement.innerText = score;
  if (linesElement) linesElement.innerText = totalLinesRemoved;
  if (levelElement) levelElement.innerText = level;
}
