const path = require("path");
require("@monodist/eslint-config/dist/patch");

module.exports = {
  extends: [
    path.join(require.resolve("@monodist/eslint-config"), "..", "node.js"),
  ],
  ignorePatterns: [".eslintrc.js"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
  },
  rules: {
    "react/prop-types": "off",
  },
};
