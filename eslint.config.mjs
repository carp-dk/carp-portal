// @ts-check
import eslintReact from '@eslint-react/eslint-plugin';
import eslintJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'non_npm_dependencies/',
      'dist/',
      'vite.config.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    extends: [
      prettierRecommended,
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs['recommended-typescript'],
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      '@eslint-react/no-missing-key': 'error',
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
);
