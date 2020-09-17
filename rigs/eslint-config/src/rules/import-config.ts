import {
  javaScriptExtensions,
  typeScriptExtensions,
  typeScriptOverrideFiles,
} from "../constants";
import { ConfigMutator } from "../types";
import {
  mutateExtends,
  mutateOverrides,
  mutateRules,
  mutateSettings,
  targetOverride,
  typedLinterConfig,
  typedLinterConfigSettings,
} from "../utils";

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

  overrides: [
    { files: ["*.ts", "*.tsx"], settings: typescriptImportConfigSettings },
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

export const importConfigMutator: ConfigMutator = (config) => {
  mutateExtends(config, (v) => [
    ...v,
    "plugin:import/errors",
    "plugin:import/warnings",
  ]);
  mutateOverrides(config, (v) => {
    const [typeScriptOverride] = targetOverride(typeScriptOverrideFiles, v);
    mutateExtends(typeScriptOverride, (w) => [
      ...w,
      "plugin:import/typescript",
    ]);

    // settings are special: they aren't deep merged, instead overwritten
    mutateSettings(typeScriptOverride, (w) => ({
      ...w,
      ...typescriptImportConfigSettings,
    }));

    return v;
  });
  mutateRules(config, (v) => ({
    ...v,
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
  }));
  mutateSettings(config, (v) => ({
    ...v,
    "import/resolver": {
      node: {
        extensions: javaScriptExtensions,
      },
    },
  }));
};
