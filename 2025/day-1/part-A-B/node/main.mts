import { createReadStream } from 'node:fs';
import { argv } from 'node:process';
import { checkerA, passcodeA } from './main-a.mts';
import { checkerB, passcodeB } from './main-b.mts';

const input = argv.slice(-1)[0];

const fileStream: ReadableStream<string> = createReadStream(new URL(`../${input}`, import.meta.url), 'utf8');

// Streams are async iterators
for await (const chunk of fileStream) {
  const lines = chunk
    .split("\n")
    .map(line => line.match(/(L|R)|\d+/g))
    .filter(line => !!line)
    .map(line => ({ direction: line[0] as 'L' | 'R', value: Number(line[1]) }))

  for (const { direction, value } of lines) {
    checkerA(direction, value)
    checkerB(direction, value);  
  } 
}

console.log('passcode part A:', passcodeA)
console.log('passcode part B:', passcodeB)


