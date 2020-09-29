import "@rushstack/eslint-patch/lib/modern-module-resolution";
import { Linter } from "eslint";

import { Applicator, applyAll } from "./applicator";
import {
  baseConfig,
  browserConfig,
  nextJsConfig,
  nodeJsConfig,
} from "./configs";

export { withDebug, withTypeScriptParserOptions } from "./helpers";

export const extendBaseConfig = (
  ...applicators: Applicator<Linter.Config>[]
): Linter.Config => applyAll(baseConfig, ...applicators);

export const extendBrowserConfig = (
  ...applicators: Applicator<Linter.Config>[]
): Linter.Config => applyAll(browserConfig, ...applicators);

export const extendNextJsConfig = (
  ...applicators: Applicator<Linter.Config>[]
): Linter.Config => applyAll(nextJsConfig, ...applicators);

export const extendNodeJsConfig = (
  ...applicators: Applicator<Linter.Config>[]
): Linter.Config => applyAll(nodeJsConfig, ...applicators);
