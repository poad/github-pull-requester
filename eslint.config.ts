// @ts-check

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

// @ts-expect-error no types
import github from 'eslint-plugin-github';

import { configs } from 'typescript-eslint';

export default defineConfig(
  {    ignores: [
      '**/*.d.ts',
      '*.{js,jsx}',
      'node_modules/**/*',
      'dist',
    ],
  },
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  {
    files: ['{src,test}/**/*.ts'],
    extends: [
      ...configs.recommended,
    ],
    plugins: {
      '@stylistic': stylistic,
      github,
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
