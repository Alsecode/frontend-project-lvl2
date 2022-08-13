module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    'jest',
  ],
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'import/extensions': 0, 
    'no-underscore-dangle': [2, { "allow": ["__filename", "__dirname"] }],
  },
};