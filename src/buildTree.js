import _ from 'lodash';

 const buildTree = (file1, file2) => {
   const oldEntries = _.entries(file1);
   const newEntries = _.entries(file2);
   const allEntries = _.uniqWith(oldEntries.concat(newEntries), _.isEqual);
   const result = allEntries.map((item) => {
      const [key, value] = item;
      if (file1[key] === file2[key]) {
         return `  ${key}: ${value}`; 
      }
      if (typeof file1[key] === 'undefined' || (file2[key] === value)) {
         return `+ ${key}: ${value}`;
      }
      return `- ${key}: ${value}`;
   })
   .sort((a, b) => {
      const [mod1, key1, ] = a.split(' ');
      const [mod2, key2, ] = b.split(' ');
      if (key1 === key2) {
         return mod1 < mod2 ? 1 : -1;
      }
      if (a.slice(2) > b.slice(2)) {
         return 1;
      }
      return -1;
   })
   .map((item) => {
      return `\n  ${item}`;
   })
   .join('');
   return `{${result}\n}`;
 };
 
 export default buildTree;