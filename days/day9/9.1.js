function day9_part1(numPlayers, numMarbles) {
  let currentPlayer = 2;
  let playerScores = new Array(numPlayers).fill(0);

  let marbleCircle = [0, 1];
  let currentMarble = 1;
  for (
    let currentMarbleWorth = 2;
    currentMarbleWorth <= numMarbles;
    currentMarbleWorth++
  ) {
    if (currentMarbleWorth % 23 !== 0) {
      if (currentMarble === marbleCircle.length - 1) {
        currentMarble = 1;
      } else {
        currentMarble += 2;
      }
      marbleCircle.splice(currentMarble, 0, currentMarbleWorth);
    } else {
      playerScores[currentPlayer - 1] += currentMarbleWorth;

      if (currentMarble - 7 >= 0) {
        currentMarble -= 7;
      } else {
        currentMarble = currentMarble - 7 + marbleCircle.length;
      }

      playerScores[currentPlayer - 1] += parseInt(
        marbleCircle.splice(currentMarble, 1)
      );
    }

    // console.log(marbleCircle);

    if (currentPlayer >= numPlayers) {
      currentPlayer = 1;
    } else {
      currentPlayer++;
    }
  }

  return Math.max(...playerScores);
}

console.log(day9_part1(9, 25));
console.log(day9_part1(10, 1618));
console.log(day9_part1(13, 7999));
console.log(day9_part1(17, 1104));
console.log(day9_part1(21, 6111));
console.log(day9_part1(30, 5807));

//puzzle input
console.log(day9_part1(418, 71339));
