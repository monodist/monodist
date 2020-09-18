import { Linter } from "eslint";

import { Applicator, applicator, applyToOverride } from "./applicator";
import { typeScriptOverrideFiles } from "./constants";

export const withDebug: Applicator<Linter.Config | Linter.ConfigOverride> = <
  T extends Linter.Config | Linter.ConfigOverride
>(
  config: T,
): T => {
  console.log(JSON.stringify(config, null, 2));
  return config;
};

export const withTypeScriptParserOptions = (
  typeScriptParserOptions: Exclude<Linter.Config["parserOptions"], undefined>,
): Applicator<Linter.Config> =>
  applicator({
    overrides: (overrides) => {
      applyToOverride(
        overrides,
        typeScriptOverrideFiles,
        applicator({
          parserOptions: (parserOptions) => ({
            ...parserOptions,
            ...typeScriptParserOptions,
          }),
        }),
      );

      return overrides;
    },
  });
