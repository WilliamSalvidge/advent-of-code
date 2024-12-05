import fs from 'node:fs/promises';
import { safety_a } from './safety-a.ts';
import { safety_b } from './safety-b.ts';

const prepare = async (): Promise<number[][]> => {
  const file: string = await fs.readFile('../input.txt', 'utf8');
  const lines = file
    .split('\n')
    .slice(0, -1)
    .map(input => input.split(/\s+/).map(item => Number(item)));
  return lines;
}

const mainA = (lines: number[][], safety) => {
  const out = lines.map(input => safety(input, 1, null)).filter((input => input)).length;
  return out;
}

const mainB = (lines: number[][], safety) => {
  const out_one  = lines.map(input => safety(input, 1, null))
  const out_two = lines.map(input => safety(input.reverse(), 1, null));

  let final: boolean[] = [];
  for (let i = 0; i < out_one.length; i++) {
    if (!out_one[i] && !out_two[i]) final.push(false);
    else final.push(true);
  }
  return final.filter(input => input).length;

} 

const main = async () => {
  const lines = await prepare();
  const out_a = mainA(lines, safety_a);
  const out_b = mainB(lines, safety_b);
  return { a: out_a, b: out_b }
}

const { a, b } = await main();

console.log('A: ', a);
console.log('B: ', b);
