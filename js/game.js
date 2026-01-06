const board = document.getElementById("board");

const symbols = [
  "萬", "索", "筒",
  "中", "發", "白",
  "🀄", // scatter
  "👑"  // wild
];

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";

    const symbol = randomSymbol();
    tile.textContent = symbol;

    if (symbol === "👑") tile.classList.add("wild");
    if (symbol === "🀄") tile.classList.add("scatter");

    board.appendChild(tile);
  }
}
function spin() {
  const symbols = ["萬", "索", "筒", "中", "發", "白", "🀄", "👑"];
  const tiles = document.querySelectorAll(".tile");

  let col = 0;

  const spinInterval = setInterval(() => {
    for (let row = 0; row < 5; row++) {
      const index = row * 5 + col;
      tiles[index].textContent =
        symbols[Math.floor(Math.random() * symbols.length)];
    }

    col++;

    if (col >= 5) {
      clearInterval(spinInterval);
      checkWin();
    }
  }, 200); // tốc độ quay (ms)
}
function checkWin() {
  document.querySelector(".win-text").textContent = "🎉 ĐẠI THẮNG MẠT CHƯỢC 🎉";
}
