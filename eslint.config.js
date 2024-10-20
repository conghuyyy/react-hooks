import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs as typescriptESLintConfigs } from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import typescriptParser from '@typescript-eslint/parser';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser, parser: typescriptParser } },
  { ...pluginJs.configs.recommended, name: 'javascript-plugin' },
  ...typescriptESLintConfigs.recommended,
  { ...pluginReact.configs.flat.recommended, name: 'react-plugin' },
  { plugins: { 'react-hooks': pluginReactHooks }, name: 'react-hooks-plugin' },
  { ...pluginImport.flatConfigs.recommended, name: 'import-plugin' },
  { ...pluginPrettierRecommended, name: 'prettier-plugin' },
  {
    name: 'unused-imports-plugin',
    plugins: { 'unused-imports': pluginUnusedImports },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    name: 'eslint-import-resolver-typescript',
    rules: { 'import/no-unresolved': 'error' },
    settings: {
      'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
      },
    },
  },
  {
    name: 'custom-rule-configuration',
    rules: {
      'no-console': 'error',
      'max-params': ['error', 3],
      'max-depth': ['error', 4],
      'max-statements': ['error', 30],
      'max-statements-per-line': ['error', { max: 1 }],
      'max-lines': [
        'error',
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'index',
            'sibling',
            'parent',
            'object',
            'type',
          ],
        },
      ],
    },
  },
];
