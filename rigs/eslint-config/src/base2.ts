import { commentsConfigMutator } from "./rules/comments-config";
import { importConfigMutator } from "./rules/import-config";
import { javaScriptConfigMutator } from "./rules/javascript-config";
import { jestConfigMutator } from "./rules/jest-config";
import { prettierConfigMutator } from "./rules/prettier-config";
import { promiseConfigMutator } from "./rules/promise-config";
import { reactConfigMutator } from "./rules/react-config";
import { typeScriptConfigMutator } from "./rules/typescript-config";
import { mergeConfigs } from "./utils";

export const base2 = mergeConfigs(
  {
    // todo: eslint doesn't have a config for es2019... so this is slightly
    // over-optimistic until Node v14 is LTS and we begin using ES2020.
    env: { es2020: true },
  },
  [
    javaScriptConfigMutator,
    typeScriptConfigMutator,
    commentsConfigMutator,
    importConfigMutator,
    jestConfigMutator,
    promiseConfigMutator,
    reactConfigMutator,
    prettierConfigMutator,
  ],
);
