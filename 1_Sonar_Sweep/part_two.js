const fs = require("fs");
let inputAsStrings;
let input = [];
let larger = 0;

// Read input
fs.readFile("input.txt", "utf8", function (err, data) {
  inputAsStrings = data.split("\n");
  inputAsStrings.forEach((e) => {
    input.push(parseInt(e));
  });

  let previousSum = -1;
  let currentSum = 0;

  for (let i = 0; i < input.length - 2; i++) {
    currentSum = input[i] + input[i + 1] + input[i + 2];
    if (currentSum > previousSum && previousSum !== -1) {
      larger++;
    }
    previousSum = currentSum;
  }
  console.log(larger);
});
