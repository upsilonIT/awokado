module.exports = {
  parser: 'babel-eslint',
  extends: ['@exeto', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['src/**/*.js'],
      env: {
        node: false,
      },
    },
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
