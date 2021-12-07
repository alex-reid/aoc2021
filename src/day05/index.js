import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => {
    const [x1, y1, x2, y2] = row.match(/[\d]+/gm);
    return {
      s: [parseInt(x1), parseInt(y1)],
      e: [parseInt(x2), parseInt(y2)],
    };
  });

function lineDraw(x0, y0, x1, y1, array) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    array[y0][x0]++;

    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const HVinput = input.filter(
    (row) => row.s[0] == row.e[0] || row.s[1] == row.e[1],
  );
  const max = HVinput.reduce(
    (a, c) => Math.max(a, c.s[0], c.e[0], c.s[1], c.e[1]),
    0,
  );
  const grid = new Array(max + 1)
    .fill()
    .map((i) => new Array(max + 1).fill().map((i) => 0));
  for (const line of HVinput) {
    const {
      s: [x0, y0],
      e: [x1, y1],
    } = line;
    lineDraw(x0, y0, x1, y1, grid);
  }
  return grid.flat().reduce((a, c) => (a += c > 1 ? 1 : 0), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const max = input.reduce(
    (a, c) => Math.max(a, c.s[0], c.e[0], c.s[1], c.e[1]),
    0,
  );
  const grid = new Array(max + 1)
    .fill()
    .map((i) => new Array(max + 1).fill().map((i) => 0));
  for (const line of input) {
    const {
      s: [x0, y0],
      e: [x1, y1],
    } = line;
    lineDraw(x0, y0, x1, y1, grid);
  }
  return grid.flat().reduce((a, c) => (a += c > 1 ? 1 : 0), 0);
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
