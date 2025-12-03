export const helperB = (start: number, end: number, score: number) => {
  let tempScore = score;
  for (let i = start; i <= end; i++) {
    let numAsStr = String(i);
    let strLength = numAsStr.length;
    let divider = strLength - 1; // if string is 9 then start at 8;
    while (divider >= 1) {
      if (strLength % divider !== 0) {
        divider = divider - 1;
        continue;
      }
      let strCopy = numAsStr;
      const broken: string[] = [];
      do {
        broken.push(strCopy.substring(0, divider))
      } while ((strCopy = strCopy.substring(divider, strCopy.length)) !== '');

      const res = broken.reduce((acc, curr, currIndex, array) => {
        if (currIndex === 0) return false;
        if (currIndex === 1 && curr === array[currIndex - 1]) return true
        if (curr === array[currIndex - 1] && acc) return true;
        return false;
      }, false)

      if (res) {
        // console.log('increasing score', i)
        tempScore = tempScore + i;
        break;
      }
      
      divider = divider - 1;
    }
  }
  return tempScore;
}
