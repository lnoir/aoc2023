import { beforeAll, describe, expect, test } from 'vitest';
import { loadLinesFromFile } from '../helpers';
import { compareLinesAndReturnSymbolAdjacentNumbers, getPartNumbers, getSolutionA, getValuesFromLine } from './03.a';
import { NumberRegExp, SymbolRegExp } from './03.constants';

describe('Day 3', () => {
  let testInput: string[];

  beforeAll(() => {
    testInput = loadLinesFromFile('./03/03.input.test.txt');
  });

  describe('Part A', () => {
    test('getValuesFromLine', () => {
      const numbers = getValuesFromLine('467..114..', NumberRegExp);
      expect(numbers).toHaveLength(2);
      expect(numbers[0].value).toBe('467');
      expect(numbers[1].value).toBe('114');

      const symbols = getValuesFromLine('...$.*....', SymbolRegExp);
      expect(symbols).toHaveLength(2);
      expect(symbols[0].value).toBe('$');
      expect(symbols[1].value).toBe('*');
    });

    test('compareLinesAndReturnSymbolAdjacentNumbers', () => {
      const lineIndex2 = compareLinesAndReturnSymbolAdjacentNumbers(testInput[2], testInput[1], testInput[3]);
      expect(lineIndex2).toHaveLength(2);

      const lineIndex5 = compareLinesAndReturnSymbolAdjacentNumbers(testInput[5], testInput[4], testInput[6]);
      expect(lineIndex5).toHaveLength(0);
    });

    test('getPartNumbers', () => {
      let adjacent: any[] = [];
      testInput.map((line, i) => getPartNumbers(i, line, testInput)).forEach(r => adjacent = adjacent.concat(r));
      expect(adjacent).toHaveLength(8);
    })

    test('getSolution for test data', () => {
      expect(getSolutionA('./03/03.input.test.txt')).toBe(4361);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });
});