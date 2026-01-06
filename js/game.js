const board = document.getElementById("board");
const spinBtn = document.getElementById("spinBtn");

const ROWS = 5;
const COLS = 5;

// Danh sách quân + ảnh
const symbols = [
  { name: "man", img: "img/man.png" },
  { name: "sach", img: "img/sach.png" },
  { name: "van", img: "img/van.png" },
  { name: "trung", img: "img/trung.png" },
  { name: "phat", img: "img/phat.png" },
  { name: "bach", img: "img/bach.png" }
];

let cells = [];

// Tạo bàn
function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < ROWS * COLS; i++) {
    const div = document.createElement("div");
    div.className = "cell";
    div.innerHTML = `<img src="img/man.png">`;
    board.appendChild(div);
    cells.push(div);
  }
}

// Random quân
function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Quay từng cột
function spin() {
  spinBtn.disabled = true;

  for (let col = 0; col < COLS; col++) {
    setTimeout(() => {
      for (let row = 0; row < ROWS; row++) {
        const index = row * COLS + col;
        const s = randomSymbol();
        cells[index].innerHTML = `<img src="${s.img}">`;
      }

      if (col === COLS - 1) {
        spinBtn.disabled = false;
      }
    }, col * 300);
  }
}

spinBtn.addEventListener("click", spin);

createBoard();
