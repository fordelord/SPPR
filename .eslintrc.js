module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'react', 'prettier', '@typescript-eslint'],
  extends: ['eslint:recommended', 'prettier', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'newline-before-return': 'error',
    'no-console': 1,
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
  },
};
