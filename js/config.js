const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;
const PREVIEW_BLOCK_SIZE = BLOCK_SIZE / 2;

const LINES_PER_LEVEL = 10;
const BASE_DROP_INTERVAL = 1000;
const DROP_INTERVAL_STEP = 100;
const MIN_DROP_INTERVAL = 100;
const SCORE_PER_PIECE = 10;

const TETROMINOES = [
  [[1, 1, 1, 1]],          // I
  [[1, 1], [1, 1]],        // O
  [[0, 1, 0], [1, 1, 1]],  // T
  [[1, 1, 0], [0, 1, 1]],  // Z
  [[0, 1, 1], [1, 1, 0]],  // S
  [[1, 0, 0], [1, 1, 1]],  // L
  [[0, 0, 1], [1, 1, 1]],  // J
];
