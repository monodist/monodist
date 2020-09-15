import { javaScriptExtensions, typeScriptExtensions } from "../constants";
import {
  makeGlobsWithExtension,
  typedLinterConfig,
  typedLinterConfigOverride,
} from "../utils";

const overrideGlobsWithoutExtension = ["**/__tests__/**/*", "e2e/**/*"];

const makeJestConfigOverrides = (files: string[]) =>
  typedLinterConfigOverride({
    env: { jest: true },
    extends: ["plugin:jest/recommended", "plugin:jest/style"],
    files,
    rules: {
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "jest/expect-expect": [
        "error",
        { assertFunctionNames: ["expect", "request"] },
      ],
      "no-process-env": "off",
    },
  });

export const [javaScriptJestConfigOverrides, typeScriptJestConfigOverrides] = [
  javaScriptExtensions,
  typeScriptExtensions,
].map((extensions) =>
  makeJestConfigOverrides(
    makeGlobsWithExtension(overrideGlobsWithoutExtension, extensions),
  ),
);

export const jestConfig = typedLinterConfig({
  ignorePatterns: ["jest*.config.js"],
  overrides: [
    typedLinterConfig({
      env: { node: true },
      files: ["**/jest*.config.js"],
    }),
    javaScriptJestConfigOverrides,
  ],
});
