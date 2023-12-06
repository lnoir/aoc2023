import { loadLinesFromFile } from "../helpers";
import child_process from 'child_process';
import { writeFileSync } from 'fs';

export type RangeData = {
  start: number;
  end: number;
}

export type CategoryMaps = Map<string, Map<string, RangeData[]>>

const categoryLinks: Record<string, string> = {
  seed: 'soil',
  soil: 'fertilizer',
  fertilizer: 'water',
  water: 'light',
  light: 'temperature',
  temperature: 'humidity',
  humidity: 'location'
};

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

export function getSeedRanges(line: string): RangeData[] {
  const values = line?.split(':')[1].trim().split(/\s+/).map(s => Number(s));
  const ranges: RangeData[] = [];
  for (let i = 0; i < values.length; i += 2) {
    ranges.push({start: values[i], end: values[i] + values[i + 1]});
  }
  return ranges;
}

function mapsToPojo(maps: CategoryMaps) {
  const pojo: any = Object.fromEntries(maps);
  Object.keys(pojo).forEach(cat => {
    pojo[cat].src = pojo[cat].get('src');
    pojo[cat].dest = pojo[cat].get('dest');
  });
  return pojo;
}

export async function processSeedsInParallel(ranges: RangeData[], maps: CategoryMaps) {
  const categories = mapsToPojo(maps);
  const promises = ranges.map(range => {
    return new Promise((resolve, reject) => {
      const child = child_process.fork('./src/lib/05/05.b.child.ts');
      child.on('spawn', () => {
        console.log('Started:', {range});
        child.send({range, maps: categories});
      });
      child.on('message', resolve);
      child.on('error', reject);
      child.on('exit', () => console.log('Finished:', {range}));
    });
  });
  return await Promise.all(promises) as number[];
}

export function getLowestLocationNumber(range: RangeData, maps: CategoryMaps, file?: any) {
  let i = range.start;
  let lowestLocation = undefined;
  while (i < range.end) {
    const location = getLocationValue('seed', i, maps);
    if (file) writeFileSync(file, location+'\n', {flag: 'a+'});
    if (lowestLocation === undefined || location < lowestLocation) {
      lowestLocation = location;
    }
    //process.stdout.write(`${i} of ${range.end} (lowest so far: ${lowestLocation})\r`);
    i++;
  }
  return lowestLocation as number;
}

export async function getSolutionB(file = './05/05.input.txt'): Promise<number> {
  const lines = loadLinesFromFile(file);
  const seedRanges = getSeedRanges(lines.shift() as string);
  const maps = buildMaps(lines);
  const locations = await processSeedsInParallel(seedRanges, maps);
  locations.sort((a, b) => a - b);
  console.log('@locations', locations);
  return locations[0];
}