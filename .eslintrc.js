module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          './src',
          'node_modules',
        ],
        extensions: [
          '.js',
          '.ts',
        ],
      },
      typescript: { // enables ts aliasing
        alwaysTryTypes: true,
        project: '.',
      },
    },
  },
  rules: {
    'no-console': 2,
    'max-lines': [2, {
      max: 150,
      skipBlankLines: false,
      skipComments: true,
    }],
    'import/extensions': [2, 'ignorePackages', {
      js: 'never',
      ts: 'never',
    }],
  },
};
