module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
    ecmaFeatures: {
      impliedStrict: false,
    },
  },
  rules: {
    strict: ['error', 'global'],
    'no-param-reassign': ['error', { props: false }],
  },
};
