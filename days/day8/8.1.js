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

function findMetaDataSum(node) {
  let sum = node.value.reduce((a, b) => {
    return a + b;
  });
  let nodesToVisit = [...node.children];
  while (nodesToVisit.length != 0) {
    let currentChild = nodesToVisit.shift();
    sum += currentChild.value.reduce((a, b) => {
      return a + b;
    });
    nodesToVisit.push(...currentChild.children);
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
  console.log(returnNode);
  return findMetaDataSum(returnNode);
}

console.log(day8_part1("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2".split(" ")));
// console.log(day8_part1(readFromFile()));
