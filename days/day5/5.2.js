function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day5input.txt", "utf8");

  return content;
}

// NOTE: this solution will only work in some cases. If the optimal polymal letter
// happens to be at the end of the inut, this solution will not work.
function day5_part2(inputs) {
  let optimalPolymerLength = inputs.split("").length;
  for (let currentLetter = 65; currentLetter < 91; currentLetter++) {
    let polymer = inputs.split("");

    let pos = 0;
    while (pos < polymer.length - 1) {
      if (polymer[pos].toUpperCase().charCodeAt() === currentLetter) {
        polymer.splice(pos, 1);

        if (pos === 0) {
          pos = -1;
        } else {
          pos -= 2;
        }
      } else {
        // lowercase
        if (polymer[pos].charCodeAt() > 96 && polymer[pos].charCodeAt() < 123) {
          if (
            polymer[pos].charCodeAt() - polymer[pos + 1].charCodeAt() ===
            32
          ) {
            polymer.splice(pos, 2);
            pos -= 2;
          }
        } else {
          if (
            polymer[pos + 1].charCodeAt() - polymer[pos].charCodeAt() ===
            32
          ) {
            polymer.splice(pos, 2);
            pos -= 2;
          }
        }
      }
      pos++;
    }

    if (polymer.join("").length < optimalPolymerLength) {
      optimalPolymerLength = polymer.join("").length;
    }
  }

  return optimalPolymerLength;
}

console.log(day5_part2("dabAcCaCBAcCcaDA"));
console.log(day5_part2(readFromFile()));
