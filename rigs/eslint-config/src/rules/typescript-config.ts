import { typedLinterConfig } from "../utils";

export const typescriptConfig = typedLinterConfig({
  extends: ["plugin:@typescript-eslint/recommended"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2019,
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: "./",
  },

  plugins: ["@typescript-eslint"],

  rules: {
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
});
