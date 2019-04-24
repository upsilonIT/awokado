'use strict';

const env = process.env.NODE_ENV;
const isTest = env === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: isTest ? { node: 'current' } : {},
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-transform-imports',
      {
        ramda: {
          transform: 'ramda/src/${member}',
          preventFullImport: true,
        },
      },
    ]
  ],
};
