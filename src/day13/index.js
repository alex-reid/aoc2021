import run from "aocrunner";

const testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along x=5
fold along y=7`;

const parseInput = (rawInput) => {
  const split = rawInput.split("\n\n");
  return {
    dots: split[0].split("\n").map((i) => i.split(",").map((j) => parseInt(j))),
    folds: split[1].split("\n").map((i) => {
      const j = i.match(/([x|y])=([\d]+)/);
      return {
        dir: j[1],
        v: j[2],
      };
    }),
  };
};

const printArr = (arr) =>
  arr.reduce(
    (a, c) => a + c.reduce((a, c) => (a += c ? "#" : " "), "") + "\n",
    "",
  );

const makePaper = (input) => {
  const { mx, my, mnx, mny } = input.dots.reduce(
    (a, c) => ({
      mx: c[0] > a.mx ? c[0] : a.mx,
      my: c[1] > a.my ? c[1] : a.my,
      mnx: c[0] < a.mnx ? c[0] : a.mnx,
      mny: c[1] < a.mny ? c[1] : a.mny,
    }),
    { mx: 0, my: 0, mnx: 9999999, mny: 9999999 },
  );
  const paper = new Array(my + 1)
    .fill()
    .map((i) => new Array(mx + 1).fill().map((j) => false));
  input.dots.forEach((dot) => {
    paper[dot[1]][dot[0]] = true;
  });
  //console.log(mx, my, mnx, mny, paper.length, paper[0].length);
  return paper;
  // const paper = [];
  // input.dots.forEach((dot) => {
  //   if (!paper[dot[1]]) paper[dot[1]] = [];
  //   paper[dot[1]][dot[0]] = true;
  // });
  // return paper.map((i) => i.map((j) => (j ? true : false)));
};

const foldY = (paper, foldAt) => {
  console.log(paper.length / 2, foldAt);
  const output = [];
  for (let y = 0; y < foldAt; y++) {
    output[y] = [];
    for (let x = 0; x < paper[y].length; x++) {
      output[y][x] = paper[y][x] || paper[foldAt * 2 - y]?.[x];
    }
  }
  //console.log(foldAt, "y", output.length, "x", output[0].length);
  return output;
};

const foldX = (paper, foldAt) => {
  console.log(paper[0].length / 2, foldAt);
  const output = [];
  //console.log(paper.length);
  for (let y = 0; y < paper.length; y++) {
    output[y] = [];
    for (let x = 0; x < foldAt; x++) {
      output[y][x] = paper[y][x] || paper[y][foldAt * 2 - x];
    }
  }
  //console.log(foldAt, "x", output[0].length, "y", output.length);
  return output;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let paper = makePaper(input);
  //console.log(paper, printArr(paper));
  if (input.folds[0].dir == "y") paper = foldY(paper, input.folds[0].v);
  if (input.folds[0].dir == "x") paper = foldX(paper, input.folds[0].v);
  //console.log(printArr(paper));

  return paper.reduce((a, c) => (a += c.reduce((a, c) => (a += c ? 1 : 0))), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let paper = makePaper(input);
  //console.log(paper[889]);

  input.folds.forEach((fold) => {
    if (fold.dir == "y") paper = foldY(paper, fold.v);
    if (fold.dir == "x") paper = foldX(paper, fold.v);
    //console.log(paper.length, paper[0].length);
  });
  console.log(printArr(paper));

  return "UEFZCUCJ";
};

run({
  part1: {
    tests: [{ input: testInput, expected: 17 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 17 }],
    solution: part2,
  },
  trimTestInputs: true,
});
