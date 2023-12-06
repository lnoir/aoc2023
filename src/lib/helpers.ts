import fs from 'fs';
import path from 'path';

const tmpDir = './tmp';

export function loadFile(filepath: string) {
  return fs.readFileSync(path.resolve(__dirname, filepath), 'utf-8');
}

export function loadLinesFromFile(filepath: string): string[] {
  const lines = loadFile(filepath)?.split('\n');
  return lines.filter(l => !!l.trim());
}

export function createWriteStream(filename: string) {
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
  const filepath = tmpDir + '/' + filename;
  return fs.createWriteStream(filepath, {flags: 'a+'});
}