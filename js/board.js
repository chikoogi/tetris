function createEmptyRow() {
  return Array(BOARD_WIDTH).fill(0);
}

function createBoard() {
  return Array.from({ length: BOARD_HEIGHT }, createEmptyRow);
}

function canPlace(board, shape, posX, posY) {
  let ok = true;
  forEachCell(shape, (x, y) => {
    const bx = posX + x;
    const by = posY + y;
    if (bx < 0 || bx >= BOARD_WIDTH || by >= BOARD_HEIGHT) ok = false;
    else if (by >= 0 && board[by][bx] !== 0) ok = false;
  });
  return ok;
}

function mergePiece(board, shape, posX, posY) {
  forEachCell(shape, (x, y) => {
    if (posY + y >= 0) board[posY + y][posX + x] = 1;
  });
}

// 꽉 찬 줄을 지운 새 보드와 지운 줄 수를 반환
function clearFullLines(board) {
  const remaining = board.filter(row => row.some(cell => cell === 0));
  const cleared = BOARD_HEIGHT - remaining.length;
  while (remaining.length < BOARD_HEIGHT) {
    remaining.unshift(createEmptyRow());
  }
  return { board: remaining, cleared };
}
