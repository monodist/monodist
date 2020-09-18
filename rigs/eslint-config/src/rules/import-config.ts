import {
  javaScriptExtensions,
  javaScriptOverrideFiles,
  typeScriptExtensions,
  typeScriptOverrideFiles,
} from "../constants";
import { applicator, applyToOverride } from "../utils";

export const importConfigMutator = applicator({
  extends: (_extends) => [
    ..._extends,
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  overrides: (overrides) => {
    applyToOverride(
      overrides,
      javaScriptOverrideFiles,
      applicator({
        settings: (settings) => ({
          ...settings,
          "import/resolver": {
            node: {
              extensions: javaScriptExtensions,
            },
          },
        }),
      }),
    );

    applyToOverride(
      overrides,
      typeScriptOverrideFiles,
      applicator({
        extends: (_extends) => [..._extends, "plugin:import/typescript"],
        settings: (settings) => ({
          ...settings,
          "import/parsers": {
            "@typescript-eslint/parser": typeScriptExtensions,
          },
          "import/resolver": {
            node: {
              extensions: typeScriptExtensions,
            },
          },
        }),
      }),
    );

    return overrides;
  },
  rules: (rules) => ({
    ...rules,
    "import/no-extraneous-dependencies": "error",
    "import/no-unresolved": [
      "error",
      {
        ignore: ["@monodist/*"],
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            group: "internal",
            pattern: "@monodist/**",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "import/prefer-default-export": "off",
  }),
});
