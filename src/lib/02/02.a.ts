import { loadLinesFromFile } from "../helpers";

type GameRound = {
  red: number,
  blue: number,
  green: number,
}

type GameRecord = {
  id: number,
  rounds: GameRound[]
}

type ColourConfig = {
  max: number
}

type GameConfig = Record<string, ColourConfig>

const defaultConfig: GameConfig = {
  red: { max: 12 },
  green: { max: 13 },
  blue: { max: 14 }
};

export function parseLine(line: string): GameRecord {
  const [head, tail] = line.split(':');
  const id = Number(head.match(/\d+/)?.[0]);
  const rounds: any = tail?.trim().split(';').map(round => {
    const counts = round.trim().split(',').reduce((prev: GameRound, colourCount: string) => {
      const [count, colour] = colourCount.trim().split(/\s+/);
      return {...prev, [colour]: Number(count)}
    }, {red: 0, green: 0, blue: 0});
    return counts;
  })
  return {id, rounds}
}

export function filterOutImpossibleGames(games: GameRecord[], config: GameConfig) {
  const filtered = games.filter(game => {
    for (const round of game.rounds) {
      if (round.red > config.red.max || round.green > config.green.max || round.blue > config.blue.max) return false;
    }
    return true;
  });
  return filtered;
}

export function getSolution(file?: string): number {
  const games = loadLinesFromFile(file || './02/02.input.txt').map(line => parseLine(line));
  const possible = filterOutImpossibleGames(games, defaultConfig);
  // Sum of IDs of possible games
  const sum = possible.reduce((total, game) => {
    return total + game.id
  }, 0);
  return sum;
}