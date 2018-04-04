// Standard config:
// https://github.com/feross/eslint-config-standard/blob/master/eslintrc.json
//
module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "env": {
    "browser": true,
    "jquery": true
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "globals": {
    "it": true,
    "describe": true,
    "expect": true,
    "jest": true,
    "process": true,
  },
  "rules": {
    "semi": ["error", "never"],
    "curly": [2, "all"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "camelcase": [1, {
      "properties": "always",
    }],
    "space-before-blocks": ["error", {
      "functions": "always",
      "keywords": "always",
      "classes": "always"
    }],
    "space-in-parens": 0,
    "space-before-function-paren": 0,
    "keyword-spacing": ["error", {
      "before": true,
      "after": true,
    }],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true,
      "align": "value",
    }],
    "no-nested-ternary": 1,
    "no-multi-spaces": 0,
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline"
    }],
    "object-curly-spacing": ["error", "always"],
    "no-multiple-empty-lines": ["error", {
      max: 2,
      maxEOF: 1
    }],
    "no-console": 1,
    "no-debugger": 1,
    "newline-per-chained-call": ["error", {
      "ignoreChainWithDepth": 3
    }],
    "func-call-spacing": 0,
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": 1,
    "react/display-name": 0,
  },
};
