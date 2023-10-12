const TETROMINOES = [
  {
    shape: [[1, 1, 1, 1]],
    color: '#2bace2', // I-BLOCK (light blue)
    border: '#1b79a1',
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: '#005a9d', // J PIECE (blue)
    border: '#004173',
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: '#FFA500', // L-BLOCK (orange)
    border: '#b36b00',
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#fde100', //  O-BLOCK (yellow)
    border: '#b39600',
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#4eb748', // S-BLOCK (green)
    border: '#2b6c3f',
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: '#922b8c', //  T-BLOCK (purple)
    border: '#5f1b50',
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#ee2733', // Z-BLOCK (red)
    border: '#a61c22',
  },
];

export default TETROMINOES;
