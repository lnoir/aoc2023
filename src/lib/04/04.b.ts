import { loadLinesFromFile } from "../helpers";
import { NumberData, getLineValues } from "./04.a";

type EnrichedNumberData = NumberData & {
  index: number;
  matches: number;
}

export function enrichLineValues(data: NumberData, index: number): EnrichedNumberData {
  const matchingNumbers = [];
  for (const num of data.player) {
    if (data.card.includes(num)) {
      matchingNumbers.push(num);
    }
  }
  return {...data, index, matches: matchingNumbers.length};
}

export function generateCopies(data: EnrichedNumberData, values: EnrichedNumberData[], instanceArr: any[]) {
  if (!Array.isArray(instanceArr[data.index])) instanceArr[data.index] = [data];
  for (let i = 0; i < data.matches; i++) {
    const nextItemIndex = data.index + 1 + i;
    instanceArr[data.index].push(values[nextItemIndex]);
    generateCopies(values[nextItemIndex], values, instanceArr);
  }
}

export function processEnrichedData(data: EnrichedNumberData[]) {
  const instanceArr: any[] = [];
  data.forEach(d => generateCopies(d, data, instanceArr));
  return instanceArr;
}

export function getSolutionB(file = './04/04.input.txt'): number {
  const enriched = loadLinesFromFile(file)
    .map(getLineValues)
    .map(enrichLineValues);
  const copyData = processEnrichedData(enriched);
  const total = copyData.reduce((prev: number, curr: any) => {
    return prev + curr.length;
  }, 0);
  return total;
}