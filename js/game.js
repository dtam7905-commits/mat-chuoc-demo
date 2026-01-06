const board = document.getElementById("board");

const ROWS = 5;
const COLS = 5;

// Ký hiệu tạm (chưa cần ảnh)
const symbols = ["萬", "筒", "索", "中", "發", "白", "W", "S"];

// ===============================
// TẠO BÀN BAN ĐẦU
// ===============================
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "？";
    board.appendChild(tile);
  }
}

createBoard();

// ===============================
// RANDOM SYMBOL
// ===============================
function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// ===============================
// QUAY TỪNG CỘT
// ===============================
function spin() {
  const tiles = document.querySelectorAll(".tile");

  for (let col = 0; col < COLS; col++) {
    setTimeout(() => {
      for (let row = 0; row < ROWS; row++) {
        const index = row * COLS + col;
        const tile = tiles[index];

        const symbol = randomSymbol();
        tile.className = "tile";
        tile.textContent = symbol;

        if (symbol === "W") tile.classList.add("wild");
        if (symbol === "S") tile.classList.add("scatter");
      }
    }, col * 300); // delay từng cột
  }
}
