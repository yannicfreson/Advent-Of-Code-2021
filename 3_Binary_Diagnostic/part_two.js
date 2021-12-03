const fs = require("fs");
let input;
let output;

let zeroes = 0;
let ones = 0;
let oxGenRate = "";
let oxScrubRate = "";

fs.readFile("input.txt", "utf8", function (err, data) {
  input = data.split("\n");
  input.pop();
  output = input;

  // Oxygen Generator:
  // Go over every bit position
  for (let i = 0; i < input[0].split("").length; i++) {
    // Go over every entry in input
    output.forEach((e) => {
      if (e.split("")[i] === "0") {
        zeroes++;
      } else if (e.split("")[i] === "1") {
        ones++;
      }
    });
    if (zeroes > ones) {
      let temporary = [];
      output.forEach((e) => {
        if (e.split("")[i] === "0") {
          temporary.push(e);
        }
      });
      output = temporary;
    } else if (zeroes === ones || zeroes < ones) {
      let temporary = [];
      output.forEach((e) => {
        if (e.split("")[i] === "1") {
          temporary.push(e);
        }
      });
      output = temporary;
    }
    zeroes = 0;
    ones = 0;
    if (output.length === 1) {
      oxGenRate = output[0];
    }
  }

  output = input;

  // CO2 Scrubber:
  // Go over every bit position
  for (let i = 0; i < input[0].split("").length; i++) {
    // Go over every entry in input
    output.forEach((e) => {
      if (e.split("")[i] === "0") {
        zeroes++;
      } else if (e.split("")[i] === "1") {
        ones++;
      }
    });
    if (zeroes < ones) {
      let temporary = [];
      output.forEach((e) => {
        if (e.split("")[i] === "0") {
          temporary.push(e);
        }
      });
      output = temporary;
    } else if (zeroes > ones) {
      let temporary = [];
      output.forEach((e) => {
        if (e.split("")[i] === "1") {
          temporary.push(e);
        }
      });
      output = temporary;
    } else if (zeroes === ones) {
      let temporary = [];
      output.forEach((e) => {
        if (e.split("")[i] === "0") {
          temporary.push(e);
        }
      });
      output = temporary;
    }
    zeroes = 0;
    ones = 0;
    if (output.length === 1) {
      oxScrubRate = output[0];
    }
  }
  console.log(parseInt(oxGenRate, 2) * parseInt(oxScrubRate, 2));
});
