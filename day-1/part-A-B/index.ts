import fs from 'node:fs/promises';

const divideArrays = (original: Array<number>): { left: Array<number>, right: Array<number> } => {
  const divided = { left: [], right: [] };
  for (let i = 0; i < original.length; i++) {
    divided.left.push(original[i][0]);
    divided.right.push(original[i][1]);
  }
  return divided;
};

const sortArrays = (input: { left: Array<number>, right: Array<number>}): { left: Array<number>, right: Array<number> } => {
  const callback = (a, b) => a - b;
  const west = input.left.sort(callback);
  const east = input.right.sort(callback);
  return { left: west, right: east };
}

const workArrays = (original: Array<number>): { left: Array<number>, right: Array<number> } => {
  const divided = divideArrays(original);
  const sorted = sortArrays(divided);
  return sorted;
}

const calculate = (input: { left: Array<number>, right: Array<number> }): number => {
  let res = 0;
  for (let i = 0; i < input.left.length; i++) {
    if (input.left[i] > input.right[i]) {
      res = res + (input.left[i] - input.right[i])
    } else {
      res = res + (input.right[i] - input.left[i])
    }
  }
  return res;
}

const gather = async () => {
  const file = await fs.readFile('./input.txt', 'utf8');
  const lines = file.split('\n');
  const inputs = lines.map(line => line.split(/\s+/).map(item => Number(item))); 
  inputs.pop();
  return inputs;
}

const mainA = async () => {
  const inputs = await gather();
  const worked = workArrays(inputs);
  const res = calculate(worked);
  return res;
}

const mainB = async () => {
  const inputs = await gather();
  const divide = divideArrays(inputs);
  const res = divide.left.map(west => divide.right.filter(east => east === west).length * west)
    .reduce((acc, curr) => acc + curr , 0);
  return res;
}

const outA = await mainA();
const outB = await mainB();

console.log('A: ', outA);
console.log('B: ', outB);

