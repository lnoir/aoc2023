import { loadLinesFromFile } from "../helpers";
import { NumberRegExp, SymbolRegExp } from "./03.constants";

export function getValuesFromLine(line: string, pattern: RegExp) {
  const foundValues = [...line.matchAll(pattern)];
  return foundValues.map(m => ({value: m[0], index: m.index}));
}

export function compareLinesAndReturnSymbolAdjacentNumbers(current: string, previous: string | undefined, next: string | undefined) {
  // Get the numbers in the row, their length and row index
  const numbers = getValuesFromLine(current, NumberRegExp);
  if (!numbers.length) return [];

  // Get positions of symbols in adjacent rows
  const symbols: any = [];
  getValuesFromLine(current, SymbolRegExp).forEach(s => symbols.push(s));
  if (previous) getValuesFromLine(previous, SymbolRegExp).forEach(s => symbols.push(s));
  if (next) getValuesFromLine(next, SymbolRegExp).forEach(s => symbols.push(s));
  
  // Compare each number to positions to determine adjacency
  const adjacent: number[] = [];
  for (const n of numbers) {
    if (n.index === undefined) continue;
    const num = n.value;
    const min = n.index === 0 ? 0 : n.index - 1;
    const max = n.index + num.length;

    symbolLoop:
    for (const sym of symbols) {
      if (sym.index >= min && sym.index <= max) {
        adjacent.push(Number(n.value));
        break symbolLoop;
      }
    }
  }
  console.log('@adj', adjacent)
  return adjacent;
}

export function getPartNumbers(index: number, line: string, lines: string[]): number[] {
  let previous, next;
  if (index > 0) previous = lines[index - 1];
  if (index < lines.length - 1) next = lines[index + 1];
  return compareLinesAndReturnSymbolAdjacentNumbers(line, previous, next);
}

export function getSolutionA(file = './03/03.input.txt'): number {
  let partNumbers: number[] = [];
  const lines = loadLinesFromFile(file);
  lines.map((line, i) => getPartNumbers(i, line, lines)).map(r => partNumbers = partNumbers.concat(r));
  const sum = partNumbers.reduce((total: number, partNumber: number) => {
    return total + partNumber;
  }, 0);
  return sum;
}