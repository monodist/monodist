import { javaScriptExtensions, typeScriptExtensions } from "../constants";
import { typedLinterConfig, typedLinterConfigSettings } from "../utils";

const [javaScriptImportConfigSettings, baseTypeScriptImportConfigSettings] = [
  javaScriptExtensions,
  typeScriptExtensions,
].map((extensions) => ({
  "import/resolver": {
    node: {
      extensions,
    },
  },
}));

export const typescriptImportConfigSettings = typedLinterConfigSettings({
  "import/parsers": {
    "@typescript-eslint/parser": typeScriptExtensions,
  },
  ...baseTypeScriptImportConfigSettings,
});

export const importConfig = typedLinterConfig({
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],

  rules: {
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
  },

  settings: javaScriptImportConfigSettings,
});
