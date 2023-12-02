import { describe, expect, test } from 'vitest';
import { extractValueByFirstLastDigit, getSolution as getSolutionA } from '../01/01.a';
import { getLineValue, getSolution as getSolutionB } from './01.b';

describe('Day 1', () => {
  test('extractFirstLastDigit', () => {
    const result = extractValueByFirstLastDigit('twofourfive485');
    expect(result).toBe(45);
  });

  test('part two', () => {
    expect(getSolutionB('./01/01.input.test.txt')).toBe(281);
  });

  test('getLineValue', () => {
    expect(getLineValue('one77ninetwoseventhreedqljsvj5oneightv')).toBe(18);
  });

  test('getSolution', () => {
    console.log(getSolutionA());
    console.log(getSolutionB());
  });
});