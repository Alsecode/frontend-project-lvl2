const getIdent = (spaces) => ('  '.repeat(spaces));

const getString = (value, depth) => {
  if (typeof value !== 'object' || value === undefined || value === null) {
    return value;
  }
  const result = Object.keys(value).map((key) => `${getIdent(depth + 4)}${key}: ${getString(value[key], depth + 2)}`)
    .join('\n');
  return `{\n${result}\n${getIdent(depth + 2)}}`;
};

const stylish = (tree) => {
  const iter = (currentTree, depth) => {
    const stylis = currentTree.map((item) => {
      if (item.status === 'unchanged') {
        return `${getIdent(depth)}  ${item.key}: ${getString(item.value, depth)}`;
      }
      if (item.status === 'added') {
        return `${getIdent(depth)}+ ${item.key}: ${getString(item.value, depth)}`;
      }
      if (item.status === 'removed') {
        return `${getIdent(depth)}- ${item.key}: ${getString(item.value, depth)}`;
      }
      if (item.status === 'changed') {
        return `${getIdent(depth)}- ${item.key}: ${getString(item.firstValue, depth)}\n  ${getIdent(depth)}+ ${item.key}: ${getString(item.secondValue, depth)}`;
      }
      return `${getIdent(depth)}  ${item.key}: ${iter(item.children, depth + 2)}`;
    })
      .map((item) => `  ${item}`)
      .join('\n');
    return `{\n${stylis}\n${getIdent(depth)}}`;
  };
  return iter(tree, 0);
};

export default stylish;
