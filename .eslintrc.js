module.exports = {
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase']
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx']
      }
    ],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-curly-newline': 'off',
    'react/prefer-stateless-function': ['off', { ignorePureComponents: true }],
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  }
}
