export const safety_b = (input: number[], index: number, increasing: boolean | null, dampner: number = 0): boolean => {
  if (dampner > 1) return false;
  if (index >= input.length) return true;
  
  if (increasing === null) {
    if (input[index] > input[index - 1]) {
      if ((input[index] - input[index - 1]) <= 3) {
        return safety_b(input, index + 1, true, dampner);
      }
    } else if (input[index] < input[index - 1]) {
        if ((input[index - 1] - input[index]) <= 3) {
          return safety_b(input, index + 1, false, dampner);
        }
    } else {
        const tmp = [...input]
        tmp.splice(index, 1)
        return safety_b(tmp, index, null, dampner + 1)
    }
  }

  if (increasing) {
    if (input[index] > input[index - 1]) {
      if ((input[index] - input[index - 1]) <= 3) {
        return safety_b(input, index + 1, increasing, dampner)
      } else {
        const tmp = [...input]
        tmp.splice(index, 1)
        return safety_b(tmp, index, increasing, dampner + 1);
      }
    } else {
      const tmp = [...input]
      tmp.splice(index, 1)
      return safety_b(tmp, index, increasing, dampner + 1);
    }
  }

  if (input[index] < input[index - 1]) {
    if ((input[index - 1] - input[index]) <= 3) {
      return safety_b(input, index + 1, increasing, dampner);
    } else {
        const tmp = [...input]
        tmp.splice(index, 1)
        return safety_b(tmp, index, increasing, dampner + 1);
      }
  } else {
      const tmp = [...input]
      tmp.splice(index, 1)
      return safety_b(tmp, index, increasing, dampner + 1);
  }
}

