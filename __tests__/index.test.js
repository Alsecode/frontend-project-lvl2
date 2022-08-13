import { expect, test } from '@jest/globals';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFixturePath = (filename) => resolve(dirName, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gediff flat json test 1', () => {
  const expected = readFile('expectedFlat1.txt');
  const result = gendiff(getFixturePath('flat1.json'), getFixturePath('flat2.json'));
  expect(result).toEqual(expected);
});

test('gediff flat json test 2', () => {
  const expected = readFile('expectedFlat2.txt');
  const result = gendiff(getFixturePath('flat2.json'), getFixturePath('flat1.json'));
  expect(result).toEqual(expected);
});

test('gediff flat json test with empty file', () => {
  const expected = readFile('expectedFlat3.txt');
  const result = gendiff(getFixturePath('emptyFile.json'), getFixturePath('flat2.json'));
  expect(result).toEqual(expected);
});

test('gediff flat json test with same files', () => {
  const expected = readFile('expectedFlat4.txt');
  const result = gendiff(getFixturePath('flat1.json'), getFixturePath('flat1.json'));
  expect(result).toEqual(expected);
});

test('gediff flat yaml test 1', () => {
  const expected = readFile('expectedFlat1.txt');
  const result = gendiff(getFixturePath('flat1.yml'), getFixturePath('flat2.yaml'));
  expect(result).toEqual(expected);
});

test('gediff flat yaml test 2', () => {
  const expected = readFile('expectedFlat2.txt');
  const result = gendiff(getFixturePath('flat2.yaml'), getFixturePath('flat1.yml'));
  expect(result).toEqual(expected);
});

test('gediff nested json test 1 (format = stylish)', () => {
  const expected = readFile('expectedNested1.txt');
  const result = gendiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'));
  expect(result).toEqual(expected);
});

test('gediff nested yaml test 1 (format = stylish)', () => {
  const expected = readFile('expectedNested1.txt');
  const result = gendiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yaml'));
  expect(result).toEqual(expected);
});

test('gediff nested json test 2 (format = plain)', () => {
  const expected = readFile('expectedNestedPlain.txt');
  const result = gendiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'plain');
  expect(result).toEqual(expected);
});

test('gediff nested yaml test 2 (format = plain)', () => {
  const expected = readFile('expectedNestedPlain.txt');
  const result = gendiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yaml'), 'plain');
  expect(result).toEqual(expected);
});

test('gediff nested json test 3 (format = json)', () => {
  const expected = readFile('expectedNestedJson.txt');
  const result = gendiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'json');
  expect(result).toEqual(expected);
});

test('gediff nested yaml test 3 (format = json)', () => {
  const expected = readFile('expectedNestedJson.txt');
  const result = gendiff(getFixturePath('nested1.yml'), getFixturePath('nested2.yaml'), 'json');
  expect(result).toEqual(expected);
});
