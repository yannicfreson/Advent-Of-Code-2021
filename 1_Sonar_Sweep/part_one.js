const fs = require("fs");
let input;
let larger = 0;

// Read input
fs.readFile("input.txt", "utf8", function (err, data) {
  input = data.split("\n");
  for (let i = 0; i < input.length - 1; i++) {
    if (parseInt(input[i]) < parseInt(input[i + 1])) {
      larger++;
    }
  }
  console.log(larger);
});
