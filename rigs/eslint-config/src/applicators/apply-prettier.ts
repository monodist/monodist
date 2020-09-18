import { applicator, applyToOverride } from "../applicator";
import { typeScriptOverrideFiles } from "../constants";

export const applyPrettier = applicator({
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
