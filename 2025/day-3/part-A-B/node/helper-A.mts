export const checkerA = (line: number[]) => {
  let largestIndices: number[] = [];
  for (let i = 9; i >= 0; i--)
  {
    let lineLength = line.length - 1; // start at last position
    while (lineLength >= 0) {
      if (line[lineLength] === i)
      {
        largestIndices.push(lineLength);
      } 
      lineLength = lineLength - 1;
    }
    if (largestIndices.length) break;
  }

  const largestVal = line[largestIndices[0]];

  // 99, 88, 77
  if (largestIndices.length > 1) {
    return Number(String(largestVal) + String(largestVal));
  }

  let secondLargestIndices: number[] = [];
  // if [7, 2, 4, 9] we need to find the next largest number i.e. 7 for 79
  if (largestIndices[0] === line.length - 1)
  {
    // if we know know 9 is largest we should start at 8
    for (let i = largestVal - 1; i >= 0; i--)
    {
      let queryIndex = line.length - 2; // we know last value is the largest and there is only one 9 or 8 otherwise we have returned above!
      while (queryIndex >= 0) {
        if (line[queryIndex] === i)
        {
          secondLargestIndices.push(queryIndex);
          queryIndex = -1;
        } else {
          queryIndex = queryIndex - 1;
        }
      }
      if (secondLargestIndices.length) break;
    }
    let secondLargestVal = line[secondLargestIndices[0]]
    return Number(String(secondLargestVal) + String(largestVal));
  }

  // Reach here we know that largest val was not at the end and there is only 1 so we should look right for the next largest val
  // i.e. 8,4,5,6,7 then we have 8 and we need to see if that 7 is largest

  // we know that to the right of the largest val can't be another largest val.
  for (let i = largestVal - 1; i >= 0; i--)
  {
    let queryIndex = largestIndices[0]; // finding 9 or 8 or 7 in the last position is no good
    while (queryIndex <= line.length - 1) {
      if (line[queryIndex] === i)
      {
        // console.log(queryIndex)
        secondLargestIndices.push(queryIndex);
        queryIndex = line.length + 1;
      } else {
        queryIndex = queryIndex + 1;
      }
    }
    if (secondLargestIndices.length) break;
  }

  let secondLargestVal = line[secondLargestIndices[0]]
  return Number(String(largestVal) + String(secondLargestVal));
}
