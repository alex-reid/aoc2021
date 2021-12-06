import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((l) => l.match(/([a-z]+) ([0-9]+)/));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let move = { h: 0, d: 0 };
  input.forEach((e, i) => {
    const dir = e[1];
    const dist = parseInt(e[2]);
    if (dir === "forward") move.h += dist;
    if (dir === "down") move.d += dist;
    if (dir === "up") move.d -= dist;
  });
  return move.h * move.d;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let move = { h: 0, d: 0, aim: 0 };
  input.forEach((e, i) => {
    const dir = e[1];
    const dist = parseInt(e[2]);
    if (dir === "down") move.aim += dist;
    if (dir === "up") move.aim -= dist;
    if (dir === "forward") {
      move.h += dist;
      move.d += move.aim * dist;
    }
  });
  return move.h * move.d;
};

run({
  part1: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
