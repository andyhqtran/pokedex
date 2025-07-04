import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import eslintParserTypeScript from '@typescript-eslint/parser';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/multiline': [
        'warn',
        {
          printWidth: 120,
          preferSingleLine: true,
        },
      ],
    },
  },
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/app/globals.css',
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@stylistic/jsx-pascal-case': 'error',
      '@stylistic/jsx-sort-props': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
];

export default eslintConfig;
