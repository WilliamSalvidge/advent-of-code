export const traverseB = (
  input: string[][],
  startRow: number,
  startCol: number,
  position: number,
  rowLen: number,
  colLen: number
): number => {
  if (position === 1 && startRow > 0 && startRow <= rowLen - 2 && startCol > 0 && startCol <= colLen - 2) {
    const southWest = traverseB(input, startRow + 1, startCol - 1, position + 1, rowLen, colLen);
    const southEast = traverseB(input, startRow + 1, startCol + 1, position + 1, rowLen, colLen);
    const northEast = traverseB(input, startRow - 1, startCol + 1, position + 1, rowLen, colLen);
    const northWest = traverseB(input, startRow - 1, startCol - 1, position + 1, rowLen, colLen);
    const senw = southEast + northWest; // if 1 is mas if 2 or 0 is not
    const swne = southWest + northEast;
    if (senw === 1 && swne === 1) return 1;
    return 0;
  } 

  if (position === 1) {
    return 0;
  }
  
  if (input[startRow][startCol] === 'M') return 0;
  if (input[startRow][startCol] === 'S') return 1;
  return -1;
} 


