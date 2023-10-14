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
  context.font = "1px 'Press Start 2P'";
  context.fillStyle = 'white';
  context.fillText('PAUSED', 4, 15);
}

export function drawPieces(
  value: string,
  border: any,
  x: number,
  y: number,
  context: any,
) {
  // Define color for pieces
  context.fillStyle = value;
  context.strokeStyle = border;
  context.lineWidth = 0.04;
  // Draw border for  pieces
  context.fillRect(x, y, 1, 1);
  context.strokeRect(x, y, 1, 1);
}
