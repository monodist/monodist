import { baseConfig } from "./rules/base-config";
import { commentsConfig } from "./rules/comments-config";
import { importConfig } from "./rules/import-config";
import { jestConfig } from "./rules/jest-config";
import { prettierConfig } from "./rules/prettier-config";
import { promiseConfig } from "./rules/promise-config";
import { reactConfig } from "./rules/react-config";
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
    ...reactConfig.extends,
  ],
  ignorePatterns: [...baseConfig.ignorePatterns, ...jestConfig.ignorePatterns],
  overrides: [...commentsConfig.overrides, ...jestConfig.overrides],
  parser: typescriptConfig.parser,
  parserOptions: typescriptConfig.parserOptions,
  plugins: [
    ...prettierConfig.plugins,
    ...promiseConfig.plugins,
    ...reactConfig.plugins,
    ...typescriptConfig.plugins,
  ],
  rules: {
    ...baseConfig.rules,
    ...importConfig.rules,
    ...prettierConfig.rules,
    ...reactConfig.rules,
    ...typescriptConfig.rules,
  },
  settings: {
    ...importConfig.settings,
    ...reactConfig.settings,
  },
});
