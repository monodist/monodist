const path = require("path");
require("@monodist/eslint-config/dist/patch");

module.exports = {
  extends: [
    path.join(require.resolve("@monodist/eslint-config"), "..", "node.js"),
  ],
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
  },
};
