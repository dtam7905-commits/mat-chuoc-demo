const board = document.getElementById("board");
const moneyEl = document.getElementById("money");
const betEl = document.getElementById("bet");
const messageEl = document.getElementById("message");

const ROWS = 5;
const COLS = 5;
const symbols = ["萬", "索", "筒", "中", "發", "白"];

let money = 500000;
let bet = 10000;
let spinning = false;

// tạo bàn
function initBoard() {
  board.innerHTML = "";
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "?";
    board.appendChild(tile);
  }
}
initBoard();
updateMoney();

// random quân
function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// QUAY
function spin() {
  if (spinning) return;
  if (money < bet) {
    messageEl.textContent = "❌ Không đủ tiền";
    return;
  }

  spinning = true;
  messageEl.textContent = "ĐANG QUAY...";
  money -= bet;
  updateMoney();

  const tiles = document.querySelectorAll(".tile");
  let col = 0;

  const interval = setInterval(() => {
    for (let row = 0; row < ROWS; row++) {
      const index = row * COLS + col;
      tiles[index].textContent = randomSymbol();
      tiles[index].style.background = "#fff";
    }

    col++;
    if (col >= COLS) {
      clearInterval(interval);
      setTimeout(checkWin, 300);
    }
  }, 250);
}

// kiểm tra thắng đơn giản (3 giống nhau hàng ngang)
function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  let win = false;

  for (let r = 0; r < ROWS; r++) {
    const a = tiles[r * COLS].textContent;
    const b = tiles[r * COLS + 1].textContent;
    const c = tiles[r * COLS + 2].textContent;

    if (a === b && b === c) {
      win = true;
      for (let i = 0; i < COLS; i++) {
        tiles[r * COLS + i].style.background = "#ffd54f";
      }
    }
  }

  if (win) {
    const reward = bet * 5;
    money += reward;
    messageEl.textContent = `🎉 THẮNG ${reward.toLocaleString()} 🎉`;
  } else {
    messageEl.textContent = "❌ CHƯA TRÚNG ❌";
  }

  updateMoney();
  spinning = false;
}

// cập nhật tiền
function updateMoney() {
  moneyEl.textContent = money.toLocaleString();
  betEl.textContent = bet.toLocaleString();
}
