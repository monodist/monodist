import { Linter } from "eslint";

export const makeGlobsWithExtension = (
  globsWithoutExtension: string[],
  extensions: string[],
): string[] =>
  globsWithoutExtension.flatMap((globWithoutExtension) =>
    extensions.map((extension) => `${globWithoutExtension}${extension}`),
  );

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

  const [sortedLeft, sortedRight] = ([left, right] as string[][]).map((arr) =>
    arr.sort((a, b) => a.localeCompare(b)),
  );

  for (let i = 0; i < sortedLeft.length; i += 1) {
    if (sortedLeft[i] !== sortedRight[i]) {
      return false;
    }
  }

  return true;
};

export const toList = <T>(v: undefined | null | T | T[]): T[] =>
  v === null || v === undefined ? [] : v instanceof Array ? v : [v];

export const isConfig = (
  v: Linter.Config | Linter.ConfigOverride,
): v is Linter.Config => (v as Linter.ConfigOverride).files === undefined;
