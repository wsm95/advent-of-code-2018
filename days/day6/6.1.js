function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day6input.txt", "utf8");

  return content.split("\n");
}

function createPointPairs(inputs) {
  const points = [];
  let id = 0;
  for (const input of inputs) {
    const splitInput = input.split(",");
    const point = {
      x: parseInt(splitInput[1].trim()),
      y: parseInt(splitInput[0]),
      id: ++id,
      infinite: false
    };

    points.push(point);
  }

  return points;
}

function findGridDimension(points) {
  let xMax = points[0].x;
  let yMax = points[0].y;
  for (const point of points) {
    xMax < point.x && (xMax = point.x);
    yMax < point.y && (yMax = point.y);
  }

  return {
    xMax: xMax,
    yMax: yMax
  };
}

function createGrid(xMax, yMax) {
  const grid = [];
  for (x = 0; x <= xMax; x++) {
    const row = [];
    for (y = 0; y <= yMax; y++) {
      row.push({
        closestPoint: 0,
        distanceToPoint: -1
      });
    }
    grid.push(row);
  }

  return grid;
}

function findManhattanDistance(point1, point2) {
  return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y);
}

function findInfiniteAreas(areas, grid, xMax, yMax) {
  const top = [...new Set(grid[0].map(g => g.closestPoint))];
  const bottom = [...new Set(grid[xMax].map(g => g.closestPoint))];
  let left = [];
  let right = [];

  for (x = 0; x <= xMax; x++) {
    left.push(grid[x][0].closestPoint);
    right.push(grid[x][yMax].closestPoint);
  }

  left = [...new Set(left)];
  right = [...new Set(right)];

  pointIds = Object.keys(areas);
  for (const pointId of pointIds) {
    if (
      top.indexOf(parseInt(pointId)) !== -1 ||
      bottom.indexOf(parseInt(pointId)) !== -1 ||
      left.indexOf(parseInt(pointId)) !== -1 ||
      right.indexOf(parseInt(pointId)) !== -1
    ) {
      areas[pointId] = 0;
    }
  }

  return areas;
}

function day6_part1(inputs) {
  const points = createPointPairs(inputs);
  const { xMax, yMax } = findGridDimension(points);
  console.log(xMax, yMax);
  const grid = createGrid(xMax, yMax);

  let areas = {};
  for (const point of points) {
    areas[point.id] = 0;
    for (x = 0; x <= xMax; x++) {
      for (y = 0; y <= yMax; y++) {
        // find distance to x,y to point
        // check if there is closer point
        //    if equal put -1
        // assign grid

        const distance = findManhattanDistance(
          {
            x: x,
            y: y
          },
          {
            x: point.x,
            y: point.y
          }
        );

        if (
          distance < grid[x][y].distanceToPoint ||
          grid[x][y].distanceToPoint === -1
        ) {
          areas[point.id] += 1;
          areas[grid[x][y].closestPoint] -= 1;

          grid[x][y].closestPoint = point.id;
          grid[x][y].distanceToPoint = distance;
        } else if (grid[x][y].distanceToPoint === distance) {
          areas[grid[x][y].closestPoint] -= 1;
          grid[x][y].closestPoint = -1;
        }
      }
    }
  }

  areas = findInfiniteAreas(areas, grid, xMax, yMax);
  console.log(areas);
  let maxArea = 0;
  for (const pointId of Object.keys(areas)) {
    if (areas[pointId] > maxArea) {
      maxArea = areas[pointId];
    }
  }

  return maxArea;
}

console.log(day6_part1(["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"]));
console.log(day6_part1(readFromFile()));
