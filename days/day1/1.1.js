function day1_part1(inputs) {
  let sum = 0;
  for (const input of inputs) {
    sum += parseInt(input);
  }

  return sum;
}

function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day1input.txt", "utf8");

  return content.split("\r\n");
}

console.log(day1_part1([+1, +1, +1]));
console.log(day1_part1([+1, +1, -2]));
console.log(day1_part1([-1, -2, -3]));
console.log(day1_part1(readFromFile()));
