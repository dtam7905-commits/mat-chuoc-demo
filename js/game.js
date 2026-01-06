const board = document.getElementById("board");
const ROWS = 5;
const COLS = 5;

const symbols = ["萬", "筒", "索", "中", "發", "白"];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "?";
    board.appendChild(tile);
  }
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
  const tiles = document.querySelectorAll(".tile");
  let col = 0;

  const interval = setInterval(() => {
    if (col >= COLS) {
      clearInterval(interval);
      checkWin();
      return;
    }

    for (let row = 0; row < ROWS; row++) {
      const index = row * COLS + col;
      tiles[index].textContent = randomSymbol();
    }
    col++;
  }, 150);
}

// KIỂM TRA THẮNG
function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  let win = false;

  for (let row = 0; row < ROWS; row++) {
    const base = row * COLS;
    const a = tiles[base].textContent;
    const b = tiles[base + 1].textContent;
    const c = tiles[base + 2].textContent;

    if (a === b && b === c) {
      win = true;
      for (let i = 0; i < COLS; i++) {
        tiles[base + i].style.background = "#ffd54f";
      }
    }
  }

  const winText = document.querySelector(".win-text");
  winText.textContent = win
    ? "🎉 ĐẠI THẮNG MẠT CHƯỢC 🎉"
    : "Chúc bạn may mắn lần sau!";
}

createBoard();
