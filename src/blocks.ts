const TETROMINOES = [
  {
    shape: [[1, 1, 1, 1]],
    color: '#2bace2', // I-BLOCK (light blue)
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: '#005a9d', // J PIECE (blue)
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: '#FFA500', // L-BLOCK (orange)
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#fde100', //  O-BLOCK (yellow)
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#4eb748', // S-BLOCK (green)
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: '#922b8c', //  T-BLOCK (purple)
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#ee2733', // Z-BLOCK (red)
  },
];

export default TETROMINOES;
