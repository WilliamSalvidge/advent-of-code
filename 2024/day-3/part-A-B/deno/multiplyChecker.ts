const isNum = (input: string): boolean => {
  if (input === '0') return true;
  if (Number(input)) return true;
  return false
}

export const multiplyChecker = (line: string, index: number, innerIndex: number, left: number | null, right: number | null, leftLen: number | null, rightLen: number | null): number => {
  if (innerIndex === 0 && line.slice(index + 0, index + 4) === "mul(") {
    return multiplyChecker(line, index, 4, null, null, null, null)
  }
  if (innerIndex === 4) {
    if (isNum(line[index + innerIndex]) && isNum(line[index + innerIndex + 1]) && isNum(line[index + innerIndex + 2])) {
     return multiplyChecker(line, index, 7, Number(line[index + innerIndex] + line[index + innerIndex + 1] + line[index + innerIndex + 2]), null, 3, null) 
    }
    if (isNum(line[index + innerIndex]) && isNum(line[index + innerIndex + 1])) {
     return multiplyChecker(line, index, 6, Number(line[index + innerIndex] + line[index + innerIndex + 1]), null, 2, null) 
    }
    if (isNum(line[index + innerIndex])) {
     return multiplyChecker(line, index, 5, Number(line[index + innerIndex]), null, 1, null) 
    }
    return 0;
  }
  if (innerIndex === 5) {
    if (line[index + innerIndex] !== ',') return 0;
    if (isNum(line[index + innerIndex + 1]) && isNum(line[index + innerIndex + 2]) && isNum(line[index + innerIndex + 3])) {
     return multiplyChecker(line, index, 9, left, Number(line[index + innerIndex + 1] + line[index + innerIndex + 2] + line[index + innerIndex + 3]), leftLen, 3) 
    }
    if (isNum(line[index + innerIndex + 1]) && isNum(line[index + innerIndex + 2])) {
     return multiplyChecker(line, index, 8, left, Number(line[index + innerIndex + 1] + line[index + innerIndex + 2]), leftLen, 2) 
    }
    if (isNum(line[index + innerIndex + 1])) {
     return multiplyChecker(line, index, 7, left, Number(line[index + innerIndex + 1]), leftLen, 1) 
    }
    return 0;
  }

  if (innerIndex === 6) {
    if (line[index + innerIndex] !== ',') return 0
    if (isNum(line[index + innerIndex + 1]) && isNum(line[index + innerIndex + 2]) && isNum(line[index + innerIndex + 3])) {
      return multiplyChecker(line, index, 10, left, Number(line[index + innerIndex + 1] + line[index + innerIndex + 2] + line[index + innerIndex + 3]), leftLen, 3) 
    }
    if (isNum(line[index + innerIndex + 1]) && isNum(line[index + innerIndex + 2])) {
     return multiplyChecker(line, index, 9, left, Number(line[index + innerIndex + 1] + line[index + innerIndex + 2]), leftLen, 2) 
    }
    if (isNum(line[index + innerIndex + 1])) {
     return multiplyChecker(line, index, 8, left, Number(line[index + innerIndex + 1]), leftLen, 1) 
    }
    return 0;
  }

  if (innerIndex === 7) {
    if (leftLen === 1 && rightLen === 1 && left && right) {
      if (line[index + innerIndex] === ')') return left * right;
      return 0;
    }
    if (line[index + innerIndex] !== ',') return 0;
    if (isNum(line[index + innerIndex + 1]) && isNum(line[index + innerIndex + 2]) && isNum(line[index + innerIndex + 3])) {
     return multiplyChecker(line, index, 11, left, Number(line[index + innerIndex + 1] + line[index + innerIndex + 2] + line[index + innerIndex + 3]), leftLen, 3) 
    }
    if (isNum(line[index + innerIndex + 1]) && isNum(line[index + innerIndex + 2])) {
     return multiplyChecker(line, index, 10, left, Number(line[index + innerIndex + 1] + line[index + innerIndex + 2]), leftLen, 2) 
    }
    if (isNum(line[index + innerIndex + 1])) {
     return multiplyChecker(line, index, 9, left, Number(line[index + innerIndex + 1]), leftLen, 1) 
    }
    return 0;
  }

  if (innerIndex >= 8) {
      if (line[index + innerIndex] === ')' && left && right) return left * right;
  }

  return 0;
}

