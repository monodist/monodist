import { typeScriptOverrideFiles } from "../constants";
import { ConfigMutator } from "../types";
import {
  mutateExtends,
  mutateOverrides,
  mutatePlugins,
  mutateRules,
  targetOverride,
  typedLinterConfig,
} from "../utils";

export const prettierConfig = typedLinterConfig({
  extends: ["prettier"],

  overrides: [
    {
      extends: ["prettier/@typescript-eslint"],
      files: ["*.ts", "*.tsx"],
    },
  ],

  plugins: ["prettier"],

  rules: {
    "prettier/prettier": ["error"],
  },
});

export const prettierConfigMutator: ConfigMutator = (config) => {
  mutateExtends(config, (v) => [...v, "prettier"]);
  mutateOverrides(config, (v) => {
    const [typeScriptOverride] = targetOverride(typeScriptOverrideFiles, v);
    mutateExtends(typeScriptOverride, (w) => [
      ...w,
      "prettier/@typescript-eslint",
    ]);
    return v;
  });
  mutatePlugins(config, (v) => [...v, "prettier"]);
  mutateRules(config, (v) => ({
    ...v,
    "prettier/prettier": ["error"],
  }));
};
