module.exports = {
  parser: 'babel-eslint',
  extends: ['@exeto', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
