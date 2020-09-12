import { typedLinterConfig } from "../utils";

export const commentsConfig = typedLinterConfig({
  extends: ["plugin:eslint-comments/recommended"],
  overrides: [
    typedLinterConfig({
      files: ["*.generated.ts"],
      rules: {
        "eslint-comments/disable-enable-pair": "off",
        "eslint-comments/no-unlimited-disable": "off",
      },
    }),
  ],
});
