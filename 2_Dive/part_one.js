const fs = require("fs");
let input;
let x = 0;
let y = 0;

// Read input
fs.readFile("input.txt", "utf8", function (err, data) {
  input = data.split("\n");
  for (let i = 0; i < input.length - 1; i++) {
    let direction = input[i].split(" ")[0];
    let amount = parseInt(input[i].split(" ")[1]);
    if (direction === "up") y -= amount;
    else if (direction === "down") y += amount;
    else x += amount;
  }
  console.log(x * y);
});
