import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs as typescriptESLintConfigs } from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReactFunc from 'eslint-plugin-react-func';
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
      '@typescript-eslint/no-unused-vars': 'off',
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
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        typescript: { alwaysTryTypes: true },
      },
    },
  },
  {
    name: 'custom-rule-configuration',
    plugins: { 'react-func': pluginReactFunc },
    ignores: ['**/node_modules'],
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
      'react-func/max-lines-per-function': [
        'error',
        { max: 50, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      'react/display-name': 'warn',
      'react/prop-types': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
