function readFromFile() {
  let fs = require("fs");
  let content = fs.readFileSync("day4input.txt", "utf8");

  return content.split("\n");
}

function findSleepistGaurd(guards) {
  let sleepistGuard = {};
  let sleepistGuardId = 0;
  let maxSleep = 0;
  for (const guard of Object.keys(guards)) {
    if (maxSleep < guards[guard].totalTimeSlept) {
      sleepistGuard = guards[guard];
      sleepistGuardId = parseInt(guard);
      maxSleep = guards[guard].totalTimeSlept;
    }
  }

  return {
    sleepistGuard: sleepistGuard,
    sleepistGuardId: sleepistGuardId
  };
}

function findMostSleptOnMinute(sleepistGuard) {
  let mostSleptMinute = 0;
  let maxSleepOnMinute = 0;
  for (let i = 0; i < 60; i++) {
    if (maxSleepOnMinute < sleepistGuard.minutes[i]) {
      mostSleptMinute = i;
      maxSleepOnMinute = sleepistGuard.minutes[i];
    }
  }

  return mostSleptMinute;
}

function day4_part1(inputs) {
  const sortedLogs = inputs.sort();

  let currentGuard = "";
  let timeFellAsleep = 0;
  let guards = {};

  for (let log of sortedLogs) {
    const currentMinute = parseInt(
      log.substring(log.indexOf(":") + 1, log.indexOf(":") + 3)
    );
    // console.log(currentMinute);
    if (log.indexOf("#") !== -1) {
      currentGuard = log.split(" ")[3].replace("#", "");
    } else if (log.split(" ")[2].startsWith("f")) {
      // console.log("guard asleep");
      timeFellAsleep = currentMinute;
    } else {
      // console.log("gaurd awakes");
      // console.log(currentMinute);
      // console.log(timeFellAsleep);
      if (guards[currentGuard] === undefined) {
        // console.log("new guard");
        guards[currentGuard] = {
          minutes: new Array(60).fill(0),
          totalTimeSlept: 0
        };
      }

      guards[currentGuard].totalTimeSlept += currentMinute - timeFellAsleep;

      // console.log(guards[currentGuard].totalTimeSlept);
      for (; timeFellAsleep < currentMinute; timeFellAsleep++) {
        guards[currentGuard].minutes[timeFellAsleep]++;
      }
    }
  }

  const { sleepistGuard, sleepistGuardId } = findSleepistGaurd(guards);
  const mostSleptMinute = findMostSleptOnMinute(sleepistGuard);
  return sleepistGuardId * mostSleptMinute;
}

console.log(
  day4_part1([
    "[1518-11-01 00:05] falls asleep",
    "[1518-11-05 00:45] falls asleep",
    "[1518-11-01 00:25] wakes up",
    "[1518-11-04 00:46] wakes up",
    "[1518-11-03 00:29] wakes up",
    "[1518-11-01 00:00] Guard #10 begins shift",
    "[1518-11-05 00:03] Guard #99 begins shift",
    "[1518-11-01 00:55] wakes up",
    "[1518-11-04 00:36] falls asleep",
    "[1518-11-01 23:58] Guard #99 begins shift",
    "[1518-11-02 00:40] falls asleep",
    "[1518-11-03 00:05] Guard #10 begins shift",
    "[1518-11-02 00:50] wakes up",
    "[1518-11-01 00:30] falls asleep",
    "[1518-11-05 00:55] wakes up",
    "[1518-11-03 00:24] falls asleep",
    "[1518-11-04 00:02] Guard #99 begins shift"
  ])
);
// console.log(day4_part1(readFromFile()));
