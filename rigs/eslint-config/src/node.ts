import { baseConfig } from "./rules/base-config";
import { commentsConfig } from "./rules/comments-config";
import { importConfig } from "./rules/import-config";
import { jestConfig } from "./rules/jest-config";
import { prettierConfig } from "./rules/prettier-config";
import { promiseConfig } from "./rules/promise-config";
import { typescriptConfig } from "./rules/typescript-config";
import { typedLinterConfig } from "./utils";

export = typedLinterConfig({
  env: {
    // todo: eslint doesn't have a config for es2019... so this is slightly
    // over-optimistic until Node v14 is LTS and we begin using ES2020.
    es2020: true,
    node: true,
  },
  extends: [
    ...baseConfig.extends,
    ...commentsConfig.extends,
    ...typescriptConfig.extends,
    ...importConfig.extends,
    ...promiseConfig.extends,
    ...prettierConfig.extends,
  ],
  globals: {
    process: true,
  },
  ignorePatterns: [...baseConfig.ignorePatterns, ...jestConfig.ignorePatterns],
  overrides: [...commentsConfig.overrides, ...jestConfig.overrides],
  parser: typescriptConfig.parser,
  parserOptions: typescriptConfig.parserOptions,
  plugins: [
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
