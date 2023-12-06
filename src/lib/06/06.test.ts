import { beforeAll, describe, expect, test } from 'vitest';
import { loadLinesFromFile } from '../helpers';
import { getDistanceTravelled, getSolutionA, getWaysToWin } from './06.a';

describe('Day 6', () => {
  let testFile = './06/06.input.test.txt';
  let testInput: string[];

  beforeAll(() => {
    testInput = loadLinesFromFile(testFile);
    console.log(testInput)
  });

  describe('Part A', () => {
    test('getDistanceTravelled', () => {
      expect(getDistanceTravelled(0, 7)).toBe(0);
      expect(getDistanceTravelled(1, 7)).toBe(6);
      expect(getDistanceTravelled(2, 7)).toBe(10);
      expect(getDistanceTravelled(3, 7)).toBe(12);
      expect(getDistanceTravelled(4, 7)).toBe(12);
      expect(getDistanceTravelled(5, 7)).toBe(10);
      expect(getDistanceTravelled(6, 7)).toBe(6);
      expect(getDistanceTravelled(7, 7)).toBe(0);
    });

    test('getWaysToWin', () => {
      const ways = {
        '7-9': getWaysToWin(7, 9),
        '15-40': getWaysToWin(15, 40),
        '30-200': getWaysToWin(30, 200)
      };
      expect(ways['7-9'].min).toBe(2);
      expect(ways['7-9'].max).toBe(5);
      expect(ways['15-40'].min).toBe(4);
      expect(ways['15-40'].max).toBe(11);
      expect(ways['30-200'].min).toBe(11);
      expect(ways['30-200'].max).toBe(19);
      expect(ways['7-9'].total).toBe(4);
      expect(ways['15-40'].total).toBe(8);
      expect(ways['30-200'].total).toBe(9);
    });

    test('getSolution for test input', () => {
      expect(getSolutionA(testFile)).toBe(288);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });
});