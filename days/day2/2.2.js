function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day2input.txt", "utf8");

  return content.split("\r\n");
}

function day2_part2(inputs) {
  for (const input of inputs) {
    let ids = checkForSimiliarId(input, inputs);

    if (ids.length > 0) {
      return [...new Set(ids)][0];
    }
  }
}

function checkForSimiliarId(id, ids) {
  for (const otherId of ids) {
    let differentCharCount = 0;
    for (
      let index = 0;
      index < otherId.length && differentCharCount < 2;
      index++
    ) {
      if (id[index] !== otherId[index]) {
        differentCharCount++;
      }
    }

    if (differentCharCount === 1) {
      return [id, otherId];
    }
  }

  return [];
}

console.log(
  day2_part2(["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"])
);

console.log(day2_part2(readFromFile()));
