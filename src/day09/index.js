import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((i) => i.split("").map((i) => parseInt(i)));

const getNeighbours = (input, x, y) => {
  const w = input[0].length;
  const h = input.length;
  const points = [9, 9, 9, 9];
  if (x != 0) points[3] = input[y][x - 1];
  if (x != w - 1) points[1] = input[y][x + 1];
  if (y != 0) points[0] = input[y - 1][x];
  if (y != h - 1) points[2] = input[y + 1][x];
  return points;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const w = input[0].length;
  const h = input.length;
  let risk = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (
        getNeighbours(input, x, y).filter((p) => p <= input[y][x]).length == 0
      ) {
        risk += 1 + input[y][x];
      }
    }
  }

  return risk;
};

const floodFill = (x, y, array, visited) => {
  visited[y][x] = true;
  const neigbours = getNeighbours(array, x, y);
  if (neigbours[0] != 9 && !visited[y - 1][x])
    floodFill(x, y - 1, array, visited);
  if (neigbours[1] != 9 && !visited[y][x + 1])
    floodFill(x + 1, y, array, visited);
  if (neigbours[2] != 9 && !visited[y + 1][x])
    floodFill(x, y + 1, array, visited);
  if (neigbours[3] != 9 && !visited[y][x - 1])
    floodFill(x - 1, y, array, visited);
};

const top3 = (input) => {
  const sorted = [...input].sort((a, b) => b - a);
  return [sorted[0], sorted[1], sorted[2]];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const w = input[0].length;
  const h = input.length;
  let lowest = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (
        getNeighbours(input, x, y).filter((p) => p <= input[y][x]).length == 0
      ) {
        lowest.push({ x, y });
      }
    }
  }
  const outputArray = [];
  for (let { x, y } of lowest) {
    const visited = input.map((i) => i.map((j) => false));

    floodFill(x, y, input, visited);
    // visited.reduce(
    //   (a, c) => (a += c.reduce((a, c) => (a += c ? "+" : "."), "") + "\n"),
    //   "",
    // ),
    outputArray.push(
      visited.reduce(
        (a, c) => (a += c.reduce((a, c) => (a += c ? 1 : 0), 0)),
        0,
      ),
    );
  }

  return top3(outputArray).reduce((a, c) => (a *= c));
};

run({
  part1: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
