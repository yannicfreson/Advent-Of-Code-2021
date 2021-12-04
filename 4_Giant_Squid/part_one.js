const fs = require("fs");
let input;
let numbers;
let boards = [];
let winningBoardFound = false;
let winningBoard;
let winningNumber;

fs.readFile("input.txt", "utf8", function (err, data) {
  input = data.split("\n\n");
  numbers = input[0].split(",");
  input.shift();
  input.forEach((e) => {
    let board = [];
    let rows = e.split("\n");
    rows.forEach((row) => {
      let rowElementsWithSpaces = row.split(" ");
      let rowElements = [];
      rowElementsWithSpaces.forEach((element) => {
        if (element !== "") {
          rowElements.push(element);
        }
      });
      board.push(rowElements);
    });
    boards.push(board);
  });

  // fix stupid thing where my editor puts a newline at the end of the input file
  boards[boards.length - 1].pop();

  // Mark number in all boards
  numbers.forEach((n) => {
    if (!winningBoardFound) {
      for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
          for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
            if (boards[boardIndex][rowIndex][columnIndex] === n) {
              boards[boardIndex][rowIndex][columnIndex] = "a";
            }
          }
        }
      }
      boards.forEach((b) => {
        if (checkBingo(b)) {
          winningBoardFound = true;
          winningBoard = b;
          winningNumber = n;
        }
      });
    }
  });

  let sum = 0;
  winningBoard.flat(1).forEach((n) => {
    if (n !== "a") {
      sum += parseInt(n);
    }
  });
  console.log(sum * parseInt(winningNumber));
});

function checkBingo(board) {
  let bingo = false;

  // Check rows
  for (let row = 0; row < board.length; row++) {
    if (!bingo) {
      let bingoOnRow = true;
      board[row].forEach((e) => {
        if (e !== "a") {
          bingoOnRow = false;
        }
      });
      bingo = bingoOnRow;
    }
  }

  // Check columns
  for (let column = 0; column < board[0].length; column++) {
    if (!bingo) {
      let bingoOnColumn = true;
      board.forEach((row) => {
        if (row[column] !== "a") {
          bingoOnColumn = false;
        }
      });
      bingo = bingoOnColumn;
    }
  }
  return bingo;
}
