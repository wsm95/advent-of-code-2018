function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day2input.txt", "utf8");

  return content.split("\r\n");
}

function day2_part1(inputs) {
  let numOf2 = 0;
  let numOf3 = 0;

  for (const input of inputs) {
    let inputSplit = input.split("");
    let uniqueValues = [...new Set(inputSplit)];

    let had2 = false;
    let had3 = false;
    for (const inputChar of uniqueValues) {
      let occuranceOfChars = inputSplit.filter(c => {
        return c === inputChar;
      }).length;

      occuranceOfChars === 2 && (had2 = true);
      occuranceOfChars === 3 && (had3 = true);

      if (had2 && had3) {
        break;
      }
    }

    had2 && numOf2++;
    had3 && numOf3++;
  }

  return numOf2 * numOf3;
}

console.log(
  day2_part1([
    "abcdef",
    "bababc",
    "abbcde",
    "abcccd",
    "aabcdd",
    "abcdee",
    "ababab"
  ])
);

console.log(day2_part1(readFromFile()));
