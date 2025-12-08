import fs from 'node:fs/promises';

const file: string = await fs.readFile(new URL('../input.txt', import.meta.url), 'utf8');

const data = file.trim().split('\n').map(line => line.split(''));

const rows = data.length;
const columns = data[0].length;

let score = 0;

for (let i = 0; i < rows; i++)
{
  for (let j = 0; j < columns; j++)
  {
    let tempRow = i - 1;
    let tempScore = 0;
    if (data[i][j] !== '@') continue;
    while (tempRow <= i + 1)
    {
      let tempCol = j - 1;
      while (tempCol <= j + 1)
      {
        if (!data[tempRow]) // if row is undefined skip also we can't do row[-1][-1] as we are doing undefine[-1] we'll get an error
        {
          // jump to next row!
          tempCol = j + 2;
          continue;
        }
        if (data[tempRow][tempCol] === "@" && !(tempRow === i && tempCol === j))
        {
          tempScore = tempScore + 1;
        }
        tempCol = tempCol + 1;
      }
      tempRow = tempRow + 1;
    }
    if (tempScore < 4) {
      score = score + 1;
    }
  }
}

console.log(score);
