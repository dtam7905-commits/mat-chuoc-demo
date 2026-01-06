/* =====================
   CONFIG
===================== */
const ROWS = 5;
const COLS = 5;
const BET = 10000;

const SYMBOLS = ["man", "pin", "sou", "trung", "phat", "bach"];
const SCATTER = "scatter";
const WILD = "wild";

let money = 500000;
let spinning = false;

/* =====================
   DOM
===================== */
const board = document.getElementById("board");
const btnSpin = document.getElementById("spin");
const moneyEl = document.getElementById("money");
const statusEl = document.getElementById("status");

/* =====================
   INIT
===================== */
moneyEl.innerText = money.toLocaleString();
createBoard();

/* =====================
   CREATE BOARD
===================== */
function createBoard() {
  board.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.innerHTML = `<img src="images/man.png">`;
      board.appendChild(tile);
    }
  }
}

/* =====================
   RANDOM SYMBOL
===================== */
function randomSymbol() {
  const rand = Math.random();
  if (rand < 0.05) return SCATTER; // 5%
  if (rand < 0.10) return WILD;    // 5%
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

/* =====================
   SPIN
===================== */
btnSpin.onclick = async () => {
  if (spinning) return;
  if (money < BET) {
    statusEl.innerText = "❌ Không đủ tiền";
    return;
  }

  spinning = true;
  statusEl.innerText = "🎲 Đang quay...";
  money -= BET;
  moneyEl.innerText = money.toLocaleString();

  const tiles = document.querySelectorAll(".tile");
  const result = [];

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      const index = r * COLS + c;
      const symbol = randomSymbol();
      result[index] = symbol;

      tiles[index].classList.remove("win");
      tiles[index].innerHTML = `
        <img src="images/${symbol}.png">
      `;
    }
    await sleep(200); // quay từng cột
  }

  checkWin(result);
  spinning = false;
};

/* =====================
   CHECK WIN
===================== */
function checkWin(result) {
  let win = 0;
  let scatterCount = 0;

  result.forEach(s => {
    if (s === SCATTER) scatterCount++;
  });

  if (scatterCount >= 3) {
    win += BET * scatterCount;
  }

  for (let r = 0; r < ROWS; r++) {
    let base = null;
    let count = 0;
    let indexes = [];

    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      const s = result[i];

      if (s === WILD && base) {
        count++;
        indexes.push(i);
        continue;
      }

      if (!base && s !== SCATTER) {
        base = s;
        count = 1;
        indexes = [i];
        continue;
      }

      if (s === base || s === WILD) {
        count++;
        indexes.push(i);
      } else break;
    }

    if (count >= 3) {
      win += BET * count;
      indexes.forEach(i =>
        document.querySelectorAll(".tile")[i].classList.add("win")
      );
    }
  }

  if (win > 0) {
    money += win;
    moneyEl.innerText = money.toLocaleString();
    statusEl.innerText = `🎉 THẮNG ${win.toLocaleString()} 🎉`;
  } else {
    statusEl.innerText = "❌ Chưa trúng";
  }
}

/* =====================
   UTILS
===================== */
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}
