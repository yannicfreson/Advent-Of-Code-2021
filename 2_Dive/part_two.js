const fs = require("fs");
let input;
let x = 0;
let y = 0;
let aim = 0;

// Read input
fs.readFile("input.txt", "utf8", function (err, data) {
  input = data.split("\n");
  for (let i = 0; i < input.length - 1; i++) {
    let direction = input[i].split(" ")[0];
    let amount = parseInt(input[i].split(" ")[1]);
    if (direction === "up") {
      aim -= amount;
    } else if (direction === "down") {
      aim += amount;
    } else if (direction === "forward") {
      x += amount;
      y += amount * aim;
    }
  }
  console.log(x * y);
});
