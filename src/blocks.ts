const TETROMINOES = [
  {
    shape: [[1, 1, 1, 1]],
    color: '#2bace2', // Color para el I-BLOCK (rojo)
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: '#005a9d', // Color para el J PIECE (azul)
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: '#FFA500', // Color para el L-BLOCK (naranja)
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#fde100', // Color para el O-BLOCK (amarillo)
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#4eb748', // S-BLOCK color (green)
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: '#922b8c', // Color para el T-BLOCK (morado)
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#ee2733', // Color para el Z-BLOCK (magenta)
  },
];

export default TETROMINOES;
