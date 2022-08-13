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
  const iter = (currentTree, path) => currentTree.reduce((acc, item) => {
    const pathToProperty = [...path, item.key].join('.');
    switch (item.status) {
      case 'added':
        acc.push(`Property '${pathToProperty}' was added with value: ${getString(item.value)}`);
        break;
      case 'removed':
        acc.push(`Property '${pathToProperty}' was removed`);
        break;
      case 'changed':
        acc.push(`Property '${pathToProperty}' was updated. From ${getString(item.firstValue)} to ${getString(item.secondValue)}`);
        break;
      case 'unchanged':
        break;
      case 'nested':
        return acc.concat((iter(item.children, [...path, item.key])));
      default:
    }
    return acc;
  }, []);
  const result = iter(tree, []);
  return result.join('\n');
};

export default plain;
