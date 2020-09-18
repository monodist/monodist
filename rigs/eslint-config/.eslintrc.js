module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:promise/recommended",
    "prettier",
  ],
  ignorePatterns: ["bin", "dist", "node_modules"],
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      overrides: [
        {
          files: ["**/jest*.config.js"],
          env: {
            node: true,
          },
        },
        {
          files: [
            "**/__tests__/**/*.js",
            "**/__tests__/**/*.jsx",
            "e2e/**/*.js",
            "e2e/**/*.jsx",
          ],
          env: {
            jest: true,
          },
          extends: ["plugin:jest/recommended", "plugin:jest/style"],
          rules: {
            "import/no-extraneous-dependencies": [
              "error",
              {
                devDependencies: true,
              },
            ],
            "jest/expect-expect": [
              "error",
              {
                assertFunctionNames: ["expect", "request"],
              },
            ],
            "no-process-env": "off",
          },
        },
        {
          files: ["*.generated.js", "*.generated.jsx"],
          rules: {
            "eslint-comments/disable-enable-pair": "off",
            "eslint-comments/no-unlimited-disable": "off",
          },
        },
      ],
      settings: {
        "import/resolver": {
          node: {
            extensions: [".js", ".jsx"],
          },
        },
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-dupe-class-members": "off",
        "no-empty-function": "off",
        "no-shadow": "off",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/class-name-casing": "off",
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "allow",
          },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/naming-convention": [
          "error",
          {
            format: ["camelCase", "PascalCase"],
            selector: "default",
          },
          {
            format: ["camelCase", "PascalCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
            selector: "variable",
          },
          {
            format: ["camelCase"],
            leadingUnderscore: "allow",
            selector: "parameter",
          },
          {
            format: ["camelCase", "PascalCase", "UPPER_CASE"],
            selector: "memberLike",
          },
          {
            format: ["camelCase"],
            leadingUnderscore: "require",
            modifiers: ["private"],
            selector: "memberLike",
          },
          {
            format: ["camelCase"],
            leadingUnderscore: "require",
            modifiers: ["protected"],
            selector: "memberLike",
          },
          {
            format: ["PascalCase"],
            leadingUnderscore: "allow",
            selector: "typeLike",
          },
        ],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-extraneous-class": [
          "error",
          {
            allowStaticOnly: true,
            allowWithDecorator: true,
          },
        ],
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "warn",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/no-unused-expressions": ["error"],
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "all",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            ignoreRestSiblings: true,
            vars: "local",
          },
        ],
        "@typescript-eslint/no-use-before-define": [
          "error",
          {
            classes: false,
            functions: false,
            typedefs: false,
            variables: false,
          },
        ],
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/prefer-includes": "warn",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/unified-signatures": "warn",
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "prettier/@typescript-eslint",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
      },
      plugins: ["@typescript-eslint"],
      overrides: [
        {
          files: [
            "**/__tests__/**/*.ts",
            "**/__tests__/**/*.tsx",
            "e2e/**/*.ts",
            "e2e/**/*.tsx",
          ],
          env: {
            jest: true,
          },
          extends: ["plugin:jest/recommended", "plugin:jest/style"],
          rules: {
            "import/no-extraneous-dependencies": [
              "error",
              {
                devDependencies: true,
              },
            ],
            "jest/expect-expect": [
              "error",
              {
                assertFunctionNames: ["expect", "request"],
              },
            ],
            "no-process-env": "off",
          },
        },
        {
          files: ["*.generated.ts", "*.generated.tsx"],
          rules: {
            "eslint-comments/disable-enable-pair": "off",
            "eslint-comments/no-unlimited-disable": "off",
          },
        },
      ],
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
        },
      },
    },
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
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
    "prettier/prettier": ["error"],
  },
  plugins: ["promise", "prettier"],
};
