const symbols = [
  "wan","sach","van",
  "trung","phat","bach",
  "wild","scatter"
];

const board = document.getElementById("board");
const moneyEl = document.getElementById("money");
const betEl = document.getElementById("bet");

let money = Number(localStorage.getItem("money")) || 100000;
let bet = 2000;
let spinning = false;

function saveMoney() {
  localStorage.setItem("money", money);
}

function renderMoney() {
  moneyEl.innerText = "Tiền: " + money.toLocaleString();
  betEl.innerText = "Cược: " + bet.toLocaleString();
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);
  }
}

function dropColumn(col) {
  return new Promise(resolve => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= 5) {
        clearInterval(interval);
        resolve();
        return;
      }
      const pos = index * 5 + col;
      const img = document.createElement("img");
      img.src = "images/" + randomSymbol() + ".png";
      board.children[pos].innerHTML = "";
      board.children[pos].appendChild(img);
      index++;
    }, 120);
  });
}

async function spin() {
  if (spinning) return;
  if (money < bet) return alert("Không đủ tiền");

  spinning = true;
  money -= bet;
  renderMoney();
  saveMoney();

  for (let col = 0; col < 5; col++) {
    await dropColumn(col);
  }

  spinning = false;
}

function changeBet(v) {
  bet += v;
  if (bet < 2000) bet = 2000;
  if (bet > 500000) bet = 500000;
  renderMoney();
}

createBoard();
renderMoney();
