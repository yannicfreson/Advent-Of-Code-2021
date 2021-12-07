const fs = require("fs");
let input;
let fish = [];

fs.readFile("input.txt", "utf8", function (err, data) {
  // Parse input
  input = data.trim().split(",");
  input.forEach((i) => fish.push(Number(i)));

  // Go through day
  // console.log(fish.join(","));
  for (let days = 0; days < 80; days++) {
    let newFish = 0;
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] === 0) {
        fish[i] = 6;
        newFish++;
      } else {
        fish[i]--;
      }
    }
    for (let i = 0; i < newFish; i++) {
      fish.push(8);
    }
  }
  console.log(fish.length);
});
