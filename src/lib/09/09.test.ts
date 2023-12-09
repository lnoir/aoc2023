import { describe, expect, test } from 'vitest';
import { createMultidimensionalArray, getSolutionA, getSolutionB, populateDifferences, predictNextNumbers } from './09.a';
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

  function getPopulatedArrays() {
    const arrays = createMultidimensionalArray(loadLinesFromFile(testFile));
    arrays.forEach(arr => populateDifferences(arr));
    return arrays;
  }

  describe('Part A', () => {
    test('populateDifferences', () => {
      const arrays = getPopulatedArrays();
      expect(arrays).toMatchObject(multidimensionalArray);
    });

    test('getSolution for test input', () => {
      expect(getSolutionA(testFile)).toBe(114);
    });

    test('getSolution', () => {
      console.log(getSolutionA());
    });
  });
  
  describe('Part B', () => {
    test('predictNextNumber', () => {
      const arrays = getPopulatedArrays();
      arrays.slice(0, 1).forEach(arr => predictNextNumbers(arr, true));
      expect(arrays[0][0][0]).toBe(-3);
    });

    test('getSolution for test input', () => {
      expect(getSolutionB(testFile)).toBe(2);
    });

    test('getSolution', () => {
      console.log(getSolutionB());
    });
  });
});