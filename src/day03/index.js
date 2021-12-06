import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const inputNum = input.map((i) => parseInt(i, 2));
  let gamma = 0;
  let epsilon = 0;
  for (let i = 1; i < Math.pow(2, input[0].length); i *= 2) {
    let bit = 0;
    for (let j = 0; j < input.length; j++) {
      bit += inputNum[j] & i ? 1 : -1;
    }
    if (bit > 0) gamma += i;
    else epsilon += i;
  }
  return gamma * epsilon; //4147524
};

const testNumber = (inArr, bit, co2 = false) => {
  // console.log(bit, inArr.length);
  if (inArr.length == 1) return inArr[0];
  if (bit < 0) return "overflow";
  const oneArr = [];
  const zeroArr = [];
  for (let j = 0; j < inArr.length; j++) {
    if (inArr[j] & (1 << bit)) {
      oneArr.push(inArr[j]);
    } else {
      zeroArr.push(inArr[j]);
    }
  }
  let nextArr = oneArr.length >= zeroArr.length ? oneArr : zeroArr;
  if (co2) nextArr = oneArr.length < zeroArr.length ? oneArr : zeroArr;
  return testNumber(nextArr, bit - 1, co2);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const inputNum = input.map((i) => parseInt(i, 2));
  const o2 = testNumber(inputNum, input[0].length - 1);
  const co2 = testNumber(inputNum, input[0].length - 1, true);
  //console.log(o2, co2);
  return o2 * co2; // 3570354
};

run({
  part1: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
