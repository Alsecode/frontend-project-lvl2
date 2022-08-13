import _ from 'lodash';

const makeDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.uniqWith(keys1.concat(keys2)));

  const result = keys.map((key) => {
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], status: 'unchanged' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], status: 'added' };
    }
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return { key, value: data1[key], status: 'removed' };
    }
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return { key, status: 'nested', children: makeDiff(data1[key], data2[key]) };
    }
    return {
      key, firstValue: data1[key], secondValue: data2[key], status: 'changed',
    };
  });
  return result;
};

export default makeDiff;
