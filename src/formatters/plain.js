import _ from 'lodash';

const getString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (currentTree, path) => {
    const result = currentTree
      .filter(({ status }) => status !== 'unchanged')
      .map((item) => {
        const pathToProperty = [...path, item.key].join('.');
        if (item.status === 'added') {
          return `Property '${pathToProperty}' was added with value: ${getString(item.value)}`;
        }
        if (item.status === 'removed') {
          return `Property '${pathToProperty}' was removed`;
        }
        if (item.status === 'changed') {
          return `Property '${pathToProperty}' was updated. From ${getString(item.firstValue)} to ${getString(item.secondValue)}`;
        }
        if (item.status === 'unchanged') {
          return '';
        }
        return (iter(item.children, [...path, item.key]));
      });
    return result.join('\n');
  };
  return iter(tree, []);
};

export default plain;
