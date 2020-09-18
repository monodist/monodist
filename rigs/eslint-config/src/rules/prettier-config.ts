import { typeScriptOverrideFiles } from "../constants";
import { applicator, applyToOverride } from "../utils";

export const prettierConfigMutator = applicator({
  extends: (_extends) => [..._extends, "prettier"],
  overrides: (overrides) => {
    applyToOverride(
      overrides,
      typeScriptOverrideFiles,
      applicator({
        extends: (_extends) => [..._extends, "prettier/@typescript-eslint"],
      }),
    );
    return overrides;
  },
  plugins: (plugins) => [...plugins, "prettier"],
  rules: (rules) => ({
    ...rules,
    "prettier/prettier": ["error"],
  }),
});
