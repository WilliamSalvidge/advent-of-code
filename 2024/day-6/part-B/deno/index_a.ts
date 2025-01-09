import fs from 'node:fs/promises';

const prepare = async () => {
  const file: string = await fs.readFile('../../input.txt', 'utf8');
  const field = file.split('\n').slice(0,-1).map(input => input.split(''));
  const start = field.map((row, index) => ([index, row.findIndex(item => item === '^')])).filter(unit => unit[1] !== -1)[0];

  const obstacles = field.map((row, rowIndex) => {
    return row.map((column, colIndex) => {
//      console.log(column)
      if (column === '#') {
//        console.log('yep')
        return [rowIndex, colIndex]
      }
      return [-1,-1]
    }).filter(unit => unit[0] !== -1 && unit[1] !== -1)
  }).flat()

  return { field, start, obstacles };
}

const walk = (direction: string, start: number[], obstacles: number[][], height: number, width: number, marked: number[][]): number[][] => {
  if (direction === 'N') {
    console.log('heading north');
    let newMarked = [ ...marked ]
    const blocks = obstacles.filter(obstacle => obstacle[1] === start[1] && obstacle[0] < start[0]); // only obstacles above
    console.log(blocks.length);
    if (!blocks.length) {
      for (let i = start[0]; i >= 0; i--) {
        newMarked.push([i, start[1]])
      }
      return newMarked
    };
    const sortBlock = blocks.sort((a, b) => b[0] - a[0]); // biggest obstacle
    const newStart = [ sortBlock[0][0] + 1, sortBlock[0][1] ];
    console.log(start, newStart);
    for (let i = start[0]; i > newStart[0]; i--) {
      newMarked.push([i, start[1]])
    }
    return walk('E', newStart, obstacles, height, width, newMarked)
  }
  if (direction === 'E') {
    console.log('heading east');
    let newMarked = [ ...marked ]
    const blocks = obstacles.filter(obstacle => obstacle[0] === start[0] && obstacle[1] > start[1]); // only obstacles to the right
    if (!blocks.length) {
      for (let i = start[1]; i <= (width - 1) ; i++) {
        newMarked.push([start[0], i])
      }
      return newMarked
    };
    const sortBlock = blocks.sort((a, b) => a[1] - b[1]); // smallest obstacle

    const newStart = [ sortBlock[0][0], sortBlock[0][1] - 1];
    console.log(start, newStart);
    for (let i = start[1]; i < newStart[1]; i++) {
      newMarked.push([start[0], i])
    }
    return walk('S', newStart, obstacles, height, width, newMarked)
  }
  if (direction === 'S') {
    console.log('heading south');
    let newMarked = [ ...marked ]
    const blocks = obstacles.filter(obstacle => obstacle[1] === start[1] && obstacle[0] > start[0]); // only obstacles below
    if (!blocks.length) {
      for (let i = start[0]; i <= (height - 1); i++) {
        newMarked.push([i, start[1]])
      }
      return newMarked
    };
    const sortBlock = blocks.sort((a, b) => a[0] - b[0]); // smallest obstacle
    const newStart = [ sortBlock[0][0] - 1, sortBlock[0][1] ];
    console.log(start, newStart);
    for (let i = start[0]; i < newStart[0]; i++) {
      newMarked.push([i, start[1]])
    }
    return walk('W', newStart, obstacles, height, width, newMarked)
  }
  if (direction === 'W') {
    console.log('heading west');
    let newMarked = [ ...marked ]
    const blocks = obstacles.filter(obstacle => obstacle[0] === start[0] && obstacle[1] < start[1]); // only obstacles to the left
    if (!blocks.length) {
      for (let i = start[1]; i >= 0; i--) {
        newMarked.push([start[0], i])
      }
      return newMarked
    };
    const sortBlock = blocks.sort((a, b) => b[1] - a[1]); // biggest obstacle
    const newStart = [ sortBlock[0][0], sortBlock[0][1] + 1];
    console.log(start, newStart);
    for (let i = start[1]; i > newStart[1]; i--) {
      newMarked.push([start[0], i])
    }
    return walk('N', newStart, obstacles, height, width, newMarked)
  }
  return [][0];
}


const main = async () => {
  const { field, start, obstacles } = await prepare();
  console.table(obstacles)
  const out = walk('N', start, obstacles, field.length, field[0].length, [])
  const res = out.reduce((acc, curr) => {
    const tmp = acc.find(unit => unit[0] === curr[0] && unit[1] === curr[1]);
    if (!tmp) {
      acc.push(curr);
      return acc;
    }
    return acc;
  }, [] as number[][])
  return res.length;
}

console.log(await main())
