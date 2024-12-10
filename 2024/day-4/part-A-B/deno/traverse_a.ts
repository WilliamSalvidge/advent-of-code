type coords = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW' | null;

export const traverseA = (input: string[][], startRow: number, startCol: number, position: number, direction: coords, rowLen: number, colLen: number, text: string = 'XMAS'): number => {
  if (position === 1) {
    if (startRow < 3) {
        if (startCol >= 3 && startCol <= colLen - 4) {
        const west = traverseA(input, startRow, startCol - 1, position + 1, 'W', rowLen, colLen);
        const southWest = traverseA(input, startRow + 1, startCol - 1, position + 1, 'SW', rowLen, colLen);
        const south = traverseA(input, startRow + 1, startCol, position + 1, 'S', rowLen, colLen);
        const southEast = traverseA(input, startRow + 1, startCol + 1, position + 1, 'SE', rowLen, colLen);
        const east = traverseA(input, startRow, startCol + 1, position + 1, 'E', rowLen, colLen);
        return west + southWest + south + southEast + east;
      }
      if (startCol < 3) {
        const south = traverseA(input, startRow + 1, startCol, position + 1, 'S', rowLen, colLen);
        const southEast = traverseA(input, startRow + 1, startCol + 1, position + 1, 'SE', rowLen, colLen);
        const east = traverseA(input, startRow, startCol + 1, position + 1, 'E', rowLen, colLen);
        return south + southEast + east;
      }
      if (startCol > colLen - 4) {
        const west = traverseA(input, startRow, startCol - 1, position + 1, 'W', rowLen, colLen);
        const southWest = traverseA(input, startRow + 1, startCol - 1, position + 1, 'SW', rowLen, colLen);
        const south = traverseA(input, startRow + 1, startCol, position + 1, 'S', rowLen, colLen);
        return west + southWest + south;
      }
    }
    if (startRow > rowLen - 4) {
        if (startCol >= 3 && startCol <= colLen - 4) {
        const west = traverseA(input, startRow, startCol - 1, position + 1, 'W', rowLen, colLen);
        const northWest = traverseA(input, startRow - 1, startCol - 1, position + 1, 'NW', rowLen, colLen);
        const north = traverseA(input, startRow - 1, startCol, position + 1, 'N', rowLen, colLen);
        const northEast = traverseA(input, startRow - 1, startCol + 1, position + 1, 'NE', rowLen, colLen);
        const east = traverseA(input, startRow, startCol + 1, position + 1, 'E', rowLen, colLen);
        return west + northWest + north + northEast + east;
      }
      if (startCol < 3) {
        const north = traverseA(input, startRow - 1, startCol, position + 1, 'N', rowLen, colLen);
        const northEast = traverseA(input, startRow - 1, startCol + 1, position + 1, 'NE', rowLen, colLen);
        const east = traverseA(input, startRow, startCol + 1, position + 1, 'E', rowLen, colLen);
        return north + northEast + east;
      }
      if (startCol > colLen - 4) {
        const west = traverseA(input, startRow, startCol - 1, position + 1, 'W', rowLen, colLen);
        const northWest = traverseA(input, startRow - 1, startCol - 1, position + 1, 'NW', rowLen, colLen);
        const north = traverseA(input, startRow - 1, startCol, position + 1, 'N', rowLen, colLen);
        return west + northWest + north;
      }
    }
    const west = traverseA(input, startRow, startCol - 1, position + 1, 'W', rowLen, colLen);
    const southWest = traverseA(input, startRow + 1, startCol - 1, position + 1, 'SW', rowLen, colLen);
    const south = traverseA(input, startRow + 1, startCol, position + 1, 'S', rowLen, colLen);
    const southEast = traverseA(input, startRow + 1, startCol + 1, position + 1, 'SE', rowLen, colLen);
    const east = traverseA(input, startRow, startCol + 1, position + 1, 'E', rowLen, colLen);
    const north = traverseA(input, startRow - 1, startCol, position + 1, 'N', rowLen, colLen);
    const northEast = traverseA(input, startRow - 1, startCol + 1, position + 1, 'NE', rowLen, colLen);
    const northWest = traverseA(input, startRow - 1, startCol - 1, position + 1, 'NW', rowLen, colLen);
    return west + southWest + south + southEast + east + north + northEast + northWest;
  }
  
   if (position < 4) {
      if (input[startRow][startCol] !== text[position - 1]) return 0;
      switch (direction) {
        case 'N':
          return traverseA(input, startRow - 1, startCol, position + 1, direction, rowLen, colLen);
        case 'NE':
           return traverseA(input, startRow - 1, startCol + 1, position + 1, direction, rowLen, colLen);
        case 'NW':
           return traverseA(input, startRow - 1, startCol - 1, position + 1, direction, rowLen, colLen);
        case 'E':
           return traverseA(input, startRow, startCol + 1, position + 1, direction, rowLen, colLen);
        case 'W':
           return traverseA(input, startRow, startCol - 1, position + 1, direction, rowLen, colLen);
        case 'S':
          return traverseA(input, startRow + 1, startCol, position + 1, direction, rowLen, colLen);
        case 'SE':
           return traverseA(input, startRow + 1, startCol + 1, position + 1, direction, rowLen, colLen);
        case 'SW':
           return traverseA(input, startRow + 1, startCol - 1, position + 1, direction, rowLen, colLen);
      }
    } 

    if (position === 4) {
      if (input[startRow][startCol] === 'S') {
        return 1;
      }
      return 0;
    }

  return 0;
} 
