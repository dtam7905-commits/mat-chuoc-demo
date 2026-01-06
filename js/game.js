const board = document.getElementById("board");
const ROWS = 5;
const COLS = 5;

// Danh sách quân demo
const symbols = ["萬", "筒", "索", "中", "發", "白"];

// Tạo bàn 5x5
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "?";
    board.appendChild(tile);
  }
}

// Random quân
function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// QUAY – quay từng cột
function spin() {
  const tiles = document.querySelectorAll(".tile");
  let col = 0;

  const interval = setInterval(() => {
    if (col >= COLS) {
      clearInterval(interval);
      return;
    }

    for (let row = 0; row < ROWS; row++) {
      const index = row * COLS + col;
      tiles[index].textContent = randomSymbol();
    }

    col++;
  }, 150);
}

// Load lần đầu
createBoard();
