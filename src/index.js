import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import makeDiff from './makeDiff.js';
import formattedDiff from './formatters/index.js';

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const getType = (filepath) => extname(filepath).slice(1);

const readFile = (filepath) => readFileSync(getFixturePath(filepath, 'utf-8'));

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  const file1 = parse(readFile1, getType(filepath1));
  const file2 = parse(readFile2, getType(filepath2));

  const diff = makeDiff(file1, file2);

  const formattedResult = formattedDiff(diff, format);

  return formattedResult;
};

export default gendiff;
