import { Linter } from "eslint";
import { produce, setAutoFreeze } from "immer";

import { isConfig, overrideFilesEqual, toList } from "./utils";

// frozen objects (produced by immer) don't play well with eslint
setAutoFreeze(false);

export type Applicator<T extends Linter.Config | Linter.ConfigOverride> = (
  config: T,
) => T;

export type ConfigMutator = {
  env?: (
    v: Exclude<Linter.Config["env"], undefined>,
    config: Linter.Config,
  ) => Linter.Config["env"];
  extends?: (
    v: Exclude<Linter.Config["extends"], undefined | string>,
    config: Linter.Config,
  ) => Linter.Config["extends"];
  ignorePatterns?: (
    v: Exclude<Linter.Config["ignorePatterns"], undefined | string>,
    config: Linter.Config,
  ) => Linter.Config["ignorePatterns"];
  overrides?: (
    v: Exclude<Linter.Config["overrides"], undefined>,
    config: Linter.Config,
  ) => Linter.Config["overrides"];
  parser?: (
    v: Linter.Config["parser"],
    config: Linter.Config,
  ) => Linter.Config["parser"];
  parserOptions?: (
    v: Exclude<Linter.Config["parserOptions"], undefined>,
    config: Linter.Config,
  ) => Linter.Config["parserOptions"];
  plugins?: (
    v: Exclude<Linter.Config["plugins"], undefined>,
    config: Linter.Config,
  ) => Linter.Config["plugins"];
  rules?: (
    v: Exclude<Linter.Config["rules"], undefined>,
    config: Linter.Config,
  ) => Linter.Config["rules"];
  settings?: (
    v: Exclude<Linter.Config["settings"], undefined>,
    config: Linter.Config,
  ) => Linter.Config["settings"];
};

export type ConfigOverrideMutator = {
  env?: (
    v: Exclude<Linter.ConfigOverride["env"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["env"];
  extends?: (
    v: Exclude<Linter.ConfigOverride["extends"], undefined | string>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["extends"];
  files?: (
    v: Exclude<Linter.ConfigOverride["files"], undefined | string>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["files"];
  overrides?: (
    v: Exclude<Linter.ConfigOverride["overrides"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["overrides"];
  parser?: (
    v: Linter.ConfigOverride["parser"],
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["parser"];
  parserOptions?: (
    v: Exclude<Linter.ConfigOverride["parserOptions"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["parserOptions"];
  plugins?: (
    v: Exclude<Linter.ConfigOverride["plugins"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["plugins"];
  rules?: (
    v: Exclude<Linter.ConfigOverride["rules"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["rules"];
  settings?: (
    v: Exclude<Linter.ConfigOverride["settings"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.Config["settings"];
};

export const applyToOverride = (
  overrides: Linter.ConfigOverride[],
  files: Linter.ConfigOverride["files"],
  cb: (override: Linter.ConfigOverride, created: boolean) => void,
): void => {
  if (overrides !== undefined && overrides.length !== 0) {
    for (let i = 0; i < overrides.length; i += 1) {
      const override = overrides[i];
      if (overrideFilesEqual(override.files, files)) {
        overrides[i] = produce(override, (draft) => cb(draft, false));
        return;
      }
    }
  }
  overrides.unshift(produce({ files }, (draft) => cb(draft, true)));
};

export function apply(
  config: Linter.Config,
  mutator: ConfigMutator,
): Linter.Config;
export function apply(
  config: Linter.ConfigOverride,
  mutator: ConfigOverrideMutator,
): Linter.ConfigOverride;
export function apply<T extends Linter.Config | Linter.ConfigOverride>(
  config: T,
  mutator: T extends Linter.Config ? ConfigMutator : ConfigOverrideMutator,
): T {
  return produce(config, (draft) => {
    if (mutator.env) {
      draft.env = mutator.env(draft.env ?? {}, draft);
    }
    if (mutator.extends) {
      draft.extends = mutator.extends(toList(draft.extends), draft);
    }
    if (isConfig(draft) && mutator.ignorePatterns) {
      const cast = draft as Linter.Config;
      cast.ignorePatterns = mutator.ignorePatterns(
        toList(cast.ignorePatterns),
        draft,
      );
    }
    if (mutator.overrides) {
      draft.overrides = mutator.overrides(draft.overrides ?? [], draft);
    }
    if (mutator.parser) {
      draft.parser = mutator.parser(draft.parser, draft);
    }
    if (mutator.parserOptions) {
      draft.parserOptions = mutator.parserOptions(
        draft.parserOptions ?? {},
        draft,
      );
    }
    if (mutator.plugins) {
      draft.plugins = mutator.plugins(draft.plugins ?? [], draft);
    }
    if (mutator.rules) {
      draft.rules = mutator.rules(draft.rules ?? {}, draft);
    }
    if (mutator.settings) {
      draft.settings = mutator.settings(draft.settings ?? {}, draft);
    }
  });
}

export const applicator = <T extends Linter.Config | Linter.ConfigOverride>(
  configMutator: T extends Linter.Config
    ? ConfigMutator
    : ConfigOverrideMutator,
): ((config: Linter.Config) => Linter.Config) => (config) =>
  apply(config, configMutator);

export const applyAll = <T extends Linter.Config | Linter.ConfigOverride>(
  config: Linter.Config,
  ...applicators: Applicator<T>[]
): Linter.Config =>
  applicators.reduce((prevConfig, app) => app(prevConfig as T), config);