function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day2input.txt", "utf8");

  return content.split("\r\n");
}

// https://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection
// https://stackoverflow.com/questions/4549544/total-area-of-intersecting-rectangles
