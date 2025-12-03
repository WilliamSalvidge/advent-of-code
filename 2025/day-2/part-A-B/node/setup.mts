import fs from 'node:fs/promises';

const file: string = (await fs.readFile(new URL('../input.txt', import.meta.url), 'utf8')).trimEnd();

export const values = file.split(',').map(values => values.split('-'));

