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
      const i = row * COLS + col;
      tiles[i].textContent = randomSymbol();
      tiles[i].style.background = "#fff";
    }
    col++;
  }, 150);
}

function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  const winText = document.querySelector(".win-text");
  let win = false;

  for (let r = 0; r < ROWS; r++) {
    const i = r * COLS;
    const a = tiles[i].textContent;
    const b = tiles[i + 1].textContent;
    const c = tiles[i + 2].textContent;

    if (a === b && b === c) {
      win = true;
      for (let k = 0; k < COLS; k++) {
        tiles[i + k].style.background = "#ffd54f";
      }
    }
  }

  winText.textContent = win
    ? "🎉 ĐẠI THẮNG MẠT CHƯỢC 🎉"
    : "Chúc bạn may mắn lần sau!";
}

createBoard();
