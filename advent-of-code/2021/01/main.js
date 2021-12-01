import {
  readInputInts,
  slidingWindows,
  countIf,
  sum,
} from "../../../challenge_utils.js";

const VALUES = readInputInts("advent-of-code/2021/01");
const WINDOW_LENGTH = 3;

function isGreaterThanAndExists(a, b) {
  return b && a > b;
}

function part1() {
  const numTimesIncreased = countIf(VALUES, isGreaterThanAndExists);
  console.log(numTimesIncreased);
}

function part2() {
  const windowSums = slidingWindows(VALUES, WINDOW_LENGTH).map(sum);
  const numTimesIncreased = countIf(windowSums, isGreaterThanAndExists);
  console.log(numTimesIncreased);
}

part1();
part2();
