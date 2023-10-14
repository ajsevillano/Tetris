const createBoardMatrix = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
};

export default createBoardMatrix;
