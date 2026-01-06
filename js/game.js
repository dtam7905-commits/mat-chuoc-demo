const ROWS = 5;
const COLS = 5;

const symbols = ["萬", "索", "筒", "中", "發", "白"];

let money = 500000;
let bet = 10000;
let spinning = false;

const board = document.getElementById("board");
const spinBtn = document.getElementById("spinBtn");
const moneyEl = document.getElementById("money");
const resultEl = document.getElementById("result");

let grid = [];

// ================== INIT ==================
function initBoard() {
  board.innerHTML = "";
  grid = [];

  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = "?";
      board.appendChild(tile);
      row.push(tile);
    }
    grid.push(row);
  }
}

initBoard();
updateMoney();

// ================== SPIN ==================
spinBtn.onclick = () => {
  if (spinning) return;
  if (money < bet) {
    alert("Không đủ tiền!");
    return;
  }

  spinning = true;
  spinBtn.disabled = true;
  resultEl.textContent = "";
  money -= bet;
  updateMoney();

  spinColumns(0);
};

function spinColumns(col) {
  if (col >= COLS) {
    spinning = false;
    spinBtn.disabled = false;
    checkWin();
    return;
  }

  for (let r = 0; r < ROWS; r++) {
    const sym = randomSymbol();
    grid[r][col].textContent = sym;
    grid[r][col].classList.remove("win");
  }

  setTimeout(() => spinColumns(col + 1), 300);
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// ================== CHECK WIN (x1 → x5) ==================
function checkWin() {
  let winCols = 0;
  let baseSymbol = null;

  for (let col = 0; col < COLS; col++) {
    let colSymbols = [];

    for (let row = 0; row < ROWS; row++) {
      colSymbols.push(grid[row][col].textContent);
    }

    if (col === 0) {
      baseSymbol = mostCommon(colSymbols);
      winCols = 1;
    } else {
      if (colSymbols.includes(baseSymbol)) {
        winCols++;
      } else {
        break;
      }
    }
  }

  if (winCols > 0) {
    let multiplier = [0, 1, 2, 5, 10, 20][winCols];
    let winAmount = bet * multiplier;
    money += winAmount;

    highlightWin(baseSymbol, winCols);
    resultEl.textContent = `🎉 THẮNG ${winAmount.toLocaleString()} 🎉`;
    updateMoney();
  }
}

function mostCommon(arr) {
  return arr.sort(
    (a, b) =>
      arr.filter(v => v === a).length -
      arr.filter(v => v === b).length
  ).pop();
}

// ================== EFFECT ==================
function highlightWin(symbol, cols) {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < ROWS; r++) {
      if (grid[r][c].textContent === symbol) {
        grid[r][c].classList.add("win");
      }
    }
  }
}

// ================== UI ==================
function updateMoney() {
  moneyEl.textContent = money.toLocaleString();
}
