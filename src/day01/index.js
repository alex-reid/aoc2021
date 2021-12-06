import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((i) => parseInt(i));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;
  for (let i = 1; i < input.length; i++) {
    //console.log(input[i],input[i-1],(input[i]>input[i-1]))
    if (input[i] > input[i - 1]) count++;
  }
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;
  for (let i = 0; i < input.length - 3; i++) {
    const s1 = input.slice(i, i + 3).reduce((a, v) => a + v);
    const s2 = input.slice(i + 1, i + 4).reduce((a, v) => a + v);
    //console.log(s1,s2,(s1 < s2),input.slice(i,i+3),input.slice(i+1,i+4))
    if (s1 < s2) count++;
  }
  return count;
};

run({
  part1: {
    tests: [
      {
        input: `199
200
208
210
200
207
240
269
260
263`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `199
200
208
210
200
207
240
269
260
263`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
