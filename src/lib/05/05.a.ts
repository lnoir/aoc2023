import { loadLinesFromFile } from "../helpers";

type RangeData = {
  start: number;
  end: number;
}

type CategoryMaps = Map<string, Map<string, RangeData[]>>

const categoryLinks: Record<string, string> = {
  seed: 'soil',
  soil: 'fertilizer',
  fertilizer: 'water',
  water: 'light',
  light: 'temperature',
  temperature: 'humidity',
  humidity: 'location'
};

// Leaving this initial attempt here for posterity.

/*
export function getValuesByRangeLength(start: number, length: number) {
  const values = [];
  for (let i = start; i < start + length; i++) {
    values.push(i);
  }
  return values;
}


function buildMapsOLD(lines: string[]) {
  const maps: CategoryMaps = new Map();
  let currentCat = '';

  for (const l of lines) {
    const line = l.trim();
    if (!line) continue;
    if (line.endsWith(':')) {
      const [srcCat, destCat] = line.split(/\s+/)[0].split('-to-');
      currentCat = srcCat;
      if (!maps.has(srcCat)) maps.set(srcCat, new Map());
      continue;
    }
    else {
      const [destStart, srcStart, rangeLength] = line.trim().split(/\s+/).map(s => Number(s));
      const srcValues = getValuesByRangeLength(srcStart, rangeLength);
      const destValues = getValuesByRangeLength(destStart, rangeLength);
      srcValues.forEach((n, i) => maps.get(currentCat)?.set(n, destValues[i]));
    }
  }
  return maps;
}

function getLocationValueOLD(srcCat: string, srcVal: number, maps: CategoryMaps) {
  const destVal = maps.get(srcCat)?.get(srcVal) || srcVal;
  const destCat = categoryLinks[srcCat];
  //console.log({srcCat, srcVal, destCat, destVal})
  if (destCat === 'location') {
    return destVal;
  }
  return getLocationValue(destCat, destVal, maps);
}
*/

export function buildMaps(lines: string[]) {
  const maps: CategoryMaps = new Map();
  let currentCat = '';

  for (const l of lines) {
    const line = l.trim();
    if (!line) continue;
    if (line.endsWith(':')) {
      const [srcCat, destCat] = line.split(/\s+/)[0].split('-to-');
      currentCat = srcCat;
      if (!maps.has(srcCat)) {
        const srcMap = new Map();
        srcMap.set('src', []);
        srcMap.set('dest', []);
        maps.set(srcCat, srcMap);
      }
      if (!maps.has(destCat)) {
        const destMap = new Map();
        destMap.set('src', []);
        destMap.set('dest', []);
        maps.set(destCat, destMap);
      }
      continue;
    }
    else {
      const [destStart, srcStart, rangeLength] = line.trim().split(/\s+/).map(s => Number(s));
      const srcRange =  {start: srcStart, end: srcStart + rangeLength, length: rangeLength};
      const destRange = {start: destStart, end: destStart + rangeLength, length: rangeLength};
      maps.get(currentCat)?.get('src')?.push(srcRange);
      maps.get(currentCat)?.get('dest')?.push(destRange);
    }
  }
  return maps;
}

export function getLocationValue(srcCat: string, srcVal: number, maps: CategoryMaps): number {
  const destCat = categoryLinks[srcCat];
  const destVal = getDestinationValue(srcCat, srcVal, maps);
  if (destCat === 'location') {
    return destVal;
  }
  return getLocationValue(destCat, destVal, maps);
}

export function getDestinationValue(srcCat: string, srcVal: number, maps: CategoryMaps): number {
  const srcRanges = maps.get(srcCat)?.get('src');
  const destRanges = maps.get(srcCat)?.get('dest');
  let delta;
  let deltaIndex;
  if (!srcRanges?.length || !destRanges?.length) throw new Error('This should never happen!');
  
  let destVal = srcVal;
  for (let i = 0; i < srcRanges.length; i++) {
    const srcRange = srcRanges[i];
    if (!srcRange) throw new Error('This should never happen!');
    if (srcVal >= srcRange.start && srcVal < srcRange.end) {
      deltaIndex = i;
      delta = srcVal - srcRange.start;
      break;
    }
  }
  if (delta !== undefined && deltaIndex !== undefined) {
    const destRange = destRanges[deltaIndex];
    destVal = destRange.start + delta;
  }
  return destVal;
}

export function getSeeds(line: string): number[] {
  return line?.split(':')[1].trim().split(/\s+/).map(s => Number(s));
}

export function getSolutionA(file = './05/05.input.txt'): number {
  const lines = loadLinesFromFile(file);
  const seeds = getSeeds(lines.shift() as string);
  const maps = buildMaps(lines);
  const locations = seeds
    .map(value => getLocationValue('seed', value, maps))
    .sort((a, b) => a - b);
  return locations[0];
}