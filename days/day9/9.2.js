class Node {
  constructor(value, prev, next) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

function insertNode(node, value) {
  let nextNode = node.next;
  let newNode = new Node(value, nextNode, nextNode.next);

  nextNode.next = newNode;
  nextNode.next.next.prev = newNode;

  return newNode;
}

function removeNode(node) {
  let prevNode = node.prev.prev.prev.prev.prev.prev.prev;

  prevNode.prev.next = prevNode.next;
  prevNode.next.prev = prevNode.prev;

  return [prevNode.next, prevNode.value];
}

function day9_part2(numPlayers, numMarbles) {
  let currentPlayer = 2;
  let playerScores = new Array(numPlayers).fill(0);

  let firstNode = new Node(0, undefined, undefined);
  firstNode.prev = firstNode;
  firstNode.next = firstNode;

  // n - n
  let currentMarble = new Node(1, firstNode, firstNode);
  firstNode.prev = currentMarble;
  firstNode.next = currentMarble;

  for (
    let currentMarbleWorth = 2;
    currentMarbleWorth <= numMarbles;
    currentMarbleWorth++
  ) {
    if (currentMarbleWorth % 23 !== 0) {
      currentMarble = insertNode(currentMarble, currentMarbleWorth);
    } else {
      playerScores[currentPlayer - 1] += currentMarbleWorth;
      const removeNodeReturn = removeNode(currentMarble);

      playerScores[currentPlayer - 1] += removeNodeReturn[1];
      currentMarble = removeNodeReturn[0];
    }

    if (currentPlayer >= numPlayers) {
      currentPlayer = 1;
    } else {
      currentPlayer++;
    }
  }

  return Math.max(...playerScores);
}

console.log(day9_part2(9, 25));
console.log(day9_part2(10, 1618));
console.log(day9_part2(13, 7999));
console.log(day9_part2(17, 1104));
console.log(day9_part2(21, 6111));
console.log(day9_part2(30, 5807));

// //puzzle input
console.log(day9_part2(418, 71339));
console.log(day9_part2(418, 71339 * 100));
