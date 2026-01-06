/*************************
 *  MẠT CHƯỢC VN – SLOT 5x5
 *************************/

// ====== CẤU HÌNH ======
const ROWS = 5;
const COLS = 5;

// quân (bản chữ – sau này đổi PNG rất dễ)
const SYMBOLS = ["萬", "索", "筒", "中", "發", "白"];

// tiền
let money = 500000;
let bet = 10000;
let spinning = false;

// ====== LẤY ELEMENT ======
const board = document.getElementById("board");
const moneyEl = document.getElementById("money");
const betEl = document.getElementById("bet");
const messageEl = document.getElementById("message");

// ====== KHỞI TẠO ======
function initBoard() {
  board.innerHTML = "";
  for (let i = 0; i < ROWS * COLS; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "?";
    board.appendChild(tile);
  }
  updateUI();
}

initBoard();

// ====== TIỆN ÍCH ======
function updateUI() {
  moneyEl.textContent = money.toLocaleString();
  betEl.textContent = bet.toLocaleString();
}

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

// ====== QUAY ======
function spin() {
  if (spinning) return;

  if (money < bet) {
    messageEl.textContent = "❌ Không đủ tiền";
    return;
  }

  spinning = true;
  money -= bet;
  updateUI();
  messageEl.textContent = "🎰 ĐANG QUAY...";

  const tiles = document.querySelectorAll(".tile");
  let col = 0;

  const spinInterval = setInterval(() => {
    for (let row = 0; row < ROWS; row++) {
      const index = row * COLS + col;
      tiles[index].textContent = randomSymbol();
      tiles[index].style.background = "#fff";
    }

    col++;
    if (col >= COLS) {
      clearInterval(spinInterval);
      setTimeout(checkWin, 300);
    }
  }, 250);
}

// ====== KIỂM TRA THẮNG ======
function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  let winMoney = 0;

  // kiểm tra từng hàng
  for (let r = 0; r < ROWS; r++) {
    const base = tiles[r * COLS].textContent;
    let same = true;

    for (let c = 1; c < COLS; c++) {
      if (tiles[r * COLS + c].textContent !== base) {
        same = false;
        break;
      }
    }

    if (same) {
      winMoney += bet * 5;
      for (let c = 0; c < COLS; c++) {
        tiles[r * COLS + c].style.background = "#ffd54f";
      }
    }
  }

  if (winMoney > 0) {
    money += winMoney;
    messageEl.textContent = `🎉 ĐẠI THẮNG +${winMoney.toLocaleString()} 🎉`;
  } else {
    messageEl.textContent = "❌ CHƯA TRÚNG ❌";
  }

  updateUI();
  spinning = false;
}

// ====== GẮN GLOBAL (QUAN TRỌNG) ======
window.spin = spin;
