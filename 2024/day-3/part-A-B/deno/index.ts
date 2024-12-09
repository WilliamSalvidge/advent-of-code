import fs from 'node:fs/promises';
import { multiplyChecker } from './multiplyChecker.ts';

const prepare = async (): Promise<string> => {
  const file: string = await fs.readFile('../input.txt', 'utf8');
  return file;
}

const mainA = async (input: string): Promise<number> => {
  const out = input;

  let tally = 0;
  for (let i = 0; i < out.length; i++) {
    if (out[i] === 'm') {
        const output = multiplyChecker(out, i, 0, null, null, null, null);
        tally = tally + output;
      }
    }

  return tally;
}

const mainB = async (input: string): Promise<number> => {
  const out = input;

  let tally = 0;
  let enabled = true;
  for (let i = 0; i < out.length; i++) {
    if (out[i] === 'm' && enabled) {
        const output = multiplyChecker(out, i, 0, null, null, null, null);
        tally = tally + output;
      }
      
      if (out[i] === 'd') {
        if (enabled && out.slice(i, i + 7) === "don't()") {
          enabled = false;
          continue;
        }
        if (!enabled && out.slice(i, i + 4) === "do()" && out.slice(i, i + 7) !== "don't()") {
          enabled = true;
        }
      }

    }
  return tally;
}

const main = async () => {
  const out = await prepare();
  const res_a = await mainA(out);
  const res_b = await mainB(out);
  return { A: res_a, B: res_b }
}

const { A, B } = await main()
console.log('A:', A, 'B:', B);
