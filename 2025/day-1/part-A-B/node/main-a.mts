import { createChecker } from "./helper.mts";

export let positionA = 50;
export let passcodeA = 0;

const leftCheckA = (value: number) => {
  const mod = value % 100;
  const result = positionA - mod;
  if (result === 0) {
    positionA = 0;
    passcodeA = passcodeA + 1;
    return;
  }
  if (result > 0) {
    positionA = result;
    return;
  }
  positionA = 100 + result
  return;
}

const rightCheckA = (value: number) => {
  const mod = value % 100;
  const result = positionA + mod;
  if (result === 100) {
    positionA = 0;
    passcodeA = passcodeA + 1;
    return;
  }
  if (result < 100) {
    positionA = result;
    return;
  }
  positionA = mod - (100 - positionA)
  return;
}

export const checkerA = createChecker(leftCheckA, rightCheckA);
