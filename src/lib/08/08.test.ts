import { describe, expect, test } from 'vitest';
import { buildNodes, getSolutionA } from './08.a';
import testInput from './08.input.test'

describe('Day 8', () => {
  let testFile0 = './08/08.input.test.0.txt';
  let testFile1 = './08/08.input.test.1.txt';

  describe('Part A', () => {
    test('buildNodes', () => {
      const lines = [...testInput[2]];
      lines.shift();
      const nodes = buildNodes(lines);
      expect(nodes).toMatchObject({
        AAA: [ 'BBB', 'CCC' ],
        BBB: [ 'DDD', 'EEE' ],
        CCC: [ 'ZZZ', 'GGG' ],
        DDD: [ 'DDD', 'DDD' ],
        EEE: [ 'EEE', 'EEE' ],
        GGG: [ 'GGG', 'GGG' ],
        ZZZ: [ 'ZZZ', 'ZZZ' ]
      });
    });
    test('getSolution for test input', () => {
      expect(getSolutionA(testFile0)).toBe(2);
      expect(getSolutionA(testFile1)).toBe(6);
    });

    test('getSolution', () => {
      //console.log(getSolutionA());
    });
  });
  
  /*describe('Part B', () => {
    test('getSolution for test input', () => {
      //expect(getSolutionA(testFile)).toBe(2);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    })
  });*/
});