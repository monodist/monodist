import { javaScriptExtensions, typeScriptExtensions } from "../constants";
import {
  makeGlobsWithExtension,
  typedLinterConfig,
  typedLinterConfigOverride,
} from "../utils";

const overrideGlobsWithoutExtension = ["*.generated"];

const makeCommentsConfigOverrides = (files: string[]) =>
  typedLinterConfigOverride({
    files,
    rules: {
      "eslint-comments/disable-enable-pair": "off",
      "eslint-comments/no-unlimited-disable": "off",
    },
  });

export const [
  javaScriptCommentsConfigOverrides,
  typeScriptCommentsConfigOverrides,
] = [javaScriptExtensions, typeScriptExtensions].map((extensions) =>
  makeCommentsConfigOverrides(
    makeGlobsWithExtension(overrideGlobsWithoutExtension, extensions),
  ),
);

export const commentsConfig = typedLinterConfig({
  extends: ["plugin:eslint-comments/recommended"],
  overrides: [javaScriptCommentsConfigOverrides],
});
