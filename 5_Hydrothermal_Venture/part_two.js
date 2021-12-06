const fs = require("fs");
let input;
let lineCoords = [];
let xMax = 0;
let yMax = 0;
let matrix = [];
let diagonalCounter = 0;

fs.readFile("input.txt", "utf8", function (err, data) {
  // Parse input
  input = data.split("\n");
  input.pop();
  input.forEach((e) => {
    let coords = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
    coords.x1 = parseInt(e.split(" -> ")[0].split(",")[0]);
    coords.y1 = parseInt(e.split(" -> ")[0].split(",")[1]);
    coords.x2 = parseInt(e.split(" -> ")[1].split(",")[0]);
    coords.y2 = parseInt(e.split(" -> ")[1].split(",")[1]);
    lineCoords.push(coords);
  });

  // Determine size of matrix
  lineCoords.forEach((line) => {
    if (line.x1 > xMax) {
      xMax = line.x1;
    } else if (line.x2 > xMax) {
      xMax = line.x2;
    }

    if (line.y1 > yMax) {
      yMax = line.y1;
    } else if (line.y2 > yMax) {
      yMax = line.y2;
    }
  });

  // Create matrix
  for (let y = 0; y < yMax; y++) {
    matrix.push([]);
    for (let x = 0; x < xMax; x++) {
      matrix[y].push(0);
    }
  }

  // Draw lines
  lineCoords.forEach((line) => {
    // Is vertical?
    if (line.x1 === line.x2) {
      let start;
      let end;

      // Determine start and end of line
      if (line.y1 < line.y2) {
        start = line.y1;
        end = line.y2;
      } else if (line.y1 > line.y2) {
        start = line.y2;
        end = line.y1;
      }

      for (let row = 0; row < matrix.length; row++) {
        if (row >= start && row <= end) {
          matrix[row][line.x1]++;
        }
      }
    }

    // Is horizontal?
    if (line.y1 === line.y2) {
      let start;
      let end;

      // Determine start and end of line
      if (line.x1 < line.x2) {
        start = line.x1;
        end = line.x2;
      } else if (line.x1 > line.x2) {
        start = line.x2;
        end = line.x1;
      }

      for (let row = 0; row < matrix.length; row++) {
        if (row === line.y1) {
          for (let column = 0; column < matrix[line.y1].length; column++) {
            if (column >= start && column <= end) {
              matrix[row][column]++;
            }
          }
        }
      }
    }

    // Is diagonal?
    if (line.x1 !== line.x2 && line.y1 !== line.y2) {
      // Now we know it's maybe a diagonal

      if (line.x1 < line.x2 && line.y1 < line.y2) {
        // Now we know it's going DOWN and to the RIGHT
        // But is it a diagonal?
        if (Math.abs(line.x1 - line.x2) === Math.abs(line.y1 - line.y2)) {
          // Omg it is!
          let yCo = line.y1;
          let xCo = line.x1;
          for (
            let amount = Math.abs(line.x1 - line.x2);
            amount >= 0;
            amount--
          ) {
            for (let row = 0; row < matrix.length; row++) {
              for (let column = 0; column < matrix[row].length; column++) {
                if (row === yCo && column === xCo) {
                  matrix[row][column]++;
                  yCo++;
                  xCo++;
                }
              }
            }
          }
        }
      } else if (line.x1 > line.x2 && line.y1 < line.y2) {
        // Now we know it's going DOWN and to the LEFT
        // But is it a diagonal?
        if (Math.abs(line.x1 - line.x2) === Math.abs(line.y1 - line.y2)) {
          // Omg it is!
          let yCo = line.y1;
          let xCo = line.x2;
          for (
            let amount = Math.abs(line.x1 - line.x2);
            amount >= 0;
            amount--
          ) {
            for (let row = 0; row < matrix.length; row++) {
              for (let column = 0; column < matrix[row].length; column++) {
                if (row === yCo && column === xCo) {
                  matrix[row][column]++;
                  yCo++;
                  xCo--;
                }
              }
            }
          }
        }
      } else if (line.x1 < line.x2 && line.y1 > line.y2) {
        // Now we know it's going UP   and to the RIGHT
        // But is it a diagonal?
        if (Math.abs(line.x1 - line.x2) === Math.abs(line.y1 - line.y2)) {
          // Omg it is!
          let yCo = line.y2;
          let xCo = line.x1;
          for (
            let amount = Math.abs(line.x1 - line.x2);
            amount >= 0;
            amount--
          ) {
            for (let row = 0; row < matrix.length; row++) {
              for (let column = 0; column < matrix[row].length; column++) {
                if (row === yCo && column === xCo) {
                  matrix[row][column]++;
                  yCo--;
                  xCo++;
                }
              }
            }
          }
        }
      } else if (line.x1 > line.x2 && line.y1 > line.y2) {
        // Now we know it's going UP   and to the LEFT
        // But is it a diagonal?
        if (Math.abs(line.x1 - line.x2) === Math.abs(line.y1 - line.y2)) {
          // Omg it is!
          let yCo = line.y2;
          let xCo = line.x2;
          for (
            let amount = Math.abs(line.x1 - line.x2);
            amount >= 0;
            amount--
          ) {
            for (let row = 0; row < matrix.length; row++) {
              for (let column = 0; column < matrix[row].length; column++) {
                if (row === yCo && column === xCo) {
                  matrix[row][column]++;
                  yCo--;
                  xCo--;
                }
              }
            }
          }
        }
      }
    }
  });

  let overlaps = 0;
  matrix.flat(1).forEach((n) => {
    if (n > 1) {
      overlaps++;
    }
  });

  drawMatrixToConsole();
  console.log(overlaps);

  function drawMatrixToConsole() {
    let counter = 0;
    matrix.forEach((line) => {
      if (counter < 500) {
        let lineToPrint = "";
        line.forEach((value) => {
          if (value > 1) {
            lineToPrint += "0";
          } else {
            lineToPrint += " ";
          }
        });
        console.log(lineToPrint);
        lineToPrint = "";
        counter++;
      }
    });
  }
});
