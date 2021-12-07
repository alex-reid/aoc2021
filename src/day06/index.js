import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(",");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const population = new Array(9).fill().map((i) => 0);
  for (let num of input) {
    population[num]++;
  }
  for (let day = 0; day < 80; day++) {
    const first = population.shift();
    population.push(first);
    population[6] += first;
  }
  return population.reduce((a, c) => (a += c), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const population = new Array(9).fill().map((i) => 0);
  for (let num of input) {
    population[num]++;
  }
  for (let day = 0; day < 256; day++) {
    const first = population.shift();
    population.push(first);
    population[6] += first;
  }
  return population.reduce((a, c) => (a += c), 0);
};

run({
  part1: {
    tests: [{ input: `3,4,3,1,2`, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `3,4,3,1,2`, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
});
