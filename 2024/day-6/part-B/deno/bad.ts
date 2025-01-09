import fs from "node:fs/promises";

const prepare = async () => {
  const file: string = await fs.readFile("../../mock.txt", "utf8");
  const field = file.split("\n").slice(0, -1).map((input) => input.split(""));
  const start =
    field.map((row, index) => [index, row.findIndex((item) => item === "^")])
      .filter((unit) => unit[1] !== -1)[0];

  const obstacles = field.map((row, rowIndex) => {
    return row.map((column, colIndex) => {
      if (column === "#") {
        return [rowIndex, colIndex];
      }
      return [-1, -1];
    }).filter((unit) => unit[0] !== -1 && unit[1] !== -1);
  }).flat();

  return { field, start, obstacles };
};

type compass = "N" | "S" | "E" | "W";

class Mark {
  row: number;
  column: number;
  direction: compass;
  nextStart: number[];
  nextBlock: number[];
  nextObject: Mark | null = null;

  constructor(row: number, column: number, direction: compass) {
    this.row = row;
    this.column = column;
    this.direction = direction;
  }
}

type Meta = {
  data: string[][];
  dimension: number;
  obstacles: number[][];
};

const walkB = (start: Mark, meta: Meta): Mark => {
  if (start.direction === "N") {
    const obstacle = meta.obstacles.filter((block) => {
      return block[1] === start.column && block[0] < start.row;
    }).sort((a, b) => b[0] - a[0]);
    if (!obstacle.length) return start;
    start.nextBlock = [obstacle[0][0], obstacle[0][1]];
    const newStart = [obstacle[0][0] + 1, obstacle[0][1]];
    start.nextStart = newStart;
    const nextMark = new Mark(newStart[0], newStart[1], "E");
    start.nextObject = nextMark;
    return walkB(nextMark, meta);
  }
  if (start.direction === "S") {
    const obstacle = meta.obstacles.filter((block) => {
      return block[1] === start.column && block[0] > start.row;
    }).sort((a, b) => a[0] - b[0]);
    if (!obstacle.length) return start;
    start.nextBlock = [obstacle[0][0], obstacle[0][1]];
    const newStart = [obstacle[0][0] - 1, obstacle[0][1]];
    start.nextStart = newStart;
    const nextMark = new Mark(newStart[0], newStart[1], "W");
    start.nextObject = nextMark;
    return walkB(nextMark, meta);
  }
  if (start.direction === "E") {
    const obstacle = meta.obstacles.filter((block) => {
      return block[0] === start.row && block[1] > start.column;
    }).sort((a, b) => a[1] - b[1]);
    if (!obstacle.length) return start;
    start.nextBlock = [obstacle[0][0], obstacle[0][1]];
    const newStart = [obstacle[0][0], obstacle[0][1] - 1];
    start.nextStart = newStart;
    const nextMark = new Mark(newStart[0], newStart[1], "S");
    start.nextObject = nextMark;
    return walkB(nextMark, meta);
  }
  const obstacle = meta.obstacles.filter((block) => {
    return block[0] === start.row && block[1] > start.column;
  }).sort((a, b) => b[1] - a[1]);
  if (!obstacle.length) return start;
  start.nextBlock = [obstacle[0][0], obstacle[0][1]];
  const newStart = [obstacle[0][0], obstacle[0][1] + 1];
  start.nextStart = newStart;
  const nextMark = new Mark(newStart[0], newStart[1], "N");
  start.nextObject = nextMark;
  return walkB(nextMark, meta);
};

const main = async () => {
  const { field, start, obstacles } = await prepare();
  const meta = { data: field, dimension: field.length, obstacles };
  const markStart = new Mark(start[0], start[1], "N");
  const out = walkB(markStart, meta);
  return markStart;
};

await fs.writeFile('../bad-out.json', JSON.stringify(await main()), 'utf8');
