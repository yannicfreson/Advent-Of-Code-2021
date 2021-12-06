const fs = require("fs");
let input;
let lineCoords = [];
let xMax = 0;
let yMax = 0;
let matrix = [];
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
  });

  let overlaps = 0;
  matrix.flat(1).forEach((n) => {
    if (n > 1) {
      overlaps++;
    }
  });

  let counter = 0;
  matrix.forEach((line) => {
    if (counter < 150) {
      let lineToPrint = "";
      line.forEach((value) => {
        if (value === 0) {
          lineToPrint += ".";
        } else {
          lineToPrint += value;
        }
      });
      console.log(lineToPrint);
      lineToPrint = "";
      counter++;
    }
  });

  console.log(overlaps);
});
