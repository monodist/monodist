import "@rushstack/eslint-patch/lib/modern-module-resolution";

import browserConfig from "./browser";
import nodeConfig from "./node";
import { ConfigMutator } from "./types";
import { mergeConfig } from "./utils";

export const extendBrowserConfig = (cb: ConfigMutator) =>
  mergeConfig(browserConfig, cb);

export const extendNodeConfig = (cb: ConfigMutator) =>
  mergeConfig(nodeConfig, cb);
