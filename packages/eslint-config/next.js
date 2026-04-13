import baseConfig from './index.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
];
