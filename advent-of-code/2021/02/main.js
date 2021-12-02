import { readInputLines } from "../../../challenge_utils.js";

const INSTRUCTIONS = readInputLines("advent-of-code/2021/02")
  .map((instruction) => instruction.split(" "))
  .map(([command, valueStr]) => [command, parseInt(valueStr)]);

function part1() {
  let horizontalPosition = 0;
  let depth = 0;
  INSTRUCTIONS.forEach(([command, value]) => {
    switch (command) {
      case "forward":
        horizontalPosition += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
    }
  });
  console.log(horizontalPosition * depth);
}

function part2() {
  let horizontalPosition = 0;
  let aim = 0;
  let depth = 0;
  INSTRUCTIONS.forEach(([command, value]) => {
    switch (command) {
      case "forward":
        horizontalPosition += value;
        depth += aim * value;
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
    }
  });
  console.log(horizontalPosition * depth);
}

part1();
part2();
