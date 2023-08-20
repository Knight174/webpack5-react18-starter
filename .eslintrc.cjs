module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/node_modules/*'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [],
  rules: {
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
        parser: 'flow'
      }
    ]
  }
}
