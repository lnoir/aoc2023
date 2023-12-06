import { loadLinesFromFile } from "../helpers";

export function getAllTotals(lines: string[], concat = false) {
  const totals = [];
  const [_timeHead, ...raceDurations] = lines[0].trim().split(/\s+/);
  const [_distanceHead, ...records] = lines[1].trim().split(/\s+/);
  if (concat) {
    const raceDuration = Number(raceDurations.join(''));
    const raceRecord = Number(records.join(''));
    const waysToWin = getWaysToWin(raceDuration, raceRecord);
    totals.push(waysToWin.total);
  }
  else {
    for (let i = 0; i < raceDurations.length; i++) {
      const raceDuration = Number(raceDurations[i]);
      const raceRecord = Number(records[i]);
      const waysToWin = getWaysToWin(raceDuration, raceRecord);
      totals.push(waysToWin.total);
    }
  }

  return totals;
}

export function calculateSpeed(holdDuration: number) {
  const speed = 0 + holdDuration; // millmeters per second
  return speed;
}

export function getDistanceTravelled(holdDuration: number, raceDuration: number) {
  const runTime = raceDuration - holdDuration;
  const speed = calculateSpeed(holdDuration);
  return runTime * speed;
}

export function getWaysToWin(raceDuration: number, record: number) {
  const winners = [];
  for (let i = 1; i < raceDuration; i++) {
    const distanceTravelled = getDistanceTravelled(i, raceDuration);
    if (distanceTravelled > record) winners.push(i);
  }
  winners.sort((a, b) => a - b);
  const total = winners.length;
  return ({total, min: winners.shift(), max: winners.pop()});
}

export function getSolutionA(file = './06/06.input.txt', concat = false): number {
  const lines = loadLinesFromFile(file);
  const totals = getAllTotals(lines, concat);
  const output = totals.reduce((prev, curr) => {
    return prev * curr;
  }, 1);
  return output;
}