import { baseConfigMutator } from "./rules/base-config";
import { commentsConfigMutator } from "./rules/comments-config";
import { importConfigMutator } from "./rules/import-config";
import { jestConfigMutator } from "./rules/jest-config";
import { prettierConfigMutator } from "./rules/prettier-config";
import { promiseConfigMutator } from "./rules/promise-config";
import { typeScriptConfigMutator } from "./rules/typescript-config";
import { applyAll } from "./utils";

export = applyAll(
  { env: { node: true } },
  baseConfigMutator,
  typeScriptConfigMutator,
  commentsConfigMutator,
  importConfigMutator,
  jestConfigMutator,
  promiseConfigMutator,
  prettierConfigMutator,
);
