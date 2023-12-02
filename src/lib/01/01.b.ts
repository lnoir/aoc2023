import { loadLinesFromFile } from "../helpers";

const numberWordMap: Record<string, string> = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};
const numberWords = Object.keys(numberWordMap);
const digits = Object.values(numberWordMap);

function getCharacterMatches(frag: string, line: string) {
  const pattern = `${frag}`;
  const regex = new RegExp(pattern, 'gi');
  const matches = [...line.matchAll(regex)];
  if (!matches?.length) return;
  return matches.filter(m => !!m);
}

export function getLineValue(line: string): number {
  const found: any[] = [];
  for (let word of numberWords) {
    const matches = getCharacterMatches(word, line);
    if (!matches?.length) continue;
    matches.forEach(m => {
      found.push({index: m.index, value: numberWordMap[word]})
    });
  }
  for (let digit of digits) {
    const matches = getCharacterMatches(digit, line);
    if (!matches?.length) continue;
    matches.forEach(m => {
      found.push({index: m.index, value: digit});
    }) 
  }
  const foundDigits = found.sort((a, b) => a.index - b.index).map(f => f.value);
  const first = foundDigits.shift();
  const last = foundDigits.pop();
  return Number(first + (last || first));
}

export function getSolution(file?: string): number {
  const lines = loadLinesFromFile(file || './01/01.input.txt');
  const result = lines
    .map(line => getLineValue(line))
    .reduce((prev: number, curr: number) => {
      return prev + curr;
    }, 0);
  return result;
}