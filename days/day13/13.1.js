function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day13input.txt", "utf8");

  return content.split("\r\n");
}

class Cart {
  constructor(direction, currentPosition) {
    this.direction = direction;
    this.nextDirection = 0;
    this.currentPosition = currentPosition;
  }

  move(grid) {
    let nextTrack;
    switch (this.direction) {
      case "^":
        nextTrack = grid[this.currentPosition[0]][this.currentPosition[0] + 1];
        break;
      case "v":
        nextTrack = grid[this.currentPosition[0]][this.currentPosition[0] - 1];
        break;
      case ">":
        nextTrack = grid[this.currentPosition[0] + 1][this.currentPosition[0]];
        break;
      case "<":
        nextTrack = grid[this.currentPosition[0] - 1][this.currentPosition[0]];
        break;
    }

    switch (nextTrack) {
      case "-":
        this.direction = "";
        break;
      case "|":
        this.direction = "";
        break;
      case "/":
        this.direction = "";
        break;
      case "\\":
        this.direction = "";
        break;
      case "+":
        this.direction = "";
        break;
    }
  }
}

function cartLocations(substring, string) {
  let a = [];
  let i = -1;
  while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
  return a;
}

function findCartsInRows(row) {
  return [
    ...cartLocations("^", row).map(c => {
      return [c, "^"];
    }),
    ...cartLocations("v", row).map(c => {
      return [c, "v"];
    }),
    ,
    ...cartLocations(">", row).map(c => {
      return [c, ">"];
    }),
    ,
    ...cartLocations("<", row).map(c => {
      return [c, "<"];
    })
  ];
}

function createGrid(inputs) {
  let grid = [];
  let cartPositions = [];
  for (let i = 0; i < inputs.length; i++) {
    let cartsInRow = findCartsInRows(inputs[i]);
    cartPositions.push(
      ...cartsInRow.map(cart => {
        return [[i, cart[0]], cart[1]];
      })
    );

    inputs[i] = inputs[i]
      .replace("^", "|")
      .replace("v", "|")
      .replace(">", "-")
      .replace("<", "-");
    grid.push(inputs[i].split(""));
  }

  return {
    grid: grid,
    cartPositions: cartPositions
  };
}

function day13_part1(inputs) {
  for (const input in inputs) {
    console.log(inputs[input]);
  }

  let { grid, cartPositions } = createGrid(inputs);

  let carts = [];
  for (const cartPosition of cartPositions.filter(cp => cp != null)) {
    carts.push(new Cart(cartPosition[1], cartPosition[0]));
  }

  for (const row of grid) {
    console.log(row.join(""));
  }

  return carts;
}

console.log(day13_part1(readFromFile()));
