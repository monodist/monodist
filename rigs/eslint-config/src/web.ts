import { base2 } from "./base2";

export = {
  ...base2,
  env: {
    ...base2.env,
    browser: true,
  },
};
