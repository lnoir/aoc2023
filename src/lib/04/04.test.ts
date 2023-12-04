import { beforeAll, describe, expect, test } from 'vitest';
import { loadLinesFromFile } from '../helpers';
import { getSolutionA, getLineValues, getCardValue } from './04.a';
import { getSolutionB } from './04.b';

describe('Day 4', () => {
  let testFile = './04/04.input.test.txt';
  let testInput: string[];
  const testLineValues = {
    card: [ 41, 48, 83, 86, 17 ],
    player: [
      83, 86,  6, 31,
      17,  9, 48, 53
    ]
  };

  beforeAll(() => {
    testInput = loadLinesFromFile(testFile);
  });

  describe('Part A', () => {
    test('parseLine', () => {
      expect(getLineValues(testInput[0])).toMatchObject(testLineValues);
    });

    test('getCardValue', () => {
      expect(getCardValue(testLineValues)).toBe(8);
    });
    
    test('getSolution for test input', () => {
      expect(getSolutionA(testFile)).toBe(13);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });

  describe('Part B', () => {
    test('getSolution for test input', () => {
      expect(getSolutionB(testFile)).toBe(30);
    });

    test('getSolution', () => {
      console.log(getSolutionB());
    });
  });
});