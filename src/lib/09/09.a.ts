import { loadLinesFromFile } from "../helpers";

export function getDeltas(values: number[]) {
  const deltas = [];
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

export function predictNextNumbers(arr: any) {
  const lastDeltaIndex = arr[1].length - 1;
  const lastValueIndex = arr[0].length - 1;
  for (let i = lastDeltaIndex - 1; i > -1; i--) {
    const curr = arr[1][i];
    const prev = arr[1][i+1];
    switch(i) {
      case lastDeltaIndex:
        curr.push(0); continue;
      case lastDeltaIndex - 1:
        curr.push(curr[curr.length - 1]); continue;
      default:
        curr.push(prev[prev.length - 1] + curr[curr.length - 1]);
    }
  }
  arr[0].push(arr[1][0][arr[1][0].length - 1] + arr[0][lastValueIndex]);
  //console.log(arr)
  return arr;
}

export function getSolutionA(file = './09/09.input.txt'): number {
  const lines = loadLinesFromFile(file);
  const valueArrays = createMultidimensionalArray(lines);
  valueArrays.forEach(populateDifferences);
  valueArrays.forEach(predictNextNumbers);
  return valueArrays.reduce((total, arr) => {return total + arr[0][arr[0].length - 1]}, 0);
}