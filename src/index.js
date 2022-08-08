import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import parse from './parsers';
import buildTree from './buildTree';

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const getType = (filepath) => extname(filepath).slice(1);

const readFile = (filepath) => readFileSync(getFixturePath(filepath, 'utf-8'));

const gendiff = (filepath1, filepath2) => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  const file1 = parse(readFile1, getType(filepath1));
  const file2 = parse(readFile2, getType(filepath2));

  const tree = buildTree(file1, file2);

  return tree;
};

export default gendiff;
