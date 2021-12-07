const fs = require("fs");
let input;
let fish = [];

fs.readFile("input.txt", "utf8", function (err, data) {
  // Parse input
  input = data.trim().split(",");
  input.forEach((i) => fish.push(Number(i)));

  let days = 20;
  input.forEach((i) => {
    let counter = 0;
    for (let i = 0; i < days; i++) {}
  });
});
