function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day1input.txt", "utf8");

  return content.split("\r\n");
}

function day1_part2(inputs) {
  let sum = 0;
  let sums = [sum];
  let index = 0;
  while (1) {
    sum += parseInt(inputs[index]);

    if (sums.indexOf(sum) !== -1) {
      return sum;
    }

    sums.push(sum);

    index++;
    if (index >= inputs.length) {
      index = 0;
    }
  }

  return sum;
}

console.log(day1_part2([+1, -1]));
console.log(day1_part2([+3, +3, +4, -2, -4]));
console.log(day1_part2([-6, +3, +8, +5, -6]));
console.log(day1_part2([+7, +7, -2, -7, -4]));
console.log(day1_part2(readFromFile()));
