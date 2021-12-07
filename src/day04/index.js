import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

function checkBoard(board) {
  const h = board.match(
    /[o]{5}.{20}|.{5}[o]{5}.{15}|.{10}[o]{5}.{10}|.{5}[o]{5}.{15}|[o]{5}.{20}/m,
  );
  const v = board.match(/[o].{4}[o].{4}[o].{4}[o].{4}[o]/m);
  //const dl = board.match(/[o].{4}[o].{4}[o].{4}[o].{4}[o]/m);
  //const dr = board.match(/.{4}[o].{3}[o].{3}[o].{3}[o].{3}[o].{4}/m);
  return !!h || !!v;
}

const setup = (input) => {
  const calls = input
    .shift()
    .split(",")
    .map((i) => parseInt(i));
  const boards = input.map((i) => i.match(/([\d]+)/g).map((i) => parseInt(i)));
  let answers = boards.map((e, i) => e.reduce((s) => (s += "x"), ""));
  const positions = {};
  boards.forEach((board, i) => {
    board.forEach((number, position) => {
      if (!positions[number]) positions[number] = [];
      positions[number].push({ bId: i, pId: position });
    });
  });
  return { calls, boards, answers, positions };
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { calls, boards, answers, positions } = setup(input);
  let answer = 0;
  let hasWon = false;
  for (const call of calls) {
    if (hasWon) break;
    positions[call].forEach(({ bId, pId }) => {
      answers[bId] =
        answers[bId].slice(0, pId) +
        "o" +
        answers[bId].slice(pId + 1, answers[bId].length);
      boards[bId][pId] = 0;
      if (checkBoard(answers[bId])) {
        answer = boards[bId].reduce((a, c) => a + c, 0) * call;
        console.log("won", { call }, { bId }, { answer });
        hasWon = true;
      }
    });
  }
  return answer;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const { calls, boards, answers, positions } = setup(input);
  let totalBoards = boards.length;
  let answer = 0;
  let hasWon = boards.map((b) => false);
  // loop through calls
  for (const call of calls) {
    // loop through borad positions for calls
    for (const { bId, pId } of positions[call]) {
      // set answer string at pos to o
      answers[bId] =
        answers[bId].slice(0, pId) +
        "o" +
        answers[bId].slice(pId + 1, answers[bId].length);
      // set board number to 0
      boards[bId][pId] = 0;

      if (checkBoard(answers[bId]) && !hasWon[bId]) {
        totalBoards--;
        hasWon[bId] = true;
        // console.log(totalBoards, call, answers[bId]);
      }
      if (totalBoards == 0) {
        answer = boards[bId].reduce((a, c) => a + c, 0) * call;
        console.log("lost", { call }, { bId }, { answer });
        break;
      }
    }
    //console.log(call, answers);
    if (totalBoards == 0) break;
  }
  return answer;
};

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
