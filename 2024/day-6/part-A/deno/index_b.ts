import fs from "node:fs/promises";

const prepare = async () => {
  const file: string = await fs.readFile("../input.txt", "utf8");
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
        for (let i = start[0] - 1; i >= 0; i--) {
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
          );
          unnaturalBlocks = unnaturalBlocks + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => b[0] - a[0])[0]; // biggest obstacle
    const newStart = [sortBlock[0] + 1, sortBlock[1]];
    if (newStart[0] === start[0] && newStart[1] === start[1]) return 0;
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      for (let i = start[0] - 1; i > newStart[0]; i--) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `artificial block at ${[i - 1, start[1]]}`,
        );
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
        internalStart.find((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        )
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
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
        for (let i = start[0] + 1; i <= height - 1; i++) {
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
          );
          unnaturalBlocks = unnaturalBlocks + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => a[0] - b[0])[0]; // biggest obstacle
    const newStart = [sortBlock[0] - 1, sortBlock[1]];
    if (newStart[0] === start[0] && newStart[1] === start[1]) return 0;
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      for (let i = start[0] + 1; i < newStart[0]; i++) {
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
        internalStart.find((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        )
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
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
        for (let i = start[1] + 1; i <= width - 1; i++) {
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
          );
          unnaturalBlocks = stops + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => a[1] - b[1])[0]; // biggest obstacle
    const newStart = [sortBlock[0], sortBlock[1] - 1];
    if (newStart[0] === start[0] && newStart[1] === start[1]) return 0;
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      for (let i = start[1] + 1; i < newStart[1]; i++) {
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
        internalStart.find((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        )
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
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
        for (let i = start[1] - 1; i >= 0; i--) {
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
          );
          unnaturalBlocks = unnaturalBlocks + output;
        }
        return unnaturalBlocks;
      }
      console.log(Array(side - 1).fill("  ").join("") + `side ${side}`);
      return 0;
    }
    const sortBlock = blocks.sort((a, b) => b[1] - a[1])[0]; // biggest obstacle
    const newStart = [sortBlock[0], sortBlock[1] + 1];
    if (newStart[0] === start[0] && newStart[1] === start[1]) return 0;
    console.log(
      Array(side - 1).fill("  ").join("") +
        `starting position ${start} next starting position ${newStart}, block is at ${sortBlock}`,
    );
    if (side === 1) {
      console.log(start, newStart);
      for (let i = start[1] - 1; i > newStart[1]; i--) {
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
        internalStart.find((unit) =>
          unit[0] === start[0] && unit[1] === start[1]
        )
      ) {
        console.log(
          Array(side - 1).fill("  ").join("") +
            `we have returned to the start add 1 - side ${side}`,
        );
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
    );
  }
  return 0;
};

const main = async () => {
  const { field, start, obstacles } = await prepare();
  const out = walkB(
    "N",
    [start[0] + 1, start[1]],
    obstacles,
    0,
    1,
    field.length,
    field[0].length,
    false,
    [],
  );
  return out;
};

console.log(await main());
