import {
  readInputLines,
  rotateArrayLeft,
  sum,
} from "../../../challenge_utils.js";

const REPRODUCED_FISH_TIMER = 6;
const NEW_FISH_TIMER = 8;
const INTERNAL_TIMERS = readInputLines("advent-of-code/2021/06")[0]
  .split(",")
  .map((x) => parseInt(x))
  .reduce(
    (fishesByDay, dayTimer) => {
      fishesByDay[dayTimer]++;
      return fishesByDay;
    },
    Array.from({ length: NEW_FISH_TIMER + 1 }).map(() => 0)
  );

function calculateNumFish(timers, numDays) {
  for (let i = 0; i < numDays; i++) {
    timers = rotateArrayLeft(timers);
    timers[REPRODUCED_FISH_TIMER] += timers[NEW_FISH_TIMER];
  }
  return sum(timers);
}

function part1() {
  const numFish = calculateNumFish(INTERNAL_TIMERS, 80);
  console.log(numFish);
}

function part2() {
  const numFish = calculateNumFish(INTERNAL_TIMERS, 256);
  console.log(numFish);
}

part1();
part2();
