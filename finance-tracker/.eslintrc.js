module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', 
    "linebreak-style": 0,
    'indent': [1, 'tab'],
    'no-tabs': 0,
    'max-len': [1, 140],
    "comma-dangle": [2, "never"]
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};
