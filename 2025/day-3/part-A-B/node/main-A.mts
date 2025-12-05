import fs from 'node:fs';
import { checkerA } from './helper-A.mts';

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
    score = score + checkerA(line); 
  }
}

console.log(score);


