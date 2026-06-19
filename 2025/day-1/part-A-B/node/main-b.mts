import { createChecker } from "./helper.mts";

export let positionB = 50;
export let passcodeB = 0;

// 220
const leftCheckB = (value: number) => {
  const mod = value % 100; // 80
  const result = positionB - mod; // 50 - 20 = 30
  const floor = Math.floor(value / 100); // 280 / 100 = 2.8 = 2 
  if (result === 0) {
    positionB = result;
    passcodeB = passcodeB + 1 + floor; // 0 + 0 + 2
    return;
  }
  if (result > 0) {
    passcodeB = passcodeB + floor;
    positionB = result;
    return;
  }
  if (positionB === 0) {
    passcodeB = passcodeB + floor;
  } else {
    passcodeB = passcodeB + floor + 1;
  }
  positionB = 100 + result;
  return;
}

const rightCheckB = (value: number) => {
  const mod = value % 100;
  const result = positionB + mod;
  const floor = Math.floor(value / 100);
  if (result === 100) {
    positionB = 0;
    passcodeB = passcodeB + 1 + floor;
    return;
  }
  if (result < 100) {
    passcodeB = passcodeB + floor;
    positionB = result;
    return;
  }
  if (positionB === 0) {
    passcodeB = passcodeB + floor
  } else {
    passcodeB = passcodeB + floor + 1;
  }
  positionB = mod - (100 - positionB);
  return;
}

export const checkerB = createChecker(leftCheckB, rightCheckB);
