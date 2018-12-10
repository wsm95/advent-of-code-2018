function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day5input.txt", "utf8");

  return content;
}

function day5_part1(inputs) {
  let polymer = inputs.split("");
  let polymerLength = polymer.length;

  let pos = 0;
  while (pos < polymer.length - 1) {
    // lowercase
    if (polymer[pos].charCodeAt() > 96 && polymer[pos].charCodeAt() < 123) {
      if (polymer[pos].charCodeAt() - polymer[pos + 1].charCodeAt() === 32) {
        polymer.splice(pos, 2);
        pos -= 2;
      }
    } else {
      if (polymer[pos + 1].charCodeAt() - polymer[pos].charCodeAt() === 32) {
        polymer.splice(pos, 2);
        pos -= 2;
      }
    }

    pos++;
  }

  return polymer.join("").length;
}

console.log(day5_part1("dabAcCaCBAcCcaDA"));
console.log(day5_part1(readFromFile()));
