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

function day6_part2(inputs, distanceThreshhold) {
  const points = createPointPairs(inputs);
  const { xMax, yMax } = findGridDimension(points);
  const grid = createGrid(xMax, yMax);

  let totalArea = 0;
  for (x = 0; x <= xMax; x++) {
    for (y = 0; y <= yMax; y++) {
      let totalDistance = 0;
      for (const point of points) {
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

        totalDistance += distance;
      }

      if (totalDistance < distanceThreshhold) {
        totalArea++;
      }
    }
  }

  return totalArea;
}

console.log(day6_part2(["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"], 32));
console.log(day6_part2(readFromFile(), 10000));
