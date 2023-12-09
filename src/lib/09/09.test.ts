import { describe, expect, test } from 'vitest';
import { createMultidimensionalArray, getSolutionA, populateDifferences } from './09.a';
import { loadLinesFromFile } from '../helpers';

describe('Day 8', () => {
  let testFile = './09/09.input.test.txt';

  const multidimensionalArray = [
    [
      [0,3,6,9,12,15], // 18
      [
        [3,3,3,3,3], // 3
        [0,0,0,0] // 0
      ]
    ],
    [
      [1,3,6,10,15,21],
      [
        [2,3,4,5,6],
        [1,1,1,1],
        [0,0,0]
      ]
    ],
    [
      [10,13,16,21,30,45], // 68
      [
        [3,3,5,9,15], // 23
        [0,2,4,6], // 8
        [2,2,2], // 2
        [0,0] // 0
      ]
    ]
  ];

  describe('Part A', () => {
    test('populateDifferences', () => {
      const arrays = createMultidimensionalArray(loadLinesFromFile(testFile));
      arrays.forEach(arr => populateDifferences(arr));
      expect(arrays).toMatchObject(multidimensionalArray);
    });

    test('getSolution for test input', () => {
      expect(getSolutionA(testFile)).toBe(114);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });
});