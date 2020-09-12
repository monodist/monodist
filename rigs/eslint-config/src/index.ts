import { baseConfig } from "./rules/base-config";
import { commentsConfig } from "./rules/comments-config";
import { importConfig } from "./rules/import-config";
import { jestConfig } from "./rules/jest-config";
import { jsonFormatConfig } from "./rules/json-format";
import { prettierConfig } from "./rules/prettier-config";
import { promiseConfig } from "./rules/promise-config";
import { typescriptConfig } from "./rules/typescript-config";
import { typedLinterConfig } from "./utils";

export = typedLinterConfig({
  extends: [
    ...baseConfig.extends,
    ...commentsConfig.extends,
    ...typescriptConfig.extends,
    ...importConfig.extends,
    ...promiseConfig.extends,
    ...prettierConfig.extends,
  ],
  ignorePatterns: [
    ...baseConfig.ignorePatterns,
    ...jestConfig.ignorePatterns,
    ...jsonFormatConfig.ignorePatterns,
  ],
  overrides: [...commentsConfig.overrides, ...jestConfig.overrides],
  parser: typescriptConfig.parser,
  parserOptions: typescriptConfig.parserOptions,
  plugins: [
    ...jsonFormatConfig.plugins,
    ...prettierConfig.plugins,
    ...promiseConfig.plugins,
    ...typescriptConfig.plugins,
  ],
  rules: {
    ...baseConfig.rules,
    ...importConfig.rules,
    ...prettierConfig.rules,
    ...typescriptConfig.rules,
  },
  settings: {
    ...importConfig.settings,
  },
});
