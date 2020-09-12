import { typedLinterConfig } from "../utils";

export const jestConfig = typedLinterConfig({
  ignorePatterns: ["jest*.config.js"],
  overrides: [
    typedLinterConfig({
      env: { node: true },
      files: ["**/jest*.config.js"],
    }),
    typedLinterConfig({
      env: { jest: true },
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      files: ["**/__tests__/**/*.ts", "e2e/**/*.ts"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
        "jest/expect-expect": [
          "error",
          { assertFunctionNames: ["expect", "request"] },
        ],
        "no-process-env": "off",
      },
    }),
  ],
});
