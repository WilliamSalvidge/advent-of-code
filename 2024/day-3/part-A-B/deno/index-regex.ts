import fs from 'node:fs/promises';

const prepare = async (): Promise<string> => {
  const file: string = await fs.readFile('../input.txt', 'utf8');
  return file;
}

const h = async () => {
  const out = await prepare();

  const t = /mul\(\d{1,3},\d{1,3}\)/g

  const f = out.match(t);
  
  let res = 0;
  f?.forEach(match => {
    const tmp = match.slice(4,-1).split(',');
    res = res + (Number(tmp[0]) * Number(tmp[1]))
  })

  return res;
}

const j = async () => {
  const out = await prepare();

  const t = /mul\(\d{1,3},\d{1,3}\)/g

  const f = out.match(t);
  
  let res = 0;
  f?.forEach(match => {
    const tmp = match.slice(4,-1).split(',');
    res = res + (Number(tmp[0]) * Number(tmp[1]))
  })

  return res;

}

console.log(await h());
