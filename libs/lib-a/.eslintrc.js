const {
  extendNodeConfig,
  withTypeScriptParserOptions,
} = require("@monodist/eslint-config");

module.exports = extendNodeConfig(
  withTypeScriptParserOptions({ tsconfigRootDir: __dirname }),
);
