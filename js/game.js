const board = document.getElementById("board");
const moneyEl = document.getElementById("money");
const betEl = document.getElementById("bet");
const messageEl = document.getElementById("message");

let money = 500000;
let bet = 10000;

const symbols = [
  { name: "萬", type: "normal" },
  { name: "索", type: "normal" },
  { name: "筒", type: "normal" },
  { name: "中", type: "normal" },
  { name: "白", type: "normal" },
  { name: "發", type: "wild" },
  { name: "🀄", type: "scatter" }
];

const spinSound = new Audio("spin.mp3");
const winSound = new Audio("win.mp3");

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// tạo bàn
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "?";
    board.appendChild(tile);
  }
}

function spin() {
  if (money < bet) {
    alert("Không đủ tiền");
    return;
  }

  spinSound.play();
  messageEl.textContent = "";
  money -= bet;
  updateMoney();

  const tiles = document.querySelectorAll(".tile");
  let col = 0;

  const interval = setInterval(() => {
    for (let row = 0; row < 5; row++) {
      const index = row * 5 + col;
      const sym = randomSymbol();
      tiles[index].textContent = sym.name;
      tiles[index].dataset.type = sym.type;
      tiles[index].className = "tile spinning";
    }

    col++;
    if (col === 5) {
      clearInterval(interval);
      setTimeout(checkWin, 400);
    }
  }, 250);
}

function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  let totalWin = 0;

  // kiểm tra 5 hàng ngang
  for (let row = 0; row < 5; row++) {
    const rowTiles = [];
    for (let col = 0; col < 5; col++) {
      rowTiles.push(tiles[row * 5 + col]);
    }

    const first = rowTiles[0].textContent;
    let win = rowTiles.every(
      t => t.textContent === first || t.dataset.type === "wild"
    );

    if (win) {
      rowTiles.forEach(t => t.classList.add("win"));
      totalWin += bet * 5;
    }
  }

  // scatter
  const scatters = [...tiles].filter(t => t.dataset.type === "scatter");
  if (scatters.length >= 3) {
    scatters.forEach(t => t.classList.add("win"));
    totalWin += bet * 10;
  }

  if (totalWin > 0) {
    winSound.play();
    money += totalWin;
    messageEl.textContent = `🎉 THẮNG ${totalWin.toLocaleString()} 🎉`;
  }

  updateMoney();
}

function updateMoney() {
  moneyEl.textContent = money.toLocaleString();
  betEl.textContent = bet.toLocaleString();
}

// ADMIN PANEL ẨN
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "a") {
    const pin = prompt("Nhập PIN admin:");
    if (pin === "9999") {
      const newMoney = prompt("Tiền mới:");
      money = parseInt(newMoney || money);
      updateMoney();
    }
  }
});

createBoard();
