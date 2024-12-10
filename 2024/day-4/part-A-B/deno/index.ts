import fs from 'node:fs/promises';
import { traverseA } from './traverse_a.ts';
import { traverseB } from './traverse_b.ts';

const prepare = async (): Promise<string[][]> => {
  const file: string = await fs.readFile('../input.txt', 'utf8');
  const lines = file
    .split('\n')
    .slice(0, -1)
    .map(x => x.split(''))
  return lines;
}

const main = async () => {
  const out = await prepare();
  let tallyA = 0;
  let tallyB= 0;
  for (let i = 0; i < out.length; i++) {
    for (let j = 0; j < out[0].length; j++) {
      if (out[i][j] === 'X') {
        const resA = traverseA(out, i, j, 1, null, out.length, out[0].length);
        tallyA = tallyA + resA;
      }
      if (out[i][j] === 'A') {
        const resB = traverseB(out, i, j, 1, out.length, out[0].length);
        tallyB = tallyB + resB;
      }
    }
  }
  return { A: tallyA, B: tallyB };
}

const { A, B } = await main();

console.log('A:', A);
console.log('B:', B);
