import { loadLinesFromFile } from "../helpers";

type CardValueType = 'card' | 'player';
export type NumberData = {
  card: number[];
  player: number[];
}

export function getLineValues(line: string) {
  const [_head, tail] = line.split(':');
  const numberData: NumberData = {
    card: [],
    player: []
  };
  if (!tail) return numberData;
  
  const lineValues = tail.split(/\s+/);
  let valueType: CardValueType = 'card';
  while (lineValues.length) {
    const val = lineValues.shift();
    if (!val) continue;
    if (val === '|') {
      valueType = 'player';
      continue;
    }
    numberData[valueType].push(Number(val));
  }
  return numberData;
}

export function getCardValue(numberData: NumberData) {
  let value = 0;
  for (const num of numberData.player) {
    if (numberData.card.includes(num)) {
      value = value * 2 || 1;
    }
  }
  return value;
}

export function getSolutionA(file = './04/04.input.txt'): number {
  const cardValues = loadLinesFromFile(file).map(getLineValues).map(getCardValue);
  const total = cardValues.reduce((prev: number, curr: number) => {
    return prev + curr;
  }, 0);
  return total;
}