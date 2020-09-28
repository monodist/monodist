const { extendNodeJsConfig, withTypeScriptParserOptions } = require("./dist");

module.exports = extendNodeJsConfig(
  withTypeScriptParserOptions({ tsconfigRootDir: __dirname }),
);
