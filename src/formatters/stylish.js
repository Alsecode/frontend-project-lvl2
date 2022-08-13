const getIdent = (spaces) => ('  '.repeat(spaces));

const getString = (value, depth) => {
  if (typeof value !== 'object' || value === undefined || value === null) {
    return value;
  }
  const result = Object.keys(value).map((key) => `${getIdent(depth + 4)}${key}: ${getString(value[key], depth + 2)}`)
    .join('\r\n');
  return `{\r\n${result}\r\n${getIdent(depth + 2)}}`;
};

const stylish = (tree) => {
  const iter = (currentTree, depth) => {
    const stylis = currentTree.map((item) => {
      let result;
      switch (item.status) {
        case 'unchanged':
          result = `${getIdent(depth)}  ${item.key}: ${getString(item.value, depth)}`;
          break;
        case 'added':
          result = `${getIdent(depth)}+ ${item.key}: ${getString(item.value, depth)}`;
          break;
        case 'removed':
          result = `${getIdent(depth)}- ${item.key}: ${getString(item.value, depth)}`;
          break;
        case 'changed':
          result = `${getIdent(depth)}- ${item.key}: ${getString(item.firstValue, depth)}\r\n  ${getIdent(depth)}+ ${item.key}: ${getString(item.secondValue, depth)}`;
          break;
        case 'nested':
          result = `${getIdent(depth)}  ${item.key}: ${iter(item.children, depth + 2)}`;
          break;
        default:
      }
      return result;
    })
      .map((item) => `  ${item}`)
      .join('\r\n');
    return `{\r\n${stylis}\r\n${getIdent(depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
