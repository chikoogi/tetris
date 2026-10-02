const boardElement = document.getElementById('game-board');
const nextBlockElement = document.getElementById('next-block');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const levelElement = document.getElementById('level');

function createCell(x, y, size) {
  const cell = document.createElement('div');
  cell.classList.add('block');
  cell.style.width = `${size}px`;
  cell.style.height = `${size}px`;
  cell.style.left = `${x * size}px`;
  cell.style.top = `${y * size}px`;
  return cell;
}

function renderBoard(board, piece) {
  boardElement.innerHTML = '';
  forEachCell(board, (x, y) => {
    boardElement.appendChild(createCell(x, y, BLOCK_SIZE));
  });
  forEachCell(piece.shape, (x, y) => {
    boardElement.appendChild(createCell(piece.x + x, piece.y + y, BLOCK_SIZE));
  });
}

function renderNext(shape) {
  nextBlockElement.innerHTML = '';
  forEachCell(shape, (x, y) => {
    nextBlockElement.appendChild(createCell(x, y, PREVIEW_BLOCK_SIZE));
  });
}

function renderScore(score) {
  scoreElement.textContent = `점수: ${score}`;
}

function renderTimer(seconds) {
  timerElement.textContent = `시간: ${seconds}초`;
}

function renderLevel(level) {
  levelElement.textContent = `단계: ${level}`;
}
