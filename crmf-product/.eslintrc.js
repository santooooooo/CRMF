module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  rules: {
	  "no-tabs": 0,
	  "indent": 0,
	  "quotes": 0,
	  "spaced-comment": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ]
}
