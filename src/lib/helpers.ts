import fs from 'fs';
import path from 'path';

export function loadFile(filepath: string) {
  return fs.readFileSync(path.resolve(__dirname, filepath), 'utf-8');
}

export function loadLinesFromFile(filepath: string): string[] {
  const lines = loadFile(filepath)?.split('\n');
  return lines.filter(l => !!l.trim());
}