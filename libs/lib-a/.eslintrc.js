const path = require("path");
require("@monodist/eslint-config/dist/patch");

module.exports = {
  extends: [
    path.join(require.resolve("@monodist/eslint-config"), "..", "node.js"),
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
