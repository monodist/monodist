import { typedLinterConfig } from "../utils";

export const prettierConfig = typedLinterConfig({
  extends: ["prettier", "prettier/@typescript-eslint"],

  plugins: ["prettier"],

  rules: {
    "prettier/prettier": ["error"],
  },
});
