import { loadLinesFromFile } from "../helpers";
import { ColourSet, GameRecord, parseLine } from "./02.a";

export function getMinimumRequiredCubesForGame(game: GameRecord): ColourSet {
  const min: any = {
    red: 0,
    green: 0,
    blue: 0
  };
  const colours = Object.keys(min);
  for (const round of game.rounds) {
    for (const colour of colours) {
      const r = round as any;
      if (r[colour] && r[colour] > min[colour]) {
        min[colour] = r[colour];
      }
    }
  }
  return min;
}

export function getPowerOfCubes(colours: ColourSet) {
  const power = Object.keys(colours).reduce((prev: number, curr: string) => {
    return prev * (colours as any)[curr];
  }, 1);
  return power;
}

export function getSolutionB(file?: string) {
  const games = loadLinesFromFile(file || './02/02.input.txt').map(line => parseLine(line));
  const sum = games
    .map(game => getMinimumRequiredCubesForGame(game))
    .map(minimums => getPowerOfCubes(minimums))
    .reduce((prev: number, curr: number) => {
      return prev + curr;
    }, 0);
  return sum;
}