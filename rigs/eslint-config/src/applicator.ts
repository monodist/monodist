import { Linter } from "eslint";
import { produce, setAutoFreeze } from "immer";

import { isConfig, overrideFilesEqual, toList } from "./utils";

// frozen objects (produced by immer) don't play well with eslint
setAutoFreeze(false);

export type Applicator<T extends Linter.Config | Linter.ConfigOverride> = (
  config: T,
) => T;

export type ConfigMutator = {
  $schema?: (
    v: Linter.Config["$schema"],
    config: Linter.Config,
  ) => Linter.Config["$schema"];
  env?: (
    v: Exclude<Linter.Config["env"], undefined>,
    config: Linter.Config,
  ) => Linter.Config["env"];
  extends?: (
    v: Exclude<Linter.Config["extends"], undefined | string>,
    config: Linter.Config,
  ) => Linter.Config["extends"];
  globals?: (
    v: Exclude<Linter.Config["globals"], undefined | string>,
    config: Linter.Config,
  ) => Linter.Config["globals"];
  ignorePatterns?: (
    v: Exclude<Linter.Config["ignorePatterns"], undefined | string>,
    config: Linter.Config,
  ) => Linter.Config["ignorePatterns"];
  noInlineConfig?: (
    v: Linter.Config["noInlineConfig"],
    config: Linter.Config,
  ) => Linter.Config["noInlineConfig"];
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
  processor?: (
    v: Linter.Config["processor"],
    config: Linter.Config,
  ) => Linter.Config["processor"];
  reportUnusedDisableDirectives?: (
    v: Linter.Config["reportUnusedDisableDirectives"],
    config: Linter.Config,
  ) => Linter.Config["reportUnusedDisableDirectives"];
  root?: (
    v: Linter.Config["root"],
    config: Linter.Config,
  ) => Linter.Config["root"];
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
  $schema?: (
    v: Linter.ConfigOverride["$schema"],
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["$schema"];
  env?: (
    v: Exclude<Linter.ConfigOverride["env"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["env"];
  excludedFiles?: (
    v: Exclude<Linter.ConfigOverride["excludedFiles"], undefined | string>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["excludedFiles"];
  extends?: (
    v: Exclude<Linter.ConfigOverride["extends"], undefined | string>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["extends"];
  files?: (
    v: Exclude<Linter.ConfigOverride["files"], undefined | string>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["files"];
  globals?: (
    v: Exclude<Linter.ConfigOverride["globals"], undefined | string>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["globals"];
  noInlineConfig?: (
    v: Linter.ConfigOverride["noInlineConfig"],
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["noInlineConfig"];
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
  processor?: (
    v: Linter.ConfigOverride["processor"],
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["processor"];
  reportUnusedDisableDirectives?: (
    v: Linter.ConfigOverride["reportUnusedDisableDirectives"],
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["reportUnusedDisableDirectives"];
  rules?: (
    v: Exclude<Linter.ConfigOverride["rules"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["rules"];
  settings?: (
    v: Exclude<Linter.ConfigOverride["settings"], undefined>,
    config: Linter.ConfigOverride,
  ) => Linter.ConfigOverride["settings"];
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
  const overrideMutator = isConfig(config)
    ? undefined
    : (mutator as ConfigOverrideMutator);

  return produce(config, (draft) => {
    if (mutator.$schema) {
      draft.$schema = mutator.$schema(draft.$schema, draft);
    }
    if (mutator.env) {
      draft.env = mutator.env(draft.env ?? {}, draft);
    }
    if (!isConfig(config) && overrideMutator && overrideMutator.excludedFiles) {
      (draft as Linter.ConfigOverride).excludedFiles = overrideMutator.excludedFiles(
        toList((draft as Linter.ConfigOverride).excludedFiles),
        draft as Linter.ConfigOverride,
      );
    }
    if (mutator.extends) {
      draft.extends = mutator.extends(toList(draft.extends), draft);
    }
    if (isConfig(draft) && mutator.ignorePatterns) {
      (draft as Linter.Config).ignorePatterns = mutator.ignorePatterns(
        toList((draft as Linter.Config).ignorePatterns),
        draft,
      );
    }
    if (mutator.globals) {
      draft.globals = mutator.globals(draft.globals ?? {}, draft);
    }
    if (mutator.noInlineConfig) {
      draft.noInlineConfig = mutator.noInlineConfig(
        draft.noInlineConfig,
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
    if (mutator.processor) {
      draft.processor = mutator.processor(draft.processor, draft);
    }
    if (mutator.reportUnusedDisableDirectives) {
      draft.reportUnusedDisableDirectives = mutator.reportUnusedDisableDirectives(
        draft.reportUnusedDisableDirectives,
        draft,
      );
    }
    if (isConfig(draft) && mutator.root) {
      (draft as Linter.Config).root = mutator.root(
        (draft as Linter.Config).root,
        draft,
      );
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
