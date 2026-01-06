function checkWin() {
  const tiles = document.querySelectorAll(".tile");
  let winMoney = 0;
  let winCols = [];

  // duyệt từng cột (x1 → x5)
  for (let c = 0; c < COLS; c++) {
    const base = tiles[c].textContent;
    let same = true;

    for (let r = 1; r < ROWS; r++) {
      if (tiles[r * COLS + c].textContent !== base) {
        same = false;
        break;
      }
    }

    if (same) {
      winCols.push(c);
      winMoney += bet * (c + 1); // x1 → x5
    }
  }

  // tô sáng cột trúng
  if (winCols.length > 0) {
    winCols.forEach(c => {
      for (let r = 0; r < ROWS; r++) {
        tiles[r * COLS + c].style.background = "#ffd54f";
      }
    });

    money += winMoney;
    messageEl.textContent = `🎉 THẮNG ${winMoney.toLocaleString()} 🎉`;
  } else {
    messageEl.textContent = "❌ CHƯA TRÚNG ❌";
  }

  updateUI();
  spinning = false;
}
