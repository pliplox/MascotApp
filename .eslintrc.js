module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prettier/prettier": ["error", {
      semi: false,
      endOfLine: "auto",
      bracketSpacing: true,
      jsxBracketSameLine: true,
      singleQuote: true,
      trailingComma: 'all',
      arrowParens: 'avoid',
      endOfLine: 'auto',
    }],
    "react/prop-types": [ 2 ],
    "react/no-unused-prop-types": [ 2]
  }
};
