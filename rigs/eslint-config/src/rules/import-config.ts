import { typedLinterConfig } from "../utils";

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

  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
});
