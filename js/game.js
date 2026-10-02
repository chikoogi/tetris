const state = {
  board: createBoard(),
  piece: null,       // { shape, x, y }
  nextShape: null,
  score: 0,
  level: 1,
  linesCleared: 0,
  elapsed: 0,
  dropTimer: null,
  clockTimer: null,
};

function dropInterval(level) {
  return Math.max(MIN_DROP_INTERVAL, BASE_DROP_INTERVAL - (level - 1) * DROP_INTERVAL_STEP);
}

function canMove(dx, dy, shape = state.piece.shape) {
  return canPlace(state.board, shape, state.piece.x + dx, state.piece.y + dy);
}

function spawnPiece() {
  const shape = state.nextShape;
  state.nextShape = randomShape();
  state.piece = {
    shape,
    x: Math.floor(BOARD_WIDTH / 2) - Math.ceil(shape[0].length / 2),
    y: 0,
  };
  renderNext(state.nextShape);
  renderBoard(state.board, state.piece);
}

function tryMove(dx, dy) {
  if (!canMove(dx, dy)) return false;
  state.piece.x += dx;
  state.piece.y += dy;
  renderBoard(state.board, state.piece);
  return true;
}

function rotate() {
  const rotated = rotateShape(state.piece.shape);
  // 회전 후 벽 밖으로 나가면 안쪽으로 밀어 넣는다
  const width = rotated[0].length;
  const x = Math.min(Math.max(state.piece.x, 0), BOARD_WIDTH - width);

  if (canPlace(state.board, rotated, x, state.piece.y)) {
    state.piece.shape = rotated;
    state.piece.x = x;
    renderBoard(state.board, state.piece);
  }
}

function hardDrop() {
  while (canMove(0, 1)) state.piece.y++;
  lockPiece();
}

function tick() {
  if (!tryMove(0, 1)) lockPiece();
}

function lockPiece() {
  const { shape, x, y } = state.piece;
  mergePiece(state.board, shape, x, y);

  const result = clearFullLines(state.board);
  state.board = result.board;
  state.linesCleared += result.cleared;

  state.score += SCORE_PER_PIECE * state.level;
  renderScore(state.score);

  if (state.linesCleared >= state.level * LINES_PER_LEVEL) {
    levelUp();
  }

  spawnPiece();
  if (!canMove(0, 0)) gameOver();
}

function levelUp() {
  state.level++;
  renderLevel(state.level);
  clearInterval(state.dropTimer);
  state.dropTimer = setInterval(tick, dropInterval(state.level));
}

function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':  tryMove(-1, 0); break;
    case 'ArrowRight': tryMove(1, 0); break;
    case 'ArrowDown':  tryMove(0, 1); break;
    case 'ArrowUp':    rotate(); break;
    case ' ':          hardDrop(); break;
    default: return;
  }
  event.preventDefault();
}

function startGame() {
  state.nextShape = randomShape();
  state.dropTimer = setInterval(tick, dropInterval(state.level));
  state.clockTimer = setInterval(() => {
    state.elapsed++;
    renderTimer(state.elapsed);
  }, 1000);
  document.addEventListener('keydown', handleKeyDown);
  spawnPiece();
}

function gameOver() {
  clearInterval(state.dropTimer);
  clearInterval(state.clockTimer);
  document.removeEventListener('keydown', handleKeyDown);
  alert('게임 오버!');
}
