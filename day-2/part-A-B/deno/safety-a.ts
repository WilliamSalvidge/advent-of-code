export const safety_a = (input: number[], index: number, increasing: boolean | null): boolean => {
  if (index >= input.length) return true;
  
  if (increasing === null) {
    if (input[index] > input[index - 1] && (input[index] - input[index - 1]) <= 3) {
      return safety_a(input, index + 1, true)
    } else if (input[index] < input[index - 1] && (input[index - 1] - input[index]) <= 3) {
      return safety_a(input, index + 1, false)
    } else {
      return false;
    }
  }

  if (increasing) {
    if (input[index] > input[index - 1] && (input[index] - input[index - 1]) <= 3) {
      return safety_a(input, index + 1, true)
    } else {
      return false;
    }
  }

  if (input[index] < input[index - 1] && (input[index - 1] - input[index]) <= 3) {
    return safety_a(input, index + 1, false)
  } else {
    return false;
  }
}
