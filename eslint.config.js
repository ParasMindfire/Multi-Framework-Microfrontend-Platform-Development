// eslint.config.js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default [
  // Ignore patterns first
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/__mf__temp/**',
      '**/.next/**',
      '**/.vite/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/*.cjs',
      '**/.__mf__temp/**',
    ],
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },

  // TypeScript files - use the correct spread
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),

  // Override TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': false, // This allows @ts-ignore
          'ts-expect-error': 'allow-with-description',
        },
      ],
    },
  },
]
