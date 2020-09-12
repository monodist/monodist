import { Linter } from "eslint";

export const typedLinterConfig = <P extends Linter.Config>(p: P): P => p;
