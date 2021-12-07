import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(",").map((i) => parseInt(i));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const min = Math.min(...input);
  const max = Math.max(...input);
  const fuelUsed = [];
  for (let pos = min; pos < max; pos++) {
    fuelUsed[pos] = input.reduce((a, c) => (a += Math.abs(pos - c)), 0);
  }
  //console.log(min, max, fuelUsed.length, input.length, fuelUsed);
  return Math.min(...fuelUsed);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const min = Math.min(...input);
  const max = Math.max(...input);
  const fuelUsed = [];
  for (let pos = min; pos < max; pos++) {
    fuelUsed[pos] = input.reduce((a, c) => {
      const n = Math.abs(pos - c);
      return (a += (n * (n + 1)) / 2);
    }, 0);
  }
  return Math.min(...fuelUsed);
};

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
