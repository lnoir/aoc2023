import { loadLinesFromFile } from "../helpers";

export type HandType =  '_' | 'HC' | '1P' | '2P' | '3OAK' | 'FH' | '4OAK' | '5OAK'
type ScoredHand = {
  cards: string;
  type: HandType;
  value: number;
  bid?: number;
}

let validCardValues = 'AKQJT98765432';
let rankedCardValues = validCardValues.split('').reverse();
const handTypes = ['_','HC','1P','2P','3OAK','FH','4OAK','5OAK'];
const handPatternMap: Record<string, HandType> = {
  '5': '5OAK',
  '14': '4OAK',
  '23': 'FH',
  '113': '3OAK',
  '122': '2P',
  '1112': '1P',
  '11111': 'HC',
};
const handSize = 5;

export function getScoredHand(cards: string): ScoredHand {
  const scored: ScoredHand = {
    cards,
    type: '_',
    value: 0
  };
  const valueCounts: Record<string, number> = {};
  for (const card of cards) {
    if (!valueCounts[card]) valueCounts[card] = 0;
    valueCounts[card]++;
  }
  const handPattern = Object.values(valueCounts).sort().join('');
  scored.type = handPatternMap[handPattern];
  scored.value = handTypes.indexOf(scored.type);
  return scored;
}

export function getBestValueCard(cards: string) {
  let bestValueCard = '';
  let bestValueIndex = 0;
  for (const card of cards) {
    const cardIndex = rankedCardValues.indexOf(card);
    if (!bestValueCard || cardIndex > bestValueIndex) {
      bestValueCard = card;
      bestValueIndex = cardIndex;
    }
  }
  return bestValueCard;
}

function getBestSwap(jCount: number, cards: string, filtered: string[]) {
  let bestValue = 0;
  let bestCard = '';
  filtered.forEach(c => {
    const scoredHands: any = [];
    let tmp = cards;
    for (let i = 0; i < jCount; i++) {
      tmp = tmp.replace('J', c);
      scoredHands.push(getScoredHand(tmp));
    }
    scoredHands.forEach((scored: any) => {
      if (scored.value > bestValue) {
        bestValue = scored.value;
        bestCard = c;
      }
    })
  });
  return bestCard;
}

export function getScoredHandB(cards: string): ScoredHand {
  const scored: ScoredHand = {
    cards,
    type: '_',
    value: 0
  };
  let valueCounts: Record<string, number> = {};
  for (const card of cards) {
    if (!valueCounts[card]) valueCounts[card] = 0;
    valueCounts[card]++;
  }

  let handPattern = Object.values(valueCounts).sort().join('');
  const uniqueCards = Object.keys(valueCounts);
  const nonWildCards = uniqueCards.filter(c => c !== 'J');
  if (uniqueCards.includes('J') && uniqueCards.length > 1) {
    const jCount = valueCounts['J'];
    delete valueCounts['J'];
    let cardToChange = getBestSwap(jCount, cards, nonWildCards);
    valueCounts[cardToChange] += jCount;
    handPattern = Object.values(valueCounts).sort().join('');
  }

  scored.type = handPatternMap[handPattern];
  scored.value = handTypes.indexOf(scored.type);
  return scored;
}

export function getScoredHands(lines: string[], bMode = false): ScoredHand[] {
  const scored = lines.map(line => {
    const [cards, bid] = line.split(/\s+/g);
    const scoredHand = bMode ? getScoredHandB(cards) : getScoredHand(cards);
    scoredHand.bid = Number(bid);
    return scoredHand;
  });
  return scored;
}

export function getRankedHands(hands: ScoredHand[]) {
  // Two-stage: first a sort on hand values
  const ranked = [...hands];
  ranked.sort((a, b) => {
    if (a.value > b.value) return 1;
    if (a.value < b.value) return -1;
    return 0;
  });

  // Now sort subsets with the same hand value
  const maxHandValue = handTypes.length - 1;
  for (let i = 1; i <= maxHandValue; i++) {
    const startIndex = ranked.findIndex(hand => hand.value === i); 
    const endIndex = ranked.findLastIndex(hand => hand.value === i);
    const items = ranked.slice(startIndex, endIndex + 1);
    if (items.length < 2) continue;

    items.sort((a, b) => {
      for (let c = 0; c < handSize; c++) {
        const aCardValue = rankedCardValues.indexOf(a.cards[c]);
        const bCardValue = rankedCardValues.indexOf(b.cards[c]);
        if (aCardValue > bCardValue) return 1;
        if (aCardValue < bCardValue) return -1;
        continue;
      }
      return 0;
    });
    ranked.splice(startIndex, items.length, ...items);
  }
  return ranked;
}

export function getSolutionA(file = './07/07.input.txt', bMode = false): number {
  if (bMode) {
    validCardValues = 'AKQT98765432J';
    rankedCardValues = validCardValues.split('').reverse();
  }
  const lines = loadLinesFromFile(file);
  const scored = getScoredHands(lines, bMode);
  const ranked = getRankedHands(scored);
  const total = ranked.reduce((curr, hand, i) => {
    const rank = i + 1;
    const newValue = curr + (rank * (hand.bid as number));
    return newValue;
  }, 0);
  return total;
}