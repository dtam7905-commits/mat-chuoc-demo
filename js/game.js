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

createBoard();

function spin() {
  createBoard();
}
function spin() {
  const tiles = document.querySelectorAll(".tile");

  tiles.forEach(tile => {
    const symbols = ["萬", "索", "筒", "中", "發", "白", "🀄", "👑"];
    const rand = symbols[Math.floor(Math.random() * symbols.length)];
    tile.textContent = rand;
  });
}
