import yaml from 'js-yaml';

const parse = (filePath, fileType) => {
  if (fileType === 'json') {
    return JSON.parse(filePath);
  }
  if (fileType === 'yml' || fileType === 'yaml') {
    return yaml.load(filePath);
  }
  return 'Error! Invalid type.'
};

export default parse;
