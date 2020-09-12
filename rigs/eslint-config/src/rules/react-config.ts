import { typedLinterConfig } from "../utils";

export const reactConfig = typedLinterConfig({
  extends: ["plugin:react/recommended", "prettier/react"],
  plugins: ["jsx-a11y", "react-hooks"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/button-has-type": "error",
    "react/destructuring-assignment": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-handler-names": "error",
    "react/jsx-max-depth": ["error", { max: 7 }],
    "react/jsx-pascal-case": "error",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    "react/no-access-state-in-setstate": "error",
    "react/no-danger": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unescaped-entities": "off",
    "react/no-unsafe": ["error", { checkAliases: true }],
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/prefer-es6-class": "error",
    "react/prefer-stateless-function": "error",
    "react/self-closing-comp": "error",
    "react/void-dom-elements-no-children": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
