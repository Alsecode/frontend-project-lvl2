import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formattedDiff = (diff, format) => {
  let result;
  switch (format) {
    case 'stylish':
      result = stylish(diff);
      break;
    case 'plain':
      result = plain(diff);
      break;
    case 'json':
      result = json(diff);
      break;
    default:
  }
  return result;
};

export default formattedDiff;
