import { describe, expect, test } from 'vitest';
import { extractValueByFirstLastDigit, getSolutionA } from '../01/01.a';
import { getLineValue, getSolutionB } from './01.b';

describe('Day 1', () => {
  describe('Part A', () => {
    test('extractFirstLastDigit', () => {
      const result = extractValueByFirstLastDigit('twofourfive485');
      expect(result).toBe(45);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });

  describe('Part B', () => {
    test('getSolution for test data', () => {
      expect(getSolutionB('./01/01.input.test.txt')).toBe(281);
    });

    test('getLineValue', () => {
      expect(getLineValue('one77ninetwoseventhreedqljsvj5oneightv')).toBe(18);
    });

    test('getSolution', () => {
      console.log(getSolutionB());
    });
  });
});