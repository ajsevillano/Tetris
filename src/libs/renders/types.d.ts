export type Board = number[][] | Cell[][];

export interface Cell {
  color: string;
  border: string;
}

export interface Piece {
  position: {
    x: number;
    y: number;
  };
  shape: number[][];
  color: string;
  border: string;
}

export interface RenderBoardProps {
  context: CanvasRenderingContext2D | null | undefined;
  canvas: HTMLCanvasElement | null;
  piece: Piece;
  board: Board;
  totalLinesRemoved: number;
  level: number;
  score: number;
  linesElement: HTMLElement | null;
  levelElement: HTMLElement | null;
  scoreElement: HTMLElement | null;
}
