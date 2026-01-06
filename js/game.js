// ================== CẤU HÌNH ==================
const ROWS = 5;
const COLS = 5;

const BET = 10000;
let money = 500000;

const SYMBOLS = [
  { name: "man", pay: 2 },
  { name: "pin", pay: 2 },
  { name: "sou", pay: 2 },
  { name: "trung", pay: 3 },
  { name: "phat", pay: 3 },
  { name: "bach", pay: 3 },
  { name: "wild", pay: 5, wild: true },
  { name: "scatter", scatter: true }
];

// ================== DOM ==================
const board = document.getElementById("board");
const spinBtn = document.getElementById("spin");
const moneyEl = document.getElementById("money");
const resultEl = document.getElementById("result");

// ================== TẠO BÀN ==================
let grid = [];

function createBoard() {
  board.innerHTML = "";
  grid = [];

  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "tile";
      board.appendChild(cell);
      grid[r][c] = cell;
    }
  }
}

createBoard();
updateMoney();

// ================== TIỆN ÍCH ==================
function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function updateMoney() {
  moneyEl.innerText = money.toLocaleString();
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// ================== QUAY ==================
async function spin() {
  if (money < BET) {
    alert("Không đủ tiền!");
    return;
  }

  money -= BET;
  updateMoney();
  resultEl.innerText = "Đang quay...";
  spinBtn.disabled = true;

  clearHighlight();

  let result = [];

  // Quay từng cột
  for (let c = 0; c < COLS; c++) {
    for (let i = 0; i < 10; i++) {
      for (let r = 0; r < ROWS; r++) {
        const sym = randomSymbol();
        grid[r][c].innerHTML =
          `<img src="images/${sym.name}.png">`;
      }
      await sleep(50);
    }

    for (let r = 0; r < ROWS; r++) {
      const sym = randomSymbol();
      grid[r][c].dataset.symbol = sym.name;
      grid[r][c].innerHTML =
        `<img src="images/${sym.name}.png">`;

      if (!result[r]) result[r] = [];
      result[r][c] = sym;
    }
  }

  const win = checkWin(result);
  if (win > 0) {
    money += win;
    resultEl.innerText = `🎉 THẮNG ${win.toLocaleString()} 🎉`;
  } else {
    resultEl.innerText = "❌ Chưa trúng ❌";
  }

  updateMoney();
  spinBtn.disabled = false;
}

// ================== KIỂM TRA THẮNG ==================
function checkWin(result) {
  let totalWin = 0;

  // kiểm tra từng hàng
  for (let r = 0; r < ROWS; r++) {
    let base = null;
    let count = 0;
    let wildCount = 0;

    for (let c = 0; c < COLS; c++) {
      const s = result[r][c];

      if (s.scatter) continue;

      if (!base && !s.wild) base = s;
      if (s.wild) wildCount++;

      if (base && (s.name === base.name || s.wild)) {
        count++;
      } else break;
    }

    if (count >= 3 && base) {
      const win = BET * base.pay * count;
      totalWin += win;
      highlightRow(r);
    }
  }

  // Scatter
  let scatterCount = 0;
  result.flat().forEach(s => {
    if (s.scatter) scatterCount++;
  });

  if (scatterCount >= 3) {
    const scatterWin = BET * scatterCount;
    totalWin += scatterWin;
    highlightScatter();
  }

  return totalWin;
}

// ================== HIỆU ỨNG ==================
function highlightRow(row) {
  for (let c = 0; c < COLS; c++) {
    grid[row][c].classList.add("win");
  }
}

function highlightScatter() {
  grid.flat().forEach(cell => {
    if (cell.dataset.symbol === "scatter") {
      cell.classList.add("scatter");
    }
  });
}

function clearHighlight() {
  grid.flat().forEach(cell => {
    cell.classList.remove("win", "scatter");
  });
}

// ================== EVENT ==================
spinBtn.addEventListener("click", spin);
