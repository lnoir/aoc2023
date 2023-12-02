import { describe, expect, test } from 'vitest';
import { filterOutImpossibleGames, getSolution as getSolutionA, parseLine } from './02.a';
import { loadLinesFromFile } from '../helpers';

describe('Day 2', () => {
  test('parseLine', () => {
    const lines = loadLinesFromFile('./02/02.input.test.txt');
    const line = parseLine(lines[0]);
    expect(line).toHaveProperty('id');
  });

  test('filterOutImpossibleGames', () => {
    const lines = loadLinesFromFile('./02/02.input.test.txt').map(line => parseLine(line));
    const filtered = filterOutImpossibleGames(lines, {red: {max: 12}, green: {max: 13}, blue: {max: 14}});
    console.log(JSON.stringify(filtered, null, 2));
    expect(filtered).toHaveLength(3);
  });

  test('Part A: getSolution for test data', () => {
    expect(getSolutionA('./02/02.input.test.txt')).toBe(8);
  });
  
  test('getSolution', () => {
    console.log(getSolutionA());
  });
});