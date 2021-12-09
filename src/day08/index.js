import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((i) => i.split("|"));

const part1 = (rawInput) => {
  const input = parseInput(rawInput).map((i) => i[1].match(/[\w]+/g));
  return input
    .flat()
    .reduce((a, c) => (a += [2, 3, 4, 7].includes(c.length) ? 1 : 0), 0);
};

const getNumbers = (codes) => ({
  1: codes.find((i) => i.length == 2),
  4: codes.find((i) => i.length == 4),
  7: codes.find((i) => i.length == 3),
});

const countAlpha = (input) => ({
  a: input.match(/a/g).length,
  b: input.match(/b/g).length,
  c: input.match(/c/g).length,
  d: input.match(/d/g).length,
  e: input.match(/e/g).length,
  f: input.match(/f/g).length,
  g: input.match(/g/g).length,
});

const strIntersect = (a, b) =>
  a.split("").filter((x) => !b.split("").includes(x))[0];

/*
a = 8 x (7 - 1)
b = 6
c = 8 x (what ever is not in 1)
d = 7 x (4 - (7 + b))
e = 4
f = 9
g = 7 x (left over at end)
*/

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const output = [];
  for (let i = 0; i < input.length; i++) {
    const codes = input[i][0].match(/[\w]+/g);

    const numbers = getNumbers(codes);
    const alpha = countAlpha(input[i][0]);

    const positions = {};
    for (let a in alpha) {
      switch (alpha[a]) {
        case 6:
          positions.b = a;
          break;
        case 9:
          positions.f = a;
          break;
      }
    }
    positions.c = strIntersect(numbers[1], positions.f);
    positions.d = strIntersect(numbers[4], numbers[7] + positions.b);

    const digits = input[i][1].match(/[\w]+/g);

    output[i] = "";
    for (const num of digits) {
      switch (num.length) {
        case 2:
          output[i] += "1";
          break;
        case 3:
          output[i] += "7";
          break;
        case 4:
          output[i] += "4";
          break;
        case 7:
          output[i] += "8";
          break;
        case 5:
          if (num.indexOf(positions.b) != -1) {
            output[i] += "5";
          } else if (num.indexOf(positions.f) != -1) {
            output[i] += "3";
          } else {
            output[i] += "2";
          }
          break;
        case 6:
          if (num.indexOf(positions.d) == -1) {
            output[i] += "0";
          } else if (num.indexOf(positions.c) == -1) {
            output[i] += "6";
          } else {
            output[i] += "9";
          }
          break;
      }
    }
  }
  return output.reduce((a, c) => (a += parseInt(c)), 0);
};

run({
  part1: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
