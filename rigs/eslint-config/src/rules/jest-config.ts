import { Linter } from "eslint";

import {
  javaScriptExtensions,
  javaScriptOverrideFiles,
  typeScriptExtensions,
  typeScriptOverrideFiles,
} from "../constants";
import { applicator, applyToOverride, makeGlobsWithExtension } from "../utils";

const overrideGlobsWithoutExtension = ["**/__tests__/**/*", "e2e/**/*"];
const [javaScriptTestFiles, typeScriptTestFiles] = [
  javaScriptExtensions,
  typeScriptExtensions,
].map((languageExtensions) =>
  makeGlobsWithExtension(overrideGlobsWithoutExtension, languageExtensions),
);

export const jestConfigMutator = applicator({
  overrides: (overrides) => {
    const commonExtends = ["plugin:jest/recommended", "plugin:jest/style"];
    const commonRules: Partial<Linter.RulesRecord> = {
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "jest/expect-expect": [
        "error",
        { assertFunctionNames: ["expect", "request"] },
      ],
      "no-process-env": "off",
    };

    applyToOverride(
      overrides,
      javaScriptOverrideFiles,
      applicator({
        overrides: (overrideJsOverrides) => {
          applyToOverride(
            overrideJsOverrides,
            javaScriptTestFiles,
            applicator({
              env: (env) => ({ ...env, jest: true }),
              extends: (_extends) => [..._extends, ...commonExtends],
              rules: (rules) => ({ ...rules, ...commonRules }),
            }),
          );

          // update jest.config.js
          applyToOverride(
            overrideJsOverrides,
            ["**/jest*.config.js"],
            applicator({
              env: (env) => ({ ...env, node: true }),
            }),
          );

          return overrideJsOverrides;
        },
      }),
    );

    applyToOverride(
      overrides,
      typeScriptOverrideFiles,
      applicator({
        overrides: (overrideTsOverrides) => {
          applyToOverride(
            overrideTsOverrides,
            typeScriptTestFiles,
            applicator({
              env: (env) => ({ ...env, jest: true }),
              extends: (_extends) => [..._extends, ...commonExtends],
              rules: (rules) => ({ ...rules, ...commonRules }),
            }),
          );
          return overrideTsOverrides;
        },
      }),
    );

    return overrides;
  },
});
