import { beforeAll, describe, expect, test } from 'vitest';
import { GameRecord, filterOutImpossibleGames, getSolutionA, parseLine } from './02.a';
import { loadLinesFromFile } from '../helpers';
import { getMinimumRequiredCubesForGame, getPowerOfCubes, getSolutionB } from './02.b';

describe('Day 2', () => {
  describe('Part A', () => {
    test('parseLine', () => {
      const lines = loadLinesFromFile('./02/02.input.test.txt');
      const line = parseLine(lines[0]);
      expect(line).toHaveProperty('id');
    });
  
    test('filterOutImpossibleGames', () => {
      const games = loadLinesFromFile('./02/02.input.test.txt').map(line => parseLine(line));
      const filtered = filterOutImpossibleGames(games, {red: {max: 12}, green: {max: 13}, blue: {max: 14}});
      console.log(JSON.stringify(filtered, null, 2));
      expect(filtered).toHaveLength(3);
    });
  
    test('getSolution for test data', () => {
      expect(getSolutionA('./02/02.input.test.txt')).toBe(8);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  })


  describe('Part B', () => {
    let games: GameRecord[];

    beforeAll(() => {
      games =loadLinesFromFile('./02/02.input.test.txt').map(line => parseLine(line));
    });

    test('getMinimumRequiredCubesForGame', () => {
      expect(getMinimumRequiredCubesForGame(games[0])).toMatchObject({red: 4, green: 2, blue: 6});
      expect(getMinimumRequiredCubesForGame(games[1])).toMatchObject({red: 1, green: 3, blue: 4});
      expect(getMinimumRequiredCubesForGame(games[2])).toMatchObject({red: 20, green: 13, blue: 6});
      expect(getMinimumRequiredCubesForGame(games[3])).toMatchObject({red: 14, green: 3, blue: 15});
      expect(getMinimumRequiredCubesForGame(games[4])).toMatchObject({red: 6, green: 3, blue: 2});
    });

    test('getPowerOfCubes', () => {
      expect(getPowerOfCubes((getMinimumRequiredCubesForGame(games[0])))).toBe(48);
      expect(getPowerOfCubes((getMinimumRequiredCubesForGame(games[1])))).toBe(12);
      expect(getPowerOfCubes((getMinimumRequiredCubesForGame(games[2])))).toBe(1560);
      expect(getPowerOfCubes((getMinimumRequiredCubesForGame(games[3])))).toBe(630);
      expect(getPowerOfCubes((getMinimumRequiredCubesForGame(games[4])))).toBe(36);
    });

    test('getSolution for test data', () => {
      expect(getSolutionB('./02/02.input.test.txt')).toBe(2286);
    });

    test('getSolution', () => {
      console.log(getSolutionB());
    });
  });
});