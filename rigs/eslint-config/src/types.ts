import { Linter } from "eslint";

export type ConfigMutator = (config: Linter.Config) => void;
