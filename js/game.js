const board = document.getElementById("board");

const symbols = ["中", "發", "白", "萬", "筒", "索"];

let tiles = [];

// tạo bàn 5x5
function initBoard() {
  board.innerHTML = "";
  tiles = [];

  for (let i = 0; i < 25; i++) {
    const div = document.createElement("div");
    div.className = "tile";
    div.textContent = randomSymbol();
    board.appendChild(div);
    tiles.push(div);
  }
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// quay từng cột
function spin() {
  let col = 0;

  function spinColumn() {
    if (col >= 5) return;

    let count = 0;
    const interval = setInterval(() => {
      for (let row = 0; row < 5; row++) {
        const index = row * 5 + col;
        tiles[index].textContent = randomSymbol();
      }
      count++;
      if (count > 10) {
        clearInterval(interval);
        col++;
        setTimeout(spinColumn, 150);
      }
    }, 80);
  }

  spinColumn();
}

// chạy khi load trang
initBoard();
