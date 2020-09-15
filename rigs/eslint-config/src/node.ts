import { base } from "./base";
import { typedLinterConfig } from "./utils";

export = typedLinterConfig({
  ...base,
  env: {
    ...base.env,
    node: true,
  },
});
