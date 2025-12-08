export const checkerB = (line: number[], len: number = 12) => {
 
  let resy: number[] = []
  let leny = len;
  let starty = 9;
  let liney = line

  while (leny > 0) {
    const { emerging, shrink, remain, next} = work(starty, liney, leny);
    resy = [...resy, ...emerging];
    starty = next;
    leny = remain;
    liney = shrink;
  }

  let numToStr= ''
  for (const val of resy) {
    numToStr = numToStr + String(val);
  }

  return numToStr;
}


const work = (num: number, line: number[], remain: number) => {
  const res: number[] = []
  let final: number = -1;
  let rem = remain;
  let next = 9; // assume we find something so need to go back to 9
  for (let j = 0; j < line.length; j++)
  {
    if (line[j] === num && (line.length - j) >= rem)
    {
        res.push(num);
        final = j;
        rem = rem - 1;
        break;
    }
  }

  if (res.length === 0) {
    next = num - 1;
  }

  return { emerging: res, shrink: line.slice(final + 1), remain: rem, next }
}

