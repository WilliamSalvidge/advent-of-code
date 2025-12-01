export const createChecker = (
  funcL: (val: number) => void,
  funcR: (val :number) => void,
): (dir: 'L' | 'R', value: number) => void => (direction: 'L' | 'R', value: number) => {
    if (direction === 'L') return funcL(value);
    if (direction === 'R') return funcR(value);
    throw Error('direction neither left or right')
  };
