function randomShape() {
  return TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
}

// 시계 방향 90도 회전
function rotateShape(shape) {
  return shape[0].map((_, col) => shape.map(row => row[col]).reverse());
}

// shape 의 채워진 칸마다 callback(x, y) 호출 (shape 내부 좌표)
function forEachCell(shape, callback) {
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) callback(x, y);
    });
  });
}
