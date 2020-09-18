const { extendNodeConfig, withTypeScriptParserOptions } = require("./dist");

module.exports = extendNodeConfig(
  withTypeScriptParserOptions({ tsconfigRootDir: __dirname }),
);
