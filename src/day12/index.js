import run from "aocrunner";

const testInput1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const testInput3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const parseInput = (rawInput) => rawInput.split("\n").map((i) => i.split("-"));

const START = "start";
const END = "end";
const BIG = "big";
const SMALL = "small";

const getType = (input) => {
  if (input.match(/start/)) {
    return START;
  } else if (input.match(/end/)) {
    return END;
  } else if (input.match(/[A-Z]+/)) {
    return BIG;
  } else if (input.match(/[a-z]+/)) {
    return SMALL;
  }
};

const createNode = (map, element) => {
  if (!map[element[0]])
    map[element[0]] = { name: element[0], nodes: new Set() };
  if (!map[element[1]])
    map[element[1]] = { name: element[1], nodes: new Set() };
  if (!map[element[0]].type) map[element[0]].type = getType(element[0]);
  if (!map[element[1]].type) map[element[1]].type = getType(element[1]);
  map[element[0]].nodes.add(element[1]);
  map[element[1]].nodes.add(element[0]);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const map = {};
  input.forEach((element) => createNode(map, element));

  const paths = [];
  const traverse = (map, nextNode, path = ["start"]) => {
    nextNode.nodes.forEach((n) => {
      let node = map[n];
      switch (node.type) {
        case START:
          return;
        case END:
          path.push("end");
          paths.push(path);
          return;
        case BIG:
          traverse(map, node, [...path, node.name]);
          break;
        case SMALL:
          if (!path.includes(node.name))
            traverse(map, node, [...path, node.name]);
          break;
      }
    });
  };
  traverse(map, map.start);
  return paths.length;
};

const countOccurrences = (arr, val) => arr.filter((v) => v === val).length;

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const map = {};
  input.forEach((element) => createNode(map, element));

  const paths = [];
  const traverse = (map, currentNode, path = ["start"], visitSmall = true) => {
    currentNode.nodes.forEach((n) => {
      let node = map[n];
      switch (node.type) {
        case START:
          return;
        case END:
          path.push("end");
          paths.push(path);
          return;
        case BIG:
          traverse(map, node, [...path, node.name], visitSmall);
          break;
        case SMALL:
          if (!path.includes(node.name)) {
            traverse(map, node, [...path, node.name], visitSmall);
          } else {
            if (visitSmall && countOccurrences(path, node.name) < 2) {
              traverse(map, node, [...path, node.name], false);
            } else return;
          }
          break;
      }
    });
  };
  traverse(map, map.start);
  //console.log(paths);
  return paths.length;
};

run({
  part1: {
    tests: [
      { input: testInput1, expected: 10 },
      { input: testInput2, expected: 19 },
      { input: testInput3, expected: 226 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput1, expected: 36 },
      { input: testInput2, expected: 103 },
      { input: testInput3, expected: 3509 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
