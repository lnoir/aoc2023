import { loadLinesFromFile } from "../helpers";


export function addOrSubtract(lower: number, upper: number, reverse = false) {
  if (reverse) {
    return upper - lower;
  }
  return upper + lower;
}

export function getDeltas(values: number[]) {
  const deltas: any[] = [];
  for (let i = 1; i < values.length; i++) {
    deltas.push(values[i] - values[i - 1]);
  }
  return deltas;
}

export function populateDifferences(arr: any) {
  const [values, differences] = arr;
  let deltas = values;
  let complete = false;
  while (!complete) {
    deltas = getDeltas(deltas);
    differences.push(deltas);
    let reachedBottom = true;
    for (const d of deltas) {
      reachedBottom = d === 0;
      if (!reachedBottom) break;
    }
    if (!reachedBottom) continue;
    complete = true;
  }
  return arr;
}

export function createMultidimensionalArray(lines: string[]) {
  const arr = lines.map(line => {
    return [line.split(/\s+/).map(num => Number(num.trim())), []];
  });
  return arr;
}

export function predictNextNumbers(arr: any, reverse = false) {
  const lastDeltaIndex = arr[1].length - 1;
  const lastValueIndex = arr[0].length - 1;
  const action = reverse ? 'unshift' : 'push';
  for (let i = lastDeltaIndex - 1; i > -1; i--) {
    const curr = arr[1][i];
    const prev = arr[1][i+1];
    const currIndex = reverse ? 0 : curr.length - 1;
    const prevIndex = reverse ? 0 : prev.length - 1;
    switch(i) {
      case lastDeltaIndex:
        curr[action](0); continue;
      case lastDeltaIndex - 1:
        curr[action](curr[currIndex]); continue;
      default:
        if (reverse) {
          curr[action](addOrSubtract(prev[prevIndex], curr[currIndex], reverse));
        }
        else {
          curr[action](addOrSubtract(prev[prevIndex], curr[currIndex]));
        }
    }
  }
  const mainEndVal = arr[0][reverse ? 0 : lastValueIndex];
  const diffEndVal = arr[1][0][reverse ? 0 : arr[1][0].length - 1];
  arr[0][action](addOrSubtract(diffEndVal, mainEndVal, reverse));
  return arr;
}

export function getSolutionA(file = './09/09.input.txt'): number {
  const lines = loadLinesFromFile(file);
  const valueArrays = createMultidimensionalArray(lines);
  valueArrays.forEach(arr => populateDifferences(arr));
  valueArrays.forEach(arr => predictNextNumbers(arr));
  return valueArrays.reduce((total, arr) => {return total + arr[0][arr[0].length - 1]}, 0);
}

export function getSolutionB(file = './09/09.input.txt'): number {
  const lines = loadLinesFromFile(file);
  const valueArrays = createMultidimensionalArray(lines);
  valueArrays.forEach(arr => populateDifferences(arr));
  valueArrays.forEach(arr => predictNextNumbers(arr, true));
  return valueArrays.reduce((total, arr) => {return total + arr[0][0]}, 0);
}