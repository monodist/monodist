import {
  typeScriptOverrideFiles,
  typeScriptReactExtension,
} from "../constants";
import { ConfigMutator } from "../types";
import {
  mutateExtends,
  mutateOverrides,
  mutatePlugins,
  mutateRules,
  mutateSettings,
  targetOverride,
  typedLinterConfig,
  typedLinterConfigRules,
} from "../utils";

export const typeScriptReactConfigExtensionRules = typedLinterConfigRules({
  "react/jsx-filename-extension": [
    "error",
    { extensions: [typeScriptReactExtension] },
  ],
});

export const reactConfig = typedLinterConfig({
  extends: ["plugin:react/recommended", "prettier/react"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "react/jsx-filename-extension": [
          "error",
          { extensions: [typeScriptReactExtension] },
        ],
      },
    },
  ],
  plugins: ["jsx-a11y", "react-hooks"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/button-has-type": "error",
    "react/destructuring-assignment": "error",
    "react/jsx-boolean-value": "error",
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
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "react/void-dom-elements-no-children": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});

export const reactConfigMutator: ConfigMutator = (config) => {
  mutateExtends(config, (v) => [
    ...v,
    "plugin:react/recommended",
    "prettier/react",
  ]);
  mutateOverrides(config, (v) => {
    const [typeScriptOverride] = targetOverride(typeScriptOverrideFiles, v);
    mutateRules(typeScriptOverride, (w) => ({
      ...w,
      "react/jsx-filename-extension": [
        "error",
        { extensions: [typeScriptReactExtension] },
      ],
    }));
    mutateSettings(typeScriptOverride, (w) => ({
      ...w,
      react: {
        version: "detect",
      },
    }));
    return v;
  });
  mutatePlugins(config, (v) => [...v, "jsx-a11y", "react-hooks"]);
  mutateRules(config, (v) => ({
    ...v,
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/button-has-type": "error",
    "react/destructuring-assignment": "error",
    "react/jsx-boolean-value": "error",
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
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "react/void-dom-elements-no-children": "error",
  }));
  mutateSettings(config, (v) => ({
    ...v,
    react: {
      version: "detect",
    },
  }));
};
