const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createBoard = (rows, cols) => {
  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        value: 0,
        rect: null,
      });
    }
    board.push(row);
  }
  return board;
}

const generateRectangle = (board, rows, cols) => {
  const width = getRandomInt(1, 3);
  const height = getRandomInt(1, 3);
  let x, y;
  do {
    x = getRandomInt(0, cols - width);
    y = getRandomInt(0, rows - height);
  } while (
    board[y][x].value === 1 ||
    board[y + height - 1][x + width - 1].value === 1
  );
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      board[i][j].value = 1;
      board[i][j].rect = {
        x,
        y,
        width,
        height,
      };
    }
  }
  return {
    x, y, width, height
  };
}

function checkWinCondition(board) {
  // Example win condition: all cells are filled (non-zero)
  for (let row of board) {
    for (let cell of row) {
      if (cell === 0) {
        return false; // Game is not won if any cell is empty
      }
    }
  }
  return true; // All cells are filled, player wins
}

module.exports = { getRandomInt, createBoard, generateRectangle, checkWinCondition };
