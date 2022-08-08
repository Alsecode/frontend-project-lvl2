import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

import buildTree from '../src/index';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFixturePath = (filename) => resolve(dirName, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gediff flat json test 1', () => {
  const expected = readFile('expect1.txt');
  const result = buildTree(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('gediff flat json test 2', () => {
  const expected = readFile('expect2.txt');
  const result = buildTree(getFixturePath('file1.json'), getFixturePath('file1.json'));
  expect(result).toEqual(expected);
});

test('gediff flat json test 3', () => {
  const expected = readFile('expect3.txt');
  const result = buildTree(getFixturePath('emptyFile.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('gediff flat json test 4', () => {
  const expected = readFile('expect4.txt');
  const result = buildTree(getFixturePath('file2.json'), getFixturePath('file1.json'));
  expect(result).toEqual(expected);
});

test('gediff flat yaml test 1', () => {
  const expected = readFile('expect1.txt');
  const result = buildTree(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  expect(result).toEqual(expected);
});

test('gediff flat yaml test 2', () => {
  const expected = readFile('expect2.txt');
  const result = buildTree(getFixturePath('file1.yml'), getFixturePath('file1.yml'));
  expect(result).toEqual(expected);
});

test('gediff flat yaml test 3', () => {
  const expected = readFile('expect3.txt');
  const result = buildTree(getFixturePath('emptyFile.yaml'), getFixturePath('file2.yaml'));
  expect(result).toEqual(expected);
});

test('gediff flat yaml test 4', () => {
  const expected = readFile('expect4.txt');
  const result = buildTree(getFixturePath('file2.yaml'), getFixturePath('file1.yml'));
  expect(result).toEqual(expected);
});
