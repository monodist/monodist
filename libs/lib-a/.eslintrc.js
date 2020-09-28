const {
  extendNodeJsConfig,
  withTypeScriptParserOptions,
} = require("@monodist/eslint-config");

module.exports = extendNodeJsConfig(
  withTypeScriptParserOptions({ tsconfigRootDir: __dirname }),
);
