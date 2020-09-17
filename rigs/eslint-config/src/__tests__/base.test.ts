import { Linter } from "eslint";
import yaml from "yaml";

import { base } from "../base";
import { base2 } from "../base2";
import {
  commentsConfig,
  commentsConfigMutator,
} from "../rules/comments-config";
import { importConfig, importConfigMutator } from "../rules/import-config";
import {
  javaScriptConfig,
  javaScriptConfigMutator,
} from "../rules/javascript-config";
import { jestConfig, jestConfigMutator } from "../rules/jest-config";
import {
  prettierConfig,
  prettierConfigMutator,
} from "../rules/prettier-config";
import { promiseConfig, promiseConfigMutator } from "../rules/promise-config";
import { reactConfig, reactConfigMutator } from "../rules/react-config";
import {
  typeScriptConfig,
  typeScriptConfigMutator,
} from "../rules/typescript-config";
import { ConfigMutator } from "../types";
import { mergeConfig } from "../utils";

// describe("base", () => {
//   it("should match snapshot", () => {
//     expect(yaml.stringify(base)).toMatchSnapshot();
//   });
// });

describe("base2", () => {
  it("should match snapshot", () => {
    expect(yaml.stringify(base2)).toMatchSnapshot();
  });
});

// it("should have settings", () => {
//   expect((base.overrides[1] as any).settings).toEqual(
//     (base2.overrides[2] as any).settings,
//   );
// });

describe("compat", () => {
  new Map<string, [Linter.Config, ConfigMutator]>([
    ["comments", [commentsConfig, commentsConfigMutator]],
    ["import", [importConfig, importConfigMutator]],
    ["javaScript", [javaScriptConfig, javaScriptConfigMutator]],
    ["jest", [jestConfig, jestConfigMutator]],
    ["prettier", [prettierConfig, prettierConfigMutator]],
    ["promise", [promiseConfig, promiseConfigMutator]],
    ["react", [reactConfig, reactConfigMutator]],
    // ["typeScript", [typeScriptConfig, typeScriptConfigMutator]],
  ]).forEach(([config, mutator], desc) =>
    it(`should match former for ${desc}`, () => {
      expect(config).toEqual(mergeConfig({}, mutator));
    }),
  );

  // it("should match base", () => {
  //   const config = mergeConfigs(base);
  //   expect(config).toEqual(base);
  // });
});
