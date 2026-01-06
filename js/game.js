const board = document.getElementById("board");
const spinBtn = document.querySelector(".spin");
const winText = document.querySelector(".win-text");

let money = 500000;
let bet = 10000;
let spinning = false;

const symbols = ["萬", "索", "筒", "中", "發", "白"];
const ROWS = 5;
const COLS = 5;

// Tạo bàn
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "?";
    board.appendChild(tile);
  }
}
createBoard();

// Random quân
function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// QUAY
function spin() {
  if (spinning) return;
  if (money < bet) {
    alert("Không đủ tiền!");
    return;
  }

  spinning = true;
  winText.textContent = "ĐANG QUAY...";
  spinBtn.disabled = true;

  money -= bet;
  updateMoney();

  const tiles = document.querySelectorAll(".tile");
  let result = Array.from({ length: ROWS }, () => Array(COLS).fill(""));

  // Quay từng cột
  let col = 0;
  const interval = setInterval(() => {
    for (let r = 0; r < ROWS; r++) {
      const index = r * COLS + col;
      const sym = randomSymbol();
      tiles[index].textContent = sym;
      result[r][col] = sym;
    }
    col++;
    if (col >= COLS) {
      clearInterval(interval);
      setTimeout(() => finish(result), 300);
    }
  }, 250);
}

// TÍNH THẮNG
function finish(result) {
  let win = 0;

  // kiểm tra hàng ngang
  for (let r = 0; r < ROWS; r++) {
    let same = true;
    for (let c = 1; c < COLS; c++) {
      if (result[r][c] !== result[r][0]) same = false;
    }
    if (same) win += bet * 5;
  }

  if (win > 0) {
    money += win;
    winText.textContent = `🎉 THẮNG ${win.toLocaleString()} 🎉`;
  } else {
    winText.textContent = "❌ CHƯA TRÚNG ❌";
  }

  updateMoney();
  spinning = false;
  spinBtn.disabled = false;
}

// Cập nhật tiền
function updateMoney() {
  document.querySelector(".footer").innerHTML = `
    <div>Tiền: ${money.toLocaleString()}</div>
    <div>Cược: ${bet.toLocaleString()}</div>
  `;
}

// Gán nút
spinBtn.onclick = spin;
