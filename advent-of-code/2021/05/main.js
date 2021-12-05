import { readInputLines } from "../../../challenge_utils.js";

const DANGEROUS_OVERLAPS_THRESHOLD = 2;

function parseCoordinate(str) {
  return str.split(",").map((x) => parseInt(x));
}

function parseLineSegment(str) {
  return str.split(" -> ").map(parseCoordinate);
}

// const GROUPED_LINE_SEGMENTS = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`
const GROUPED_LINE_SEGMENTS = readInputLines("advent-of-code/2021/05")
  .map(parseLineSegment)
  .reduce(
    (groups, line) => {
      const { horizontal, vertical, leftDiagonal, rightDiagonal } = groups;
      const [[x1, y1], [x2, y2]] = line;
      if (x1 === x2) {
        return {
          ...groups,
          vertical: [...vertical, line],
        };
      } else if (y1 === y2) {
        return {
          ...groups,
          horizontal: [...horizontal, line],
        };
      } else if (x2 - x1 === y2 - y1) {
        return {
          ...groups,
          leftDiagonal: [...leftDiagonal, line],
        };
      } else if (x2 - x1 === y1 - y2) {
        return {
          ...groups,
          rightDiagonal: [...rightDiagonal, line],
        };
      } else {
        throw Error("invalid line", line);
      }
    },
    {
      horizontal: [],
      vertical: [],
      leftDiagonal: [],
      rightDiagonal: [],
    }
  );

function hashCoordinate(x, y) {
  return `${x},${y}`;
}

function countsDangerousAreas(lines) {
  const counts = {};
  let numDangerousAreas = 0;
  for (const [[x1, y1], [x2, y2]] of lines) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    let [x, y] = [x1, y1];
    while (x !== x2 + dx || y !== y2 + dy) {
      const key = hashCoordinate(x, y);
      if (counts[key]) {
        if (counts[key] === 1) {
          numDangerousAreas++;
        }
        counts[key]++;
      } else {
        counts[key] = 1;
      }
      x += dx;
      y += dy;
    }
  }
  return numDangerousAreas;
}

function part1() {
  const { horizontal, vertical } = GROUPED_LINE_SEGMENTS;
  const numDangerousAreas = countsDangerousAreas([...horizontal, ...vertical]);
  console.log(numDangerousAreas);
}

function part2() {
  const { horizontal, vertical, leftDiagonal, rightDiagonal } =
    GROUPED_LINE_SEGMENTS;
  const numDangerousAreas = countsDangerousAreas([
    ...horizontal,
    ...vertical,
    ...leftDiagonal,
    ...rightDiagonal,
  ]);
  console.log(numDangerousAreas);
}

part1();
part2();
