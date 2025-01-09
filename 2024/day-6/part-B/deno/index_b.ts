import fs from "node:fs/promises";
import { writeFileSync } from 'node:fs'

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

const walkB = (
  direction: string,
  start: number[],
  naturalObstacles: number[][],
  stops: number,
  side: number,
  height: number,
  width: number,
  internal: boolean,
  internalStart: number[][],
  fields: string[][],
  ticker: number,
) => {
  if (direction === "N") {
    console.log(Array(side - 1).fill("  ").join("") + "heading north");
    let unnaturalBlocks = stops;
    const blocks = naturalObstacles.filter((obstacle) =>
      obstacle[1] === start[1] && obstacle[0] < start[0]
    ); // only obstacles above
    if (!blocks.length) {
      console.log(Array(side - 1).fill("  ").join("") + "no blocks");
      if (side === 1) {
        console.log(Array(side - 1).fill("  ").join("") + "side 1");
        for (let i = start[0]; i > 0; i--) {
          const tmp = JSON.parse(JSON.stringify(fields));
          const tmpFields = tmp.map((row, index) => {
            if (index <= start[0] && index >= i) {
              row[start[1]] = '|'
            };
            return row;
          })
          const output = walkB(
            "E",
            [i, start[1]],
            [...naturalObstacles, [i - 1, start[1]]],
            stops,
            side + 1,
            height,
            width,
            true,
            [...internalStart, start],
            tmpFields,
            ticker
          );
          unnaturalBlocks = unnaturalBlocks + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      const finalMap = fields.map((row, index) => {
            if (index <= start[0] && index >= 0) {
              row[start[1]] = '|'
            };
            return row;
          })
      writeFileSync(`../output-mock/step-${ticker}-${internalStart[0][0]}-${internalStart[0][1]}`, JSON.stringify(finalMap), 'utf8');
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => b[0] - a[0])[0]; // biggest obstacle
    const newStart = [sortBlock[0] + 1, sortBlock[1]];
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      for (let i = start[0]; i > newStart[0]; i--) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `artificial block at ${[i - 1, start[1]]}`,
        );
        const tmp = JSON.parse(JSON.stringify(fields));
        const tmpFields = tmp.map((row, index) => {
            if (index <= start[0] && index >= i) {
              row[start[1]] = '|'
            };
            return row;
        })
        const output = walkB(
          "E",
          [i, start[1]],
          [...naturalObstacles, [i - 1, start[1]]],
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          tmpFields,
          ticker
        );
        console.log(Array(side - 1).fill("  ").join("") + `output: ${output}`);
        unnaturalBlocks = unnaturalBlocks + output;
        console.log(
          Array(side - 1).fill("  ").join("") +
            `unnaturalBlocks: ${unnaturalBlocks}`,
        );
      }
    }
    if (internal) {
      console.log(
        Array(side - 1).fill("  ").join("") +
          `current pos ${start} origin pos ${internalStart} new start pos ${newStart}`,
      );
      if (
        internalStart.filter((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        ).length > 2
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
        writeFileSync(`../output-mock/step-${ticker}-${internalStart[0][0]}-${internalStart[0][1]}`, JSON.stringify(fields), 'utf8');
        return 1;
      } else {
        console.log(
          Array(side - 1).fill("  ").join("") + `keep walking - side ${side}`,
        );
        return walkB(
          "E",
          newStart,
          naturalObstacles,
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          fields,
          ticker
        );
      }
    }
    console.log(
      Array(side - 1).fill("  ").join("") +
        "about start a new side heading east from",
      newStart,
      "current total = ",
      unnaturalBlocks,
    );
    return walkB(
      "E",
      newStart,
      naturalObstacles,
      unnaturalBlocks,
      1,
      height,
      width,
      false,
      [],
      fields,
      ticker + 1
    );
  }

  if (direction === "S") {
    console.log(Array(side - 1).fill("  ").join("") + `heading south`);
    let unnaturalBlocks = stops;
    const blocks = naturalObstacles.filter((obstacle) =>
      obstacle[1] === start[1] && obstacle[0] > start[0]
    ); // only obstacles above
    if (!blocks.length) {
      console.log(Array(side - 1).fill("  ").join("") + "no blocks");
      if (side === 1) {
        console.log(Array(side - 1).fill("  ").join("") + "side 1");
        for (let i = start[0]; i < (height - 1); i++) {
          const tmp = JSON.parse(JSON.stringify(fields));
          const tmpFields = tmp.map((row, index) => {
            if (index >= start[0] && index <= i) {
              row[start[1]] = '|'
            };
            return row;
          })
          const output = walkB(
            "W",
            [i, start[1]],
            [...naturalObstacles, [i + 1, start[1]]],
            stops,
            side + 1,
            height,
            width,
            true,
            [...internalStart, start],
            tmpFields,
            ticker
          );
          unnaturalBlocks = unnaturalBlocks + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      const finalMap = fields.map((row, index) => {
            if (index >= start[0] && index <= height) {
              row[start[1]] = '|'
            };
            return row;
          })
      writeFileSync(`../output-mock/step-${ticker}-${internalStart[0][0]}-${internalStart[0][1]}`, JSON.stringify(finalMap), 'utf8');
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => a[0] - b[0])[0]; // biggest obstacle
    const newStart = [sortBlock[0] - 1, sortBlock[1]];
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      for (let i = start[0]; i < newStart[0]; i++) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `artificial block at ${[i + 1, start[1]]}`,
        );
        const tmp = JSON.parse(JSON.stringify(fields));
        const tmpFields = tmp.map((row, index) => {
            if (index >= start[0] && index <= i) {
              row[start[1]] = '|'
            };
            return row;
        })
        const output = walkB(
          "W",
          [i, start[1]],
          [...naturalObstacles, [i + 1, start[1]]],
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          tmpFields,
          ticker
        );
        console.log(Array(side - 1).fill("  ").join("") + `output: ${output}`);
        unnaturalBlocks = unnaturalBlocks + output;
        console.log(
          Array(side - 1).fill("  ").join("") +
            `unnaturalBlocks: ${unnaturalBlocks}`,
        );
      }
    }
    if (internal) {
      console.log(
        Array(side - 1).fill("  ").join("") +
          `current pos ${start} origin pos ${internalStart} new start pos ${newStart}`,
      );
      if (
        internalStart.filter((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        ).length > 2
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
        writeFileSync(`../output-mock/step-${ticker}-${internalStart[0]}-${internalStart[1]}`, JSON.stringify(fields), 'utf8');
        return 1;
      } else {
        console.log(
          Array(side - 1).fill("  ").join("") + `keep walking - side ${side}`,
        );
        return walkB(
          "W",
          newStart,
          naturalObstacles,
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          fields,
          ticker
        );
      }
    }
    console.log(
      Array(side - 1).fill("  ").join("") +
        "about start a new side heading west from",
      newStart,
      "current total =",
      unnaturalBlocks,
    );
    return walkB(
      "W",
      newStart,
      naturalObstacles,
      unnaturalBlocks,
      1,
      height,
      width,
      false,
      [],
      fields,
      ticker + 1
    );
  }

  if (direction === "E") {
    console.log(Array(side - 1).fill("  ").join("") + `heading east`);
    let unnaturalBlocks = stops;
    const blocks = naturalObstacles.filter((obstacle) =>
      obstacle[0] === start[0] && obstacle[1] > start[1]
    ); // only obstacles above
    if (!blocks.length) {
      console.log(Array(side - 1).fill("  ").join("") + "no blocks");
      if (side === 1) {
        console.log(Array(side - 1).fill("  ").join("") + "side 1");
        for (let i = start[1]; i < (width - 1); i++) {
          const tmp = JSON.parse(JSON.stringify(fields));
          const tmpFields = tmp.map((row, index) => {
            if (index === start[0]) {
              const tmpRow = row.map((unit, index) => {
                if (index >= start[1] && index <= i) {
                  unit = '-'
                }
                return unit;
              })
              return tmpRow;
            };
            return row;
          })
          const output = walkB(
            "S",
            [start[0], i],
            [...naturalObstacles, [start[0], i + 1]],
            stops,
            side + 1,
            height,
            width,
            true,
            [...internalStart, start],
            tmpFields,
            ticker
          );
          unnaturalBlocks = stops + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      const finalMap = fields.map((row, index) => {
        if (index === start[0]) {
            const tmpRow = row.map((unit, index) => {
              if (index >= start[1] && index <= width) {
                unit = '-'
              }
              return unit;
            })
            return tmpRow;
          };
        return row;
      })
      writeFileSync(`../output-mock/step-${ticker}-${internalStart[0]}-${internalStart[1]}`, JSON.stringify(finalMap), 'utf8');
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => a[1] - b[1])[0]; // biggest obstacle
    const newStart = [sortBlock[0], sortBlock[1] - 1];
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      for (let i = start[1]; i < newStart[1]; i++) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `artificial block at ${[start[0], i + 1]}`,
        );
        const tmp = JSON.parse(JSON.stringify(fields));
        const tmpFields = tmp.map((row, index) => {
            if (index === start[0]) {
              const tmpRow = row.map((unit, index) => {
                if (index >= start[1] && index <= i) {
                  unit = '-'
                }
                return unit;
              })
              return tmpRow;
            };
            return row;
          })

        const output = walkB(
          "S",
          [start[0], i],
          [...naturalObstacles, [start[0], i + 1]],
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          tmpFields,
          ticker
        );
        console.log(Array(side - 1).fill("  ").join("") + `output = ${output}`);
        unnaturalBlocks = unnaturalBlocks + output;
        console.log(
          Array(side - 1).fill("  ").join("") +
            `unnaturalBlocks: ${unnaturalBlocks}`,
        );
      }
    }
    if (internal) {
      console.log(
        Array(side - 1).fill("  ").join("") +
          `current pos ${start} origin pos ${internalStart} new start pos ${newStart}`,
      );
      if (
        internalStart.filter((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        ).length > 2
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
        writeFileSync(`../output-mock/step-${ticker}-${internalStart[0]}-${internalStart[1]}`, JSON.stringify(fields), 'utf8');
        return 1;
      } else {
        console.log(
          Array(side - 1).fill("  ").join("") + `keep walking - side ${side}`,
        );
        return walkB(
          "S",
          newStart,
          naturalObstacles,
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          fields,
          ticker
        );
      }
    }
    console.log(
      Array(side - 1).fill("  ").join("") +
        "about start a new side heading south from",
      newStart,
      "current total =",
      unnaturalBlocks,
    );
    return walkB(
      "S",
      newStart,
      naturalObstacles,
      unnaturalBlocks,
      1,
      height,
      width,
      false,
      [],
      fields,
      ticker + 1
    );
  }

  if (direction === "W") {
    console.log(Array(side - 1).fill("  ").join("") + `heading west`);
    let unnaturalBlocks = stops;
    const blocks = naturalObstacles.filter((obstacle) =>
      obstacle[0] === start[0] && obstacle[1] < start[1]
    ); // only obstacles above
    if (!blocks.length) {
      console.log(Array(side - 1).fill("  ").join("") + "no blocks");
      if (side === 1) {
        console.log(Array(side - 1).fill("  ").join("") + "side 1");
        for (let i = start[1]; i > 0; i--) {
          const tmp = JSON.parse(JSON.stringify(fields));
          const tmpFields = tmp.map((row, index) => {
            if (index === start[0]) {
              const tmpRow = row.map((unit, index) => {
                if (index <= start[1] && index >= i) {
                  unit = '-'
                }
                return unit;
              })
              return tmpRow;
            };
            return row;
          })
          const output = walkB(
            "N",
            [start[0], i],
            [...naturalObstacles, [start[0], i - 1]],
            stops,
            side + 1,
            height,
            width,
            true,
            [...internalStart, start],
            tmpFields,
            ticker
          );
          unnaturalBlocks = unnaturalBlocks + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      const finalMap = fields.map((row, index) => {
        if (index === start[0]) {
            const tmpRow = row.map((unit, index) => {
              if (index <= start[1] && index >= 0) {
                unit = '-'
              }
              return unit;
            })
            return tmpRow;
          };
        return row;
      })
      writeFileSync(`../output-mock/step-${ticker}-${internalStart[0]}-${internalStart[1]}`, JSON.stringify(finalMap), 'utf8');
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => b[1] - a[1])[0]; // biggest obstacle
    const newStart = [sortBlock[0], sortBlock[1] + 1];
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      console.log(start, newStart);
      for (let i = start[1]; i > newStart[1]; i--) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `artificial block at ${[start[0], i - 1 ]}`,
        );
        const tmp = JSON.parse(JSON.stringify(fields));
        const tmpFields = tmp.map((row, index) => {
            if (index === start[0]) {
              const tmpRow = row.map((unit, index) => {
                if (index <= start[1] && index >= i) {
                  unit = '-'
                }
                return unit;
              })
              return tmpRow;
            };
            return row;
          })

        const output = walkB(
          "N",
          [start[0], i],
          [...naturalObstacles, [start[0], i - 1]],
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          tmpFields,
          ticker
        );
        console.log(Array(side - 1).fill("  ").join("") + `output: ${output}`);
        unnaturalBlocks = unnaturalBlocks + output;
        console.log(
          Array(side - 1).fill("  ").join("") +
            `unnaturalBlocks: ${unnaturalBlocks}`,
        );
      }
    }
    if (internal) {
      console.log(
        Array(side - 1).fill("  ").join("") +
          `current pos ${start} origin pos ${internalStart} new start pos ${newStart}`,
      );
      if (
        internalStart.filter((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        ).length > 2
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
        writeFileSync(`../output-mock/step-${ticker}-${internalStart[0]}-${internalStart[1]}`, JSON.stringify(fields), 'utf8');
        return 1;
      } else {
        console.log(
          Array(side - 1).fill("  ").join("") + `keep walking - side ${side}`,
        );
        return walkB(
          "N",
          newStart,
          naturalObstacles,
          stops,
          side + 1,
          height,
          width,
          true,
          [...internalStart, start],
          fields,
          ticker
        );
      }
    }
    console.log(
      Array(side - 1).fill("  ").join("") +
        "about start a new side heading north from",
      newStart,
      "current total =",
      unnaturalBlocks,
    );
    return walkB(
      "N",
      newStart,
      naturalObstacles,
      unnaturalBlocks,
      1,
      height,
      width,
      false,
      [],
      fields,
      ticker + 1
    );
  }
  return 0;
};

const main = async () => {
  const { field, start, obstacles } = await prepare();
  const out = walkB(
    "N",
    [start[0], start[1]],
    obstacles,
    0,
    1,
    field.length,
    field[0].length,
    false,
    [],
    field,
    1
  );
  return out;
};

console.log(await main());
