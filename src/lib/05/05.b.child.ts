import { CategoryMaps, RangeData, getLowestLocationNumber } from "./05.b";

let range: RangeData;
let maps: CategoryMaps;
const filename = (Math.random() * 10000).toFixed(0) + '.locations.txt';
const filepath = `./tmp/${filename}`;

function categoriesToMap(categories: any) {
  maps = new Map();
  Object.keys(categories).forEach(cat => {
    const map = new Map();
    map.set('src', categories[cat].src);
    map.set('dest', categories[cat].dest);
    maps.set(cat, map);
  });
}

process.on('message', (data: any) => {
  range = data.range;
  categoriesToMap(data.maps);
  const lowest = getLowestLocationNumber(range, maps);
  if (process?.send) process.send(lowest);
  process.exit();
});