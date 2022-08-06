import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import buildTree from './buildTree.js';

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const readFile = (filepath) => readFileSync(getFixturePath(filepath, 'utf-8'));

const gendiff = (filepath1, filepath2) => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);
  
  const file1 = JSON.parse(readFile1);
  const file2 = JSON.parse(readFile2);
  
  const tree = buildTree(file1, file2);
  
  return tree;
};

export default gendiff;