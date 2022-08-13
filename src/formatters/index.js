import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formattedDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }
  if (format === 'plain') {
    return plain(diff);
  }
  return json(diff);
};

export default formattedDiff;
