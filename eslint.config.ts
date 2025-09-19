// @ts-check

import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import stylisticTs from '@stylistic/eslint-plugin-ts';

import github from 'eslint-plugin-github';

import tseslint, { configs } from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  {
    ignores: [
      '**/*.d.ts',
      '*.{js,jsx}',
      'node_modules/**/*',
      'dist',
    ],
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
