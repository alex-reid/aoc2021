import run from "aocrunner";

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((v, i) => {
    if (i === 0) return v.split("");
    else
      return v
        .split("\n")
        .map((j) => j.split(" -> "))
        .reduce((obj, i) => ({ ...obj, [i[0]]: i[1] }), {});
  });

/**
 *
 * @param in1 = {a:1,b:2,c:3}
 * @param in2 = {a:1,b:2,c:3}
 * @param n = 'H'
 * */

const makeCounts = (in1, in2, n) => {
  const out = { ...in1 };
  for (const l in in2) {
    if (!out[l]) out[l] = 0;
    out[l] += in2[l];
  }
  if (n) {
    if (!out[n]) out[n] = 0;
    out[n] += 1;
  }
  return out;
};

/*
countLetters needs to:
check memo
- if depth and pair are memo'd then return counts

at max depth
- add all initial vars to counts
- return counts

if at 0 depth
- memo {depth:{pair:{returned obj}}}
- return {} with added letter - makeCounts({},{},letter)

if > 0 depth
- combine returned results with added letter - makeCounts(recurse[0],recurse[1],letter)
- memo {depth:{pair:{returned obj}}}
- return combined counts
*/

const countRecurse = (input, pairs, depth, memo = {}, start = true) => {
  const inputPair = input.join("");

  const memoCount = memo[depth]?.[inputPair];
  if (memoCount) return memoCount;

  let count = {};
  const insert = pairs[inputPair];

  if (start) {
    for (let l = 0; l < input.length - 1; l++) {
      count = makeCounts(
        count,
        countRecurse([input[l], input[l + 1]], pairs, depth - 1, memo, false),
        false,
      );
    }
    for (let l = 0; l < input.length; l++) {
      count = makeCounts(count, {}, input[l]);
    }
  } else if (depth == 0) {
    count = { [insert]: 1 };
  } else if (depth > 0) {
    count = makeCounts(
      countRecurse([input[0], insert], pairs, depth - 1, memo, false),
      countRecurse([insert, input[1]], pairs, depth - 1, memo, false),
      insert,
    );
  }

  if (!memo[depth]) memo[depth] = {};
  memo[depth][inputPair] = count;

  return count;
};

const getOutputNum = (counts) => {
  let h = 0;
  let l = 999999999999999999;
  for (const letter in counts) {
    const c = counts[letter];
    if (c > h) h = c;
    if (c < l) l = c;
  }
  return h - l;
};

const part1 = (rawInput) => {
  const depth = 10;
  const input = parseInput(rawInput);
  const template = input[0];
  const pairs = input[1];
  const counts = countRecurse(template, pairs, depth);
  //console.log(counts);
  return getOutputNum(counts);
};

const part2 = (rawInput) => {
  const depth = 40;
  const input = parseInput(rawInput);
  const template = input[0];
  const pairs = input[1];
  const counts = countRecurse(template, pairs, depth);
  //console.log(counts);
  return getOutputNum(counts);
};

run({
  part1: {
    tests: [{ input: testInput, expected: 1588 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 2188189693529 }],
    solution: part2,
  },
  trimTestInputs: true,
});
