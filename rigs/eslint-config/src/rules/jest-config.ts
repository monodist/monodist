import { Linter } from "eslint";

import {
  javaScriptExtensions,
  typeScriptExtensions,
  typeScriptOverrideFiles,
} from "../constants";
import { ConfigMutator } from "../types";
import {
  makeGlobsWithExtension,
  mutateEnv,
  mutateExtends,
  mutateOverrides,
  mutateRules,
  targetOverride,
  typedLinterConfig,
  typedLinterConfigOverride,
} from "../utils";

const overrideGlobsWithoutExtension = ["**/__tests__/**/*", "e2e/**/*"];
const [javaScriptTestFiles, typeScriptTestFiles] = [
  javaScriptExtensions,
  typeScriptExtensions,
].map((languageExtensions) =>
  makeGlobsWithExtension(overrideGlobsWithoutExtension, languageExtensions),
);

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
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      overrides: [typeScriptJestConfigOverrides],
    },
    javaScriptJestConfigOverrides,
    typedLinterConfig({
      env: { node: true },
      files: ["**/jest*.config.js"],
    }),
  ],
});

const applyTestFileMutationToOverride = (
  override: Linter.ConfigOverride,
): Linter.ConfigOverride => {
  mutateEnv(override, (v) => ({ ...v, jest: true }));
  mutateExtends(override, (v) => [
    ...v,
    "plugin:jest/recommended",
    "plugin:jest/style",
  ]);
  mutateRules(override, (v) => ({
    ...v,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "jest/expect-expect": [
      "error",
      { assertFunctionNames: ["expect", "request"] },
    ],
    "no-process-env": "off",
  }));

  return override;
};

export const jestConfigMutator: ConfigMutator = (config) => {
  mutateOverrides(config, (v) => {
    // we override *.test.js(x) files
    const [javaScriptTestOverride] = targetOverride(javaScriptTestFiles, v);
    applyTestFileMutationToOverride(javaScriptTestOverride);

    // we override *.test.ts(x) files (nested in a *.ts(x) override)
    const [typeScriptOverride] = targetOverride(typeScriptOverrideFiles, v);
    mutateOverrides(typeScriptOverride, (w) => {
      const [typeScriptTestOverride] = targetOverride(typeScriptTestFiles, w);
      applyTestFileMutationToOverride(typeScriptTestOverride);
      return w;
    });

    return [
      ...v,
      {
        env: { node: true },
        files: ["**/jest*.config.js"],
      },
    ];
  });
};
