function readFromFile() {
  let fs = require("fs");
  // let content = fs.readFileSync("day12inputTest.txt", "utf8");
  let content = fs.readFileSync("day12input.txt", "utf8");

  return content.split("\r\n");
}

function createRulesMap() {
  let inputRules = readFromFile();
  inputRules.pop();

  let rules = {};
  for (const inputRule of inputRules) {
    const splitRules = inputRule.split(" => ");

    rules[splitRules[0]] = splitRules[1];
  }

  return rules;
}

function day12_part1(pots) {
  const rules = createRulesMap();

  pots.unshift(...[...new Array(30).fill(".")]);
  pots.push(...[...new Array(30).fill(".")]);

  console.log(pots.join(""));

  let generations = [];
  generations.push([...pots]);
  let generation = pots;
  for (let i = 1; i <= 20; i++) {
    let newGeneration = [];
    newGeneration.push(".");
    newGeneration.push(".");

    for (let j = 2; j < generation.length - 2; j++) {
      currentPattern = [
        generation[j - 2],
        generation[j - 1],
        generation[j],
        generation[j + 1],
        generation[j + 2]
      ].join("");

      if (currentPattern in rules) {
        newGeneration[j] = rules[currentPattern];
      } else {
        newGeneration[j] = ".";
      }
    }

    newGeneration.push(".");
    newGeneration.push(".");

    generations.push([...newGeneration]);
    generation = newGeneration;
  }

  let sum = 0;
  const lastGen = generations.pop();
  for (const g in lastGen) {
    if (lastGen[g] === "#") {
      sum += g - 30;
    }
  }

  console.log(generations.map(g => g.join("")));
  return sum;
}

console.log(day12_part1("#..#.#..##......###...###".split("")));

console.log(
  day12_part1(
    "##..##....#.#.####........##.#.#####.##..#.#..#.#...##.#####.###.##...#....##....#..###.#...#.#.#.#".split(
      ""
    )
  )
);
