import { loadLinesFromFile } from "../helpers";

export function extractValueByFirstLastDigit(line: string): number {
  const digits = line.split('').filter(char => /\d/.test(char));
  const first = digits.shift() as string;
  const last = digits.pop();
  const num = Number(first + (last || first));
  return num;
}

export function getSolution(): number {
  const lines = loadLinesFromFile('./01/01.input.txt');
  const result = lines
    .map(line => extractValueByFirstLastDigit(line))
    .reduce((prev: number, curr: number) => {
      return prev + curr;
    }, 0);
  return result;
}