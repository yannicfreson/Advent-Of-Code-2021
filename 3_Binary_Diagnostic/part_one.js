const fs = require("fs");
let input;

let zeroes = 0;
let ones = 0;
let gammaRate = "";
let epsilonRate = "";

fs.readFile("input.txt", "utf8", function (err, data) {
  input = data.split("\n");
  for (let i = 0; i < input[0].split("").length; i++) {
    for (let j = 0; j < input.length - 1; j++) {
      if (input[j].split("")[i] === "0") {
        zeroes++;
      } else if (input[j].split("")[i] === "1") {
        ones++;
      }
    }
    if (zeroes > ones) {
      gammaRate += "0";
      epsilonRate += "1";
    } else if (zeroes < ones) {
      gammaRate += "1";
      epsilonRate += "0";
    }
    zeroes = 0;
    ones = 0;
  }
  console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
});
