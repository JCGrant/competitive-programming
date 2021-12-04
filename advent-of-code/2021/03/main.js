import { readInputLines, getBit } from "../../../challenge_utils.js";

const NUMBERS = readInputLines("advent-of-code/2021/03").map((x) =>
  parseInt(x, 2)
);
const BIT_LENGTH = 12;
const BIT_MASK = (1 << BIT_LENGTH) - 1; // Binary number of all 1s, with length BIT_LENGTH

function incrementBitCount(count, bit) {
  return {
    ...count,
    [bit]: count[bit] + 1,
  };
}

function addCounts(counts, number) {
  return Object.entries(counts).reduce((newCounts, [position, count]) => {
    const bit = getBit(number, position);
    const newBitCount = incrementBitCount(count, bit);
    return {
      ...newCounts,
      [position]: newBitCount,
    };
  }, counts);
}

function countBits(numbers, bitLength) {
  const defaultCounts = Array.from({ length: bitLength }).map(() => ({
    0: 0,
    1: 0,
  }));
  return numbers.reduce(addCounts, defaultCounts);
}

function bitCountsToNumber(bitCounts) {
  return Object.values(bitCounts).reduce((num, bitCount, i) => {
    const mostCommonBit = bitCount[0] > bitCount[1] ? 0 : 1;
    return num + (mostCommonBit << i);
  }, 0);
}

function part1() {
  const bitCounts = countBits(NUMBERS, BIT_LENGTH);
  const gammaRate = bitCountsToNumber(bitCounts);
  const epsilonRate = gammaRate ^ BIT_MASK;
  const powerConsumption = gammaRate * epsilonRate;
  console.log(powerConsumption);
}

function filterNumbers(numbers, bitLength, bitCriteria) {
  for (let position = bitLength - 1; position >= 0; position--) {
    if (numbers.length === 1) {
      return numbers[0];
    }
    const bitCounts = countBits(numbers, bitLength);
    const bitCount = bitCounts[position];
    let bitFilter = bitCriteria(bitCount);
    numbers = numbers.filter(
      (number) => getBit(number, position) === bitFilter
    );
  }
  return numbers[0];
}

function part2() {
  const oxygenGeneratorRating = filterNumbers(
    NUMBERS,
    BIT_LENGTH,
    (bitCounts) => (bitCounts[1] >= bitCounts[0] ? 1 : 0)
  );
  const carbionDioxideScrubbrRating = filterNumbers(
    NUMBERS,
    BIT_LENGTH,
    (bitCounts) => (bitCounts[0] <= bitCounts[1] ? 0 : 1)
  );
  const powerConsumption = oxygenGeneratorRating * carbionDioxideScrubbrRating;
  console.log(powerConsumption);
}

part1();
part2();
