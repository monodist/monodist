import { typedLinterConfig } from "../utils";

export const promiseConfig = typedLinterConfig({
  extends: ["plugin:promise/recommended"],

  plugins: ["promise"],
});
