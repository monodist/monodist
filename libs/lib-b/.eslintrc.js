const path = require("path");
require("@monodist/eslint-config/dist/patch");

module.exports = {
  extends: [
    path.join(require.resolve("@monodist/eslint-config"), "..", "react.js"),
  ],
  ignorePatterns: [".eslintrc.js", "tailwind.config.js", "postcss.config.js"],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "react/prop-types": "off",
  },
};
