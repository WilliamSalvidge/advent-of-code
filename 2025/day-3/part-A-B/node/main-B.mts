import fs from 'node:fs';
import { checkerB } from './helper-B.mts';

const file: ReadableStream<string> = fs.createReadStream(new URL('../input.txt', import.meta.url), 'utf8');

let score = 0;

for await (const chunk of file) {

  const lines = chunk.split('\n').map(line => {
    const toNum: number[] = []
    for (const char of line) {
      toNum.push(Number(char))
    }
    return toNum;
  }).filter(line => line.length);

  for (const line of lines) {
    const out = checkerB(line, 12);
    score = score + Number(out)
  }
}

console.log(score);


