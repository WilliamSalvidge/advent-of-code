import fs from 'node:fs/promises';

const prepare = async () => {
  const file = await fs.readFile('../input.txt', 'utf8');
  const [rules, update]: string[] = file.split('\n\n');
  const orderRules = rules.split('\n').map(input => input.split('|').map(unit => Number(unit)));
  const updates = update.split('\n').slice(0, -1).map(input => input.split(',').map(unit => Number(unit)));
  return [ orderRules, updates ]
}

const work = (rules: number[][], updates: number[][]) => {
  const success: number[][] = []
  const correctedFailures: number[][] = [];
  updates.forEach((update) => {
    const updateLength = update.length - 1;
    const correctedFailure = [...update];
    let taint: boolean = false;
    for (let i = 0; i <= updateLength; i++) {
      if (i === updateLength) continue;
      const current = correctedFailure[i]
      const next = correctedFailure[i + 1];
      const res_a = rules.find((each) => each[0] === current && each[1] === next);
      const res_b = rules.find((each) => each[0] === next && each[1] === current);
      if (res_a) {
        continue;
      }
      if (res_b) {
        correctedFailure[i] = next;
        correctedFailure[i + 1] = current;
        taint = true;
        i = -1;
        continue;
      }
    }
    if (!taint) {
      success.push(update);
    } else {
      correctedFailures.push(correctedFailure);
    }
  })
  return [success, correctedFailures];
}

const middle = (input: number[][]) => {
  return input.map(unit => {
    const num = Math.round(unit.length / 2) - 1;
    return unit[num]
  }).reduce((acc, curr) => acc + curr, 0);
}

const main = async () => {
  const [rules, updates] = await prepare();
  const [outSuccess, outFailure] = work(rules, updates);
  const mid = middle(outSuccess);
  const midFail = middle(outFailure);
  return [ mid, midFail ];
}

console.log(await main());
