import { beforeAll, describe, expect, test } from 'vitest';
import { loadLinesFromFile } from '../helpers';
import { buildMaps, getDestinationValue, getLocationValue, getSolutionA } from './05.a';
import { getSeedRanges, getSolutionB } from './05.b';

describe('Day 5', () => {
  let testFile = './05/05.input.test.txt';
  let testInput: string[];

  beforeAll(() => {
    testInput = loadLinesFromFile(testFile);
  });

  describe('Part A', () => {
    test('buildMaps', () => {
      const lines = [...testInput];
      lines.shift();
      const maps = buildMaps(lines);
      expect(maps.get('seed')?.get('src')).toMatchObject(
        [
          {
            "end": 100,
            "length": 2,
            "start": 98,
          },
          {
            'end': 98,
            'length': 48,
            'start': 50,
          }
        ]
      );
    });

    test('getDestinationValue', () => {
      const lines = [...testInput];
      lines.shift();
      const maps = buildMaps(lines);
      expect(getDestinationValue('seed', 79, maps)).toBe(81);
      expect(getDestinationValue('soil', 81, maps)).toBe(81);
      expect(getDestinationValue('fertilizer', 81, maps)).toBe(81);
      expect(getDestinationValue('water', 81, maps)).toBe(74);
      expect(getDestinationValue('light', 74, maps)).toBe(78);
      expect(getDestinationValue('temperature', 78, maps)).toBe(78);
      expect(getDestinationValue('humidity', 78, maps)).toBe(82);

      expect(getDestinationValue('seed', 14, maps)).toBe(14);
      expect(getDestinationValue('soil', 14, maps)).toBe(53);
      expect(getDestinationValue('fertilizer', 53, maps)).toBe(49);
      expect(getDestinationValue('water', 49, maps)).toBe(42);
      expect(getDestinationValue('light', 42, maps)).toBe(42);
      expect(getDestinationValue('temperature', 42, maps)).toBe(43);
      expect(getDestinationValue('humidity', 43, maps)).toBe(43);
    });

    test('getLocationValue', () => {
      const lines = [...testInput];
      lines.shift();
      const maps = buildMaps(lines);
      expect(getLocationValue('seed', 79, maps)).toBe(82);
      expect(getLocationValue('seed', 14, maps)).toBe(43);
      expect(getLocationValue('seed', 55, maps)).toBe(86);
      expect(getLocationValue('seed', 13, maps)).toBe(35);
    });

    test('getSolution for test input',  () => {
      expect(getSolutionA(testFile)).toBe(35);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });

  describe('Part B', () => {
    test('getSeeds', () => {
      expect(getSeedRanges('seeds: 79 14 55 13')).toHaveLength(2);
    });

    test('getDestinationValue', () => {
      const lines = [...testInput];
      lines.shift();
      const maps = buildMaps(lines);
      expect(getDestinationValue('seed', 82, maps)).toBe(84);
      expect(getDestinationValue('soil', 84, maps)).toBe(84);
      expect(getDestinationValue('fertilizer', 84, maps)).toBe(84);
      expect(getDestinationValue('water', 84, maps)).toBe(77);
      expect(getDestinationValue('light', 77, maps)).toBe(45);
      expect(getDestinationValue('temperature', 45, maps)).toBe(46);
      expect(getDestinationValue('humidity', 46, maps)).toBe(46);
    });

    test('getLocationValue', () => {
      const lines = [...testInput];
      lines.shift();
      const maps = buildMaps(lines);
      expect(getLocationValue('seed', 82, maps)).toBe(46);
    });

    test('getSolution for test input',  () => {
      //expect(getSolutionB(testFile)).toBe(46);
    });

    test('getSolution', () => {
      // This one needs to be run directly
      // console.log(getSolutionB());
    });
  });
});