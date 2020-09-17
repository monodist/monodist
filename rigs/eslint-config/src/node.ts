import { base2 } from "./base2";
import { typedLinterConfig } from "./utils";

export = typedLinterConfig({
  ...base2,
  env: {
    ...base2.env,
    node: true,
  },
});
