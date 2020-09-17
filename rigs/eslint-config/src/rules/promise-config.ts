import { ConfigMutator } from "../types";
import { mutateExtends, mutatePlugins, typedLinterConfig } from "../utils";

export const promiseConfig = typedLinterConfig({
  extends: ["plugin:promise/recommended"],

  plugins: ["promise"],
});

export const promiseConfigMutator: ConfigMutator = (config) => {
  mutateExtends(config, (v) => [...v, "plugin:promise/recommended"]);
  mutatePlugins(config, (v) => [...v, "promise"]);
};
