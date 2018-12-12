function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day8input.txt", "utf8");

  return content.split(" ");
}

class Node {
  constructor() {
    this.value = [];
    this.children = [];
  }
}

// 2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
// A----------------------------------
//     B----------- C-----------
//                      D-----

function findChildren(
  numberOfChildren,
  numberOfMetaData,
  node,
  inputs,
  currentInput
) {
  let children = [];
  for (let c = 0; c < numberOfChildren; c++) {
    const returned = findChildren(
      parseInt(inputs[currentInput]),
      parseInt(inputs[currentInput + 1]),
      new Node(),
      inputs,
      currentInput + 2
    );

    children.push(returned[0]);
    currentInput = returned[1];
  }

  node.children = children;

  for (let i = currentInput; i < currentInput + numberOfMetaData; i++) {
    node.value.push(parseInt(inputs[i]));
  }

  currentInput += numberOfMetaData;

  if (currentInput === inputs.length) {
    return node;
  }

  return [node, currentInput];
}

function findValueOfNode(node) {
  const values = node.value;
  let sum = 0;
  if (node.children.length != 0) {
    for (const value of values) {
      if (value - 1 < node.children.length) {
        sum += findValueOfNode(node.children[value - 1]);
      }
    }
  } else {
    sum += node.value.reduce((a, b) => {
      return a + b;
    });
  }

  return sum;
}

function day8_part1(inputs) {
  const returnNode = findChildren(
    parseInt(inputs[0]),
    parseInt(inputs[1]),
    new Node(),
    inputs,
    2
  );

  return findValueOfNode(returnNode);
}

console.log(day8_part1("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2".split(" ")));
console.log(day8_part1(readFromFile()));
