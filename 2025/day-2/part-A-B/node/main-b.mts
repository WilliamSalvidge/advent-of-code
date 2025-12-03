import { values } from './setup.mts';
import { helperB } from './helper-b.mts';

export const mainB = () => {
  let score = 0;
  for (const [start, end] of values) {
    const out = helperB(Number(start), Number(end), score);
    score = out;
  }
  return score;
}
