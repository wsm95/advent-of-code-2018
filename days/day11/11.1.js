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

function findLargest3x3(grid) {
  let largest3x3Cord = [];
  let largestSum = 0;
  for (let x = 0; x < 298; x++) {
    for (let y = 0; y < 298; y++) {
      const sumFirstRow = grid[x][y] + grid[x + 1][y] + grid[x + 2][y];
      const sumSecondRow =
        grid[x][y + 1] + grid[x + 1][y + 1] + grid[x + 2][y + 1];
      const sumThirdRow =
        grid[x][y + 2] + grid[x + 1][y + 2] + grid[x + 2][y + 2];

      const sum = sumFirstRow + sumSecondRow + sumThirdRow;

      if (sum > largestSum) {
        largestSum = sum;
        largest3x3Cord = [x + 1, y + 1];
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
console.log(day11_part1(9445));
