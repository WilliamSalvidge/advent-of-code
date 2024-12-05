import fs from 'node:fs/promises';

const safety = (input: number[], index: number, increasing: boolean | null): boolean => {
  if (index >= input.length) return true;
  
  if (increasing === null) {
    if (input[index] > input[index - 1] && (input[index] - input[index - 1]) <= 3) {
      return safety(input, index + 1, true)
    } else if (input[index] < input[index - 1] && (input[index - 1] - input[index]) <= 3) {
      return safety(input, index + 1, false)
    } else {
      return false;
    }
  }

  if (increasing) {
    if (input[index] > input[index - 1] && (input[index] - input[index - 1]) <= 3) {
      return safety(input, index + 1, true)
    } else {
      return false;
    }
  }

  if (input[index] < input[index - 1] && (input[index - 1] - input[index]) <= 3) {
    return safety(input, index + 1, false)
  } else {
    return false;
  }
}

const main = async () => {
  const file: string = await fs.readFile('../input.txt', 'utf8');
  const lines = file
    .split('\n')
    .slice(0, -1)
    .map(input => input.split(/\s+/).map(item => Number(item)));
  
  const out = lines.map(input => safety(input, 1, null)).filter((input => input)).length;
  return out;
}

const res_a = await main();

console.log(res_a);
