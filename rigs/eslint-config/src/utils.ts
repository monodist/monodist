import { Linter } from "eslint";
import { produce, setAutoFreeze } from "immer";

import { ConfigMutator } from "./types";

setAutoFreeze(false);

export const makeGlobsWithExtension = (
  globsWithoutExtension: string[],
  extensions: string[],
): string[] =>
  globsWithoutExtension.flatMap((globWithoutExtension) =>
    extensions.map((extension) => `${globWithoutExtension}${extension}`),
  );

export const typedLinterConfig = <P extends Linter.Config>(p: P): P => p;
export const typedLinterConfigOverride = <P extends Linter.ConfigOverride>(
  p: P,
): P => p;
export const typedLinterConfigRules = <P extends Linter.Config["rules"]>(
  p: P,
): P => p;
export const typedLinterConfigSettings = <P extends Linter.Config["settings"]>(
  p: P,
): P => p;

export const toStringList = (v: string | string[] | undefined): string[] =>
  v === undefined ? [] : typeof v === "string" ? [v] : v;

export const ifUndefined = <T>(v: T | undefined, notV: T): T =>
  v === undefined ? notV : v;

export const mergeConfig = (
  base: Linter.Config = {},
  cb?: ConfigMutator,
): Linter.Config => (cb === undefined ? base : produce(base, cb));

export const mergeConfigs = (
  baseConfig: Linter.Config,
  configMutators: ConfigMutator[],
): Linter.Config =>
  configMutators.reduce(
    (prevConfig, configMutator) => mergeConfig(prevConfig, configMutator),
    baseConfig,
  );

////////

export const mutateEnv = <T extends Linter.Config["env"]>(
  config: Linter.Config | Linter.ConfigOverride,
  cb: (v: Exclude<Linter.Config["env"], undefined>) => T,
): T => (config.env = cb(config.env ?? {}));

export const mutateExtends = <T extends Linter.Config["extends"]>(
  config: Linter.Config | Linter.ConfigOverride,
  cb: (v: Exclude<Linter.Config["extends"], undefined>) => T,
): T =>
  (config.extends = cb(
    config.extends === undefined
      ? []
      : typeof config.extends === "string"
      ? [config.extends]
      : config.extends,
  ));

export const mutateIgnorePatterns = <T extends Linter.Config["ignorePatterns"]>(
  config: Linter.Config,
  cb: (v: Exclude<Linter.Config["ignorePatterns"], undefined>) => T,
): T =>
  (config.ignorePatterns = cb(
    config.ignorePatterns === undefined
      ? []
      : typeof config.ignorePatterns === "string"
      ? [config.ignorePatterns]
      : config.ignorePatterns,
  ));

export const mutateOverrides = <T extends Linter.Config["overrides"]>(
  config: Linter.Config | Linter.ConfigOverride,
  cb: (v: Exclude<Linter.Config["overrides"], undefined>) => T,
): T => (config.overrides = cb(config.overrides ?? []));

export const mutateParserOptions = <T extends Linter.Config["parserOptions"]>(
  config: Linter.Config | Linter.ConfigOverride,
  cb: (v: Exclude<Linter.Config["parserOptions"], undefined>) => T,
): T => (config.parserOptions = cb(config.parserOptions ?? {}));

export const mutatePlugins = <T extends Linter.Config["plugins"]>(
  config: Linter.Config | Linter.ConfigOverride,
  cb: (v: Exclude<Linter.Config["plugins"], undefined>) => T,
): T => (config.plugins = cb(config.plugins ?? []));

export const mutateRules = <T extends Linter.Config["rules"]>(
  config: Linter.Config | Linter.ConfigOverride,
  cb: (v: Exclude<Linter.Config["rules"], undefined>) => T,
): T => (config.rules = cb(config.rules ?? {}));

export const mutateSettings = <T extends Linter.Config["settings"]>(
  config: Linter.Config | Linter.ConfigOverride,
  cb: (v: Exclude<Linter.Config["settings"], undefined>) => T,
): T => (config.settings = cb(config.settings ?? {}));

export const overrideFilesEqual = (
  left: Linter.ConfigOverride["files"],
  right: Linter.ConfigOverride["files"],
): boolean => {
  if (typeof left !== typeof right) {
    return false;
  }
  if (typeof left === "string") {
    return left === right;
  }
  if (left.length !== right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i += 1) {
    if (left[i] !== right[i]) {
      return false;
    }
  }

  return true;
};

/**
 * This will find (or create at index 0) and return an override matching `files`
 * Returns [targetOverride, created]
 * @param files the files pattern in the override to match
 * @param overrides a list of overrides
 */
export const targetOverride = (
  files: Linter.ConfigOverride["files"],
  overrides: Linter.ConfigOverride[],
): Readonly<[target: Linter.ConfigOverride, created: boolean]> => {
  let target: Linter.ConfigOverride = { files };
  let found = false;

  if (overrides !== undefined && overrides.length !== 0) {
    for (const override of overrides) {
      if (overrideFilesEqual(override.files, files)) {
        target = override;
        found = true;
        break;
      }
    }
  }

  if (!found) {
    overrides.unshift(target);
  }

  return [target, !found];
};
