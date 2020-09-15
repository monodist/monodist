import { commentsConfig } from "./rules/comments-config";
import { importConfig } from "./rules/import-config";
import { javaScriptConfig } from "./rules/javascript-config";
import { jestConfig } from "./rules/jest-config";
import { prettierConfig } from "./rules/prettier-config";
import { promiseConfig } from "./rules/promise-config";
import { reactConfig } from "./rules/react-config";
import { typeScriptConfig } from "./rules/typescript-config";
import { typedLinterConfig } from "./utils";

export const base = typedLinterConfig({
  env: {
    // todo: eslint doesn't have a config for es2019... so this is slightly
    // over-optimistic until Node v14 is LTS and we begin using ES2020.
    es2020: true,
  },
  extends: [
    // order matters here
    ...javaScriptConfig.extends,
    ...commentsConfig.extends,
    ...importConfig.extends,
    ...promiseConfig.extends,
    ...prettierConfig.extends,
    ...reactConfig.extends,
  ],
  ignorePatterns: [
    ...javaScriptConfig.ignorePatterns,
    ...jestConfig.ignorePatterns,
  ],
  overrides: [
    ...commentsConfig.overrides,
    ...jestConfig.overrides,
    ...typeScriptConfig.overrides,
  ],
  plugins: [
    ...prettierConfig.plugins,
    ...promiseConfig.plugins,
    ...reactConfig.plugins,
  ],
  rules: {
    ...javaScriptConfig.rules,
    ...importConfig.rules,
    ...prettierConfig.rules,
    ...reactConfig.rules,
  },
  settings: {
    ...importConfig.settings,
    ...reactConfig.settings,
  },
});
