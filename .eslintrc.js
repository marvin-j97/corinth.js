module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
    "import/order": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    curly: "error",
    eqeqeq: "error",
    yoda: "error",
  },
};
