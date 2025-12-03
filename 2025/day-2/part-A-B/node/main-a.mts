import { values } from './setup.mts';

const rattle = (start: number, end: number, score: number) => {
  let tempScore = score
  for (let i = start; i <= end; i++) {
    const temp = String(i);
    const left = temp.slice(0, temp.length / 2);
    const right = temp.slice(temp.length / 2);
    if (left === right) {
      tempScore = tempScore + i;
    } 
  }
  return tempScore;
}

export const mainA = () => {
  let score = 0;

  for (const [start, end] of values) {
    const startLength = start.length;
    const endLength = end.length;
  
    // if both numbers are odd i.e. 100-105
    if (startLength % 2 !== 0 && endLength % 2 !== 0) continue;
  
    // i.e. 987-1024
    if (startLength % 2 !== 0) {
      const numEnd = Number(end)
      const adjustedStart = Number('1' + '0'.repeat(end.length - 1));
      const out = rattle(adjustedStart, numEnd, score);
      score = out;
      continue;
    }

    if (endLength % 2 !== 0) {
      // i.e. 9878-22560
      const numStart = Number(start)
      const adjustedEnd = Number('9'.repeat(start.length))
      const out = rattle(numStart, adjustedEnd, score);
      score = out;
      continue
    }
   
    // both even 1024-1567
    const out = rattle(Number(start), Number(end), score);
    score = out;
  }
  return score;
}

