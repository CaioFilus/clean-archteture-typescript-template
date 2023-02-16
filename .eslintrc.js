module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
     'airbnb-base',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}
