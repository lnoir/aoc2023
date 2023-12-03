import { loadLinesFromFile } from "../helpers";
import { getValuesFromLine } from "./03.a";
import { GearRegExp, NumberRegExp } from "./03.constants";


export function compareLinesAndReturnGearRatios(current: string, previous: string | undefined, next: string | undefined) {
  // Get the gears in the row
  const gears = getValuesFromLine(current, GearRegExp);
  if (!gears.length) return [];

  // Get the numbers in all three rows 
  const numbers: any = [];
  getValuesFromLine(current, NumberRegExp).forEach(s => numbers.push(s));
  if (previous) getValuesFromLine(previous, NumberRegExp).forEach(s => numbers.push(s));
  if (next) getValuesFromLine(next, NumberRegExp).forEach(s => numbers.push(s));
  
  // Get the gear ratios of gears adjacent to two numbers
  const ratios: number[] = [];
  for (const g of gears) {
    if (g.index === undefined) continue;
    const min = g.index === 0 ? 0 : g.index - 1;
    const max = g.index + 1;
    const found = [];

    numberLoop:
    for (const num of numbers) {
      const start = num.index;
      const end = num.index + num.value.length - 1;
      if ((start >= min || end >= min) && (start <= max || end <= max)) {
        found.push(Number(num.value));
      }
    }
    if (found.length === 2) {
      ratios.push(found[0] * found[1]);
    }
  }
  return ratios;
}

export function getGearRatios(index: number, line: string, lines: string[]) {
  let previous, next;
  if (index > 0) previous = lines[index - 1];
  if (index < lines.length - 1) next = lines[index + 1];
  return compareLinesAndReturnGearRatios(line, previous, next);
}

export function getSolutionB(file = './03/03.input.txt'): number {
  let ratios: number[] = [];
  const lines = loadLinesFromFile(file);
  lines.map((line, i) => getGearRatios(i, line, lines)).map(r => ratios = ratios.concat(r));
  const sum = ratios.reduce((total: number, partNumber: number) => {
    return total + partNumber;
  }, 0);
  return sum;
}