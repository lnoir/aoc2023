import { beforeAll, describe, expect, test } from 'vitest';
import { loadLinesFromFile } from '../helpers';
import { HandType, getRankedHands, getScoredHand, getScoredHandB, getScoredHands, getSolutionA } from './07.a';

describe('Day 7', () => {
  let testFile = './07/07.input.test.txt';
  let testInput: string[];

  beforeAll(() => {
    testInput = loadLinesFromFile(testFile);
  });

  describe('Part A', () => {
    test('getScoredHand', () => {
      expect(getScoredHand('QQQJA')).toMatchObject({cards: 'QQQJA', type: '3OAK', value: 4});
    });

    test('getScoredHands', () => {
      const scored = getScoredHands(testInput);
      expect(scored[0]).toMatchObject({cards: '32T3K', type: '1P', value: 2, bid: 765});
      expect(scored[1]).toMatchObject({cards: 'T55J5', type: '3OAK', value: 4, bid: 684});
    });

    test('getCardsRanked', () => {
      const scored = getScoredHands(testInput);
      const ranked = getRankedHands(scored);
      expect(ranked[0].cards).toBe('32T3K');
      expect(ranked[1].cards).toBe('KTJJT');
      expect(ranked[2].cards).toBe('KK677');
      expect(ranked[3].cards).toBe('T55J5');
      expect(ranked[4].cards).toBe('QQQJA');
    });

    test('getSolution for test input', () => {
      expect(getSolutionA(testFile)).toBe(6440);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });
  
  describe('Part B', () => {
    test('getScoredHandB', () => {
      expect(getScoredHandB('QJJQ2').type).toBe<HandType>('4OAK');
    });

    test('getCardsRanked', () => {
      const scored = getScoredHands(testInput, true);
      const ranked = getRankedHands(scored);
      expect(ranked[0].cards).toBe('32T3K');
      expect(ranked[0].type).toBe<HandType>('1P');
      expect(ranked[1].cards).toBe('KK677');
      expect(ranked[1].type).toBe<HandType>('2P');
      expect(ranked[2].cards).toBe('T55J5');
      expect(ranked[2].type).toBe<HandType>('4OAK');
      expect(ranked[3].cards).toBe('QQQJA');
      expect(ranked[3].type).toBe<HandType>('4OAK');
      expect(ranked[4].cards).toBe('KTJJT');
      expect(ranked[4].type).toBe<HandType>('4OAK');
    });

    test('rank logic', () => {
      const scored = getScoredHands([
        'QQQQ2 10',
        'QJJQ2 10',
        'JKKK2 10',
        'JJJJJ 10',
      ], true);
      expect(scored[0].type).toBe<HandType>('4OAK');
      expect(scored[1].type).toBe<HandType>('4OAK');
      expect(scored[2].type).toBe<HandType>('4OAK');
      expect(scored[3].type).toBe<HandType>('5OAK');

      const ranked = getRankedHands(scored);
      expect(ranked[0].cards).toBe('JKKK2');
      expect(ranked[1].cards).toBe('QJJQ2');
      expect(ranked[2].cards).toBe('QQQQ2');
      expect(ranked[3].cards).toBe('JJJJJ');
    });

    test('getSolution for test input', () => {
      expect(getSolutionA(testFile, true)).toBe(5905);
    });

    test('getSolution', () => {
      console.log(getSolutionA('./07/07.input.txt', true));
    })
  });
});