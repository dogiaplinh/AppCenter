module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  plugins: [
    "react-hooks"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/display-name": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-use-before-define": ["error", {"variables": false}],
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": ["error", {}, {
      "usePrettierrc": true
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};