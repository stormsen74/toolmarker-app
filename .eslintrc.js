// module.exports = {
//   parser: 'babel-eslint',
//   parserOptions: {
//     ecmaVersion: 8,
//     sourceType: 'module',
//     ecmaFeatures: {
//       classes: true,
//       jsx: true,
//     },
//   },
//   env: {
//     browser: true,
//     node: true,
//     'jest/globals': true,
//     es6: true,
//   },
//   plugins: ['jest', 'react', 'prettier'],
//   extends: [
//     'eslint:recommended',
//     'plugin:jest/recommended',
//     'plugin:react/recommended',
//     'prettier',
//   ],
//   rules: {
//     'prettier/prettier': 'error',
//     'no-console': 'error',
//     'no-debugger': 'error',
//     'react/prop-types': 'off'
//   },
//   settings: {
//     react: {
//       version: '16.13.1',
//     },
//   },
// };


module.exports = {
  "parser": "babel-eslint",
  "env": {
  "browser": true,
    "node": true,
    "es6": true
},
  "plugins": ["prettier", "react"],
  "extends": ["eslint:recommended", "plugin:react/recommended", "prettier"],
  "parserOptions": {
  "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
    "classes": true,
      "jsx": true
  }
},
  "rules": {
  "react/react-in-jsx-scope": "off",
    "prefer-arrow-callback": 2,
    "prefer-const": 2,
    "prefer-promise-reject-errors": 2,
    "prettier/prettier": 2,
    "strict": [2, "global"],
    "no-console": 2,
    "react/prop-types": 0,
    "semi": [2, "never"]
},
  "settings": {
  "react": {
    "version": "16.12.0"
  }
}
}
