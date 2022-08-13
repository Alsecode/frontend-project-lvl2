module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "airbnb-base",
	"plugin:jest/recommended"
  ],
  "parser": '@typescript-eslint/parser',
  "parserOptions": {
    "ecmaVersion": 'latest',
    "sourceType": 'module',
  },
  "plugins": [
    '@typescript-eslint',
  ],
  "rules": {
  	  "no-console": 0,
	  "import/extensions": 0,
  	  "no-underscore-dangle": [2, { "allow": ["__filename", "__dirname"] }],
   },
};