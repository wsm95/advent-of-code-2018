function findPowerLevel(serialNumber, x, y) {
  const rackId = x + 10;
  let powerLevel = rackId * y;
  powerLevel += serialNumber;
  powerLevel *= rackId;
  powerLevel = Math.floor((powerLevel / 100) % 10);
  powerLevel -= 5;

  return powerLevel;
}

function createGrid(serialNumber) {
  const grid = [];

  for (let x = 1; x < 301; x++) {
    const row = [];
    for (let y = 1; y < 301; y++) {
      row.push(findPowerLevel(serialNumber, x, y));
    }
    grid.push(row);
  }

  return grid;
}

function findSumOfSquare(size, grid, x, y) {
  let sum = 0;
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      sum += grid[i][j];
    }
  }

  return sum;
}

function findLargest3x3(grid) {
  let largest3x3Cord = [];
  let largestSum = 0;
  for (let sq = 1; sq < 300; sq++) {
    for (let x = 1; x < 300; x++) {
      for (let y = 1; y < 300; y++) {
        let sum = 0;
        if (sq + x < 300 && sq + y < 300) {
          sum = findSumOfSquare(sq, grid, x, y);
        }

        if (sum > largestSum) {
          largestSum = sum;
          largest3x3Cord = [x + 1, y + 1, sq];
        }
      }
    }
  }

  return largest3x3Cord;
}

function day11_part1(serialNumber) {
  const grid = createGrid(serialNumber);

  return findLargest3x3(grid);
}

console.log(findPowerLevel(57, 122, 79));
console.log(findPowerLevel(39, 217, 196));
console.log(findPowerLevel(71, 101, 153));

console.log(day11_part1(18));
console.log(day11_part1(42));
console.log(day11_part1(9445));
