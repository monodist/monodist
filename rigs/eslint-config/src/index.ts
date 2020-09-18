import "@rushstack/eslint-patch/lib/modern-module-resolution";
import { Linter } from "eslint";

import { Applicator, applyAll } from "./applicator";
import browserConfig from "./browser";
import nodeConfig from "./node";

export { withDebug, withTypeScriptParserOptions } from "./helpers";

export const extendBrowserConfig = (
  ...applicators: Applicator<Linter.Config>[]
): Linter.Config => applyAll(browserConfig, ...applicators);

export const extendNodeConfig = (
  ...applicators: Applicator<Linter.Config>[]
): Linter.Config => applyAll(nodeConfig, ...applicators);
