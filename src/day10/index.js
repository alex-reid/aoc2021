import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((i) => i.split(""));

const openChars = ["(", "[", "{", "<"];
const closeChars = [")", "]", "}", ">"];

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let out = 0;
  for (const j of input) {
    const stack = [];
    for (const i of j) {
      if (openChars.includes(i)) {
        stack.push(openChars.indexOf(i));
      } else {
        if (stack.pop() != closeChars.indexOf(i)) {
          if (i == ")") out += 3;
          if (i == "]") out += 57;
          if (i == "}") out += 1197;
          if (i == ">") out += 25137;
          break;
        }
      }
    }
  }

  return out;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const scores = [];
  for (const j of input) {
    const stack = [];
    let good = true;
    for (const i of j) {
      if (openChars.includes(i)) {
        stack.push(openChars.indexOf(i));
      } else {
        if (stack.pop() != closeChars.indexOf(i)) {
          good = false;
          break;
        }
      }
    }
    if (good) {
      scores.push(stack.reverse().reduce((a, c) => a * 5 + c + 1, 0));
    }
  }

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

run({
  part1: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
