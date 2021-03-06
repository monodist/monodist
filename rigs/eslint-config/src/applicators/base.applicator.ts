import { applicator, applyToOverride } from "../applicator";
import { javaScriptOverrideFiles, typeScriptOverrideFiles } from "../constants";

const eslintFiles = [".eslintrc.js"];

export const baseApplicator = applicator({
  env: (env) => ({ ...env, es2020: true }),
  extends: (_extends) => [..._extends, "eslint:recommended"],
  ignorePatterns: (ignorePatterns) => [
    ...ignorePatterns,
    "bin",
    "dist",
    "node_modules",
  ],
  overrides: (overrides) => {
    applyToOverride(
      overrides,
      javaScriptOverrideFiles,
      applicator({
        overrides: (overrideJsFiles) => {
          applyToOverride(
            overrideJsFiles,
            eslintFiles,
            applicator({
              env: (env) => ({ ...env, node: true }),
            }),
          );
          return overrideJsFiles;
        },
      }),
    );
    applyToOverride(
      overrides,
      typeScriptOverrideFiles,
      applicator({
        rules: (rules) => ({
          ...rules,
          "no-dupe-class-members": "off",
          "no-empty-function": "off",
          "no-shadow": "off",
        }),
      }),
    );
    return overrides;
  },
  rules: (rules) => ({
    ...rules,
    "comma-dangle": ["error", "always-multiline"],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-buffer-constructor": "error",
    "no-caller": "error",
    "no-continue": "off",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-implicit-coercion": [
      "error",
      {
        allow: ["!!", "+"],
      },
    ],
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-misleading-character-class": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-require": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-path-concat": "error",
    "no-process-env": "error",
    "no-proto": "error",
    "no-restricted-globals": ["error", "name"],
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-shadow-restricted-names": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-catch": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-with": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-spread": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    radix: "error",
    "require-atomic-updates": "error",
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
    "sort-keys": "error",
    yoda: "error",
  }),
});
