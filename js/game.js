const board = document.getElementById("board");
const symbols = ["萬", "索", "筒", "中", "白", "發"];

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// tạo bàn 5x5
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = "?";
    board.appendChild(tile);
  }
}

// quay theo từng cột
function spin() {
  const tiles = document.querySelectorAll(".tile");
  let col = 0;

  const interval = setInterval(() => {
    for (let row = 0; row < 5; row++) {
      const index = row * 5 + col;
      tiles[index].textContent = randomSymbol();
      tiles[index].style.background = "#ffd45a";
    }

    col++;

    if (col === 5) {
      clearInterval(interval);
      setTimeout(resetColor, 300);
    }
  }, 300);
}

function resetColor() {
  document.querySelectorAll(".tile").forEach(t => {
    t.style.background = "#fff";
  });
}

// chạy khi load trang
createBoard();
