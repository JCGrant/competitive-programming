import fs from "fs";

export function readInput(challengePath) {
  return fs.readFileSync(`${challengePath}/input.txt`, "utf-8");
}

export function readInputLines(challengePath) {
  return readInput(challengePath).split("\n");
}

export function readInputInts(challengePath) {
  return readInputLines(challengePath).map((line) => parseInt(line));
}

export function slidingWindows(array, length) {
  const windows = [];
  for (let i = 0; i < array.length - (length - 1); i++) {
    windows.push(array.slice(i, i + length));
  }
  return windows;
}

export function sum(array) {
  return array.reduce((acc, x) => acc + x, 0);
}

export function countIf(array, predicate) {
  let count = 0;
  let previousElem;
  array.forEach((elem) => {
    if (predicate(elem, previousElem)) {
      count += 1;
    }
    previousElem = elem;
  });
  return count;
}
