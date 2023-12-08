import { loadLinesFromFile } from "../helpers";

type TraversalResult = {
  endpoint: string;
  steps: number;
}

type NodeMap = Record<string, string[]>

const directions: Record<string, number> = {
  L: 0,
  R: 1
};

export function buildNodes(lines: string[]) {
  const nodes: NodeMap = {};
  lines.forEach(line => {
    if (!line.trim()) return;
    const [head, tail] = line.replace(/[\(\)]/g, '').split('=');
    const node = head.trim();
    const [left, right] = tail.split(',');
    nodes[node] = [left.trim(), right.trim()];
  });
  return nodes;
}

export function getNextNode(nodes: any, sequence: string, sequenceIndex: number, currentNode: string, step = 0): TraversalResult {
  const nextDirection = sequence[sequenceIndex];
  //console.log({nodes, sequence, sequenceIndex, currentNode, nextDirection});
  let result = {
    endpoint: nodes[currentNode][directions[nextDirection]],
    steps: step + 1
  };
  //console.log('@getNextNode returning:', result);
  return result;
}

export function traverseNodes(nodes: any, sequence: string, sequenceIndex: number, currentNode: string, step = 0): TraversalResult {
  let result: any = {
    endpoint: currentNode,
    steps: 0
  };
  while (result.endpoint !== 'ZZZ') {
    result = getNextNode(nodes, sequence, sequenceIndex, currentNode, result.steps);
    currentNode = result.endpoint;
    sequenceIndex = sequenceIndex > sequence.length - 2 ? 0 : sequenceIndex + 1;
  }
  return result;
}

export function getSolutionA(file = './08/08.input.txt'): number {
  const lines = loadLinesFromFile(file);
  const sequence = lines.shift()?.trim() as string;
  const nodes = buildNodes(lines);
  const nodeKeys = Object.keys(nodes);
  const startNode = nodeKeys[nodeKeys.indexOf('AAA')];
  const result = traverseNodes(nodes, sequence, 0, startNode);
  return result.steps;
}