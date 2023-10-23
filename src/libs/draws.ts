import { state } from '../globalStates';

export function drawBoard(context: any, canvas: any) {
  context.fillStyle = '#121212';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawGridBackground(context, canvas);
}

function drawGridBackground(context: any, canvas: any) {
  const gridSize = 1; // Size of the grid blocks
  context.strokeStyle = '#0d0d0d'; // Colour of the grid lines
  context.lineWidth = 0.04; // Width of the grid lines

  for (let x = 0; x < canvas.width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
}

export function drawPauseScreen(context: any) {
  context.fillStyle = 'black';
  context.fillRect(4, 14, 6, 1);
  context.font = "1px 'Press Start 2P'";
  context.fillStyle = 'white';
  context.fillText('PAUSED', 4, 15);
}

export function drawGameOverScreen(context: any) {
  context.fillStyle = 'black';
  context.fillRect(2, 14, 9, 1);
  context.font = "1px 'Press Start 2P'";
  context.fillStyle = 'white';
  context.fillText('GAME OVER', 2, 15);
}

interface DrawPiecesProps {
  value: string;
  border: string;
  x: number;
  y: number;
  context: CanvasRenderingContext2D;
  lineWidth: number;
  width: number;
  height: number;
}

export function drawPieces({
  value,
  border,
  x,
  y,
  context,
  lineWidth,
  width,
  height,
}: DrawPiecesProps) {
  // Define color for pieces
  context.fillStyle = value;
  context.strokeStyle = border;
  context.lineWidth = lineWidth;
  // Draw border for  pieces
  context.fillRect(x, y, width, height);
  context.strokeRect(
    x + lineWidth,
    y + lineWidth,
    width - 2 * lineWidth,
    height - 2 * lineWidth,
  );
}

export function drawNextPieceOnCanvas(
  nextPieceCanvas: any,
  nextPieceContext: any,
) {
  drawBoard(nextPieceContext, nextPieceCanvas);

  const scale = 25;
  const pieceWidth = state.nextPiece.shape[0].length;
  const pieceHeight = state.nextPiece.shape.length;

  // Calculate the scaled width and height of the piece
  const scaledWidth = pieceWidth * scale;
  const scaledHeight = pieceHeight * scale;

  // Ajusta el desplazamiento para centrar la pieza
  const offsetX = (nextPieceCanvas.width - scaledWidth) / 2;
  const offsetY = (nextPieceCanvas.height - scaledHeight) / 2;

  // Draw the piece
  state.nextPiece.shape.forEach((row: any[], y: number) => {
    row.forEach((value, x: number) => {
      if (value) {
        const xPos = x * scale + offsetX;
        const yPos = y * scale + offsetY;
        const pieceProps = {
          value: state.nextPiece.color,
          border: state.nextPiece.border,
          x: xPos,
          y: yPos,
          context: nextPieceContext,
          lineWidth: 1.5,
          width: scale,
          height: scale,
        };
        // Apply a shadow effect to the next piece
        nextPieceContext.fillStyle = '#282828';
        nextPieceContext.fillRect(xPos + 4, yPos + 4, 25, 25);
        drawPieces(pieceProps);
      }
    });
  });
}
