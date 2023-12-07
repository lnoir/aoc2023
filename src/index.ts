/*
  This is only here for implementations that can't be easily run via test runner.

  ¯\_(ツ)_/¯
 */
import solutions from './lib/index';

const dayIndex = process.argv.indexOf('--days') || process.argv.indexOf('--day');
const partIndex = process.argv.indexOf('--parts') || process.argv.indexOf('--part');
const inputIndex = process.argv.indexOf('--file');
const days = dayIndex > -1
  ? process.argv[dayIndex + 1].split(/[,\s]+/g)
  : ['1'];
const parts = partIndex > -1
  ? process.argv[partIndex + 1].split(/[,\s+]+/)
  : ['a'];

async function run() {
  for (const day of days) {
    for (const part of parts) {
      const key = `day${day}${part.toLowerCase()}`;
      if (!(key in solutions)) {
        console.error(`Invalid day/part: ${day}/${part}`);
        continue;
      }
      const getSolution = solutions[key];
      const start = Date.now();
      console.log('Result: ', getSolution());
      const end = Date.now();
      console.log(`Completed day ${day}/${part}: ${(end - start)}ms`);
    }
  }
}

run();