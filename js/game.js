const board = document.getElementById("board");
const moneyEl = document.getElementById("money");
const resultEl = document.getElementById("result");

let money = 500000;
const bet = 10000;
const rows = 5;
const cols = 5;
let spinning = false;

const symbols = [
  "man", "pin", "sou",
  "trung", "phat", "bach"
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < rows * cols; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = `<img src="images/bach.png">`;
    board.appendChild(tile);
  }
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
  if (spinning) return;
  if (money < bet) {
    alert("Không đủ tiền!");
    return;
  }

  spinning = true;
  money -= bet;
  moneyEl.textContent = money;
  resultEl.textContent = "Đang quay...";

  const tiles = document.querySelectorAll(".tile");
  let col = 0;

  const interval = setInterval(() => {
    for (let r = 0; r < rows; r++) {
      const index = r * cols + col;
      const sym = randomSymbol();
      tiles[index].innerHTML = `<img src="images/${sym}.png">`;
    }
    col++;
    if (col >= cols) {
      clearInterval(interval);
      spinning = false;
      checkWin();
    }
  }, 250);
}

function checkWin() {
  // ví dụ đơn giản: random thắng
  const win = Math.random() < 0.35;
  if (win) {
    const winAmount = bet * 10;
    money += winAmount;
    moneyEl.textContent = money;
    resultEl.textContent = `🎉 THẮNG ${winAmount.toLocaleString()} 🎉`;
  } else {
    resultEl.textContent = "❌ Chưa trúng ❌";
  }
}

createBoard();
