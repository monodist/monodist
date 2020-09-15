import { Linter } from "eslint";

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
