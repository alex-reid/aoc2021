import run from "aocrunner";

const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const parseInput = (rawInput) =>
  rawInput.split("\n").map((i) => i.split("").map((j) => parseInt(j)));

const printArr = (arr) =>
  arr.reduce(
    (a, c) =>
      a +
      c.reduce((a, c) => (a += c == 0 ? "\x1b[33m" + c + "\x1b[0m" : c), "") +
      "\n",
    "",
  );

const initFlashArr = (arr) => arr.map((i) => i.map((j) => false));

const addToArr = (input) => {
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      input[y][x] += 1;
    }
  }
  return input;
};

const addToNeighbours = (array, hasFlashed, posX, posY) => {
  let out = 0;
  const yMax = array.length;
  const xMax = array[0].length;
  for (let y = -1; y < 2; y++) {
    const yPos = posY + y;
    // exit clause
    if (yPos < 0 || yPos > yMax - 1) continue;
    for (let x = -1; x < 2; x++) {
      const xPos = posX + x;
      // exit clause
      if (xPos < 0 || xPos > xMax - 1 || (x == 0 && y == 0)) continue;
      // ADD LOGIC HERE
      if (!hasFlashed[yPos][xPos]) array[yPos][xPos] += 1;
    }
  }
  return out;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let flashes = 0;

  for (let iteration = 0; iteration < 100; iteration++) {
    const hasFlashed = initFlashArr(input);
    addToArr(input);
    while (true) {
      let run = false;
      for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
          if (input[y][x] > 9) {
            flashes++;
            run = true;
            input[y][x] = 0;
            hasFlashed[y][x] = true;
            addToNeighbours(input, hasFlashed, x, y);
          }
        }
      }
      if (!run) break;
    }
    if (iteration > 192 && iteration < 197) console.log(printArr(input));
  }

  return flashes;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let step = 0;

  for (let iteration = 0; iteration < 1000; iteration++) {
    let flashes = 0;
    const hasFlashed = initFlashArr(input);
    addToArr(input);
    while (true) {
      let run = false;
      for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
          if (input[y][x] > 9) {
            flashes++;
            run = true;
            input[y][x] = 0;
            hasFlashed[y][x] = true;
            addToNeighbours(input, hasFlashed, x, y);
          }
        }
      }
      if (!run) break;
    }
    if (iteration > 465) console.log(printArr(input));
    if (flashes >= input.length * input[0].length) {
      step = iteration + 1;
      break;
    }
  }

  return step;
};

run({
  part1: {
    tests: [{ input: testInput, expected: 1656 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 195 }],
    solution: part2,
  },
  trimTestInputs: true,
});
