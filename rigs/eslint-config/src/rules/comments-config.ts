import {
  javaScriptExtensions,
  typeScriptExtensions,
  typeScriptOverrideFiles,
} from "../constants";
import { ConfigMutator } from "../types";
import {
  makeGlobsWithExtension,
  mutateExtends,
  mutateOverrides,
  mutateRules,
  targetOverride,
  typedLinterConfig,
  typedLinterConfigOverride,
} from "../utils";

const overrideGlobsWithoutExtension = ["*.generated"];
const [javaScriptGeneratedFiles, typeScriptGeneratedFiles] = [
  javaScriptExtensions,
  typeScriptExtensions,
].map((languageExtensions) =>
  makeGlobsWithExtension(overrideGlobsWithoutExtension, languageExtensions),
);

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
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      overrides: [typeScriptCommentsConfigOverrides],
    },
    javaScriptCommentsConfigOverrides,
  ],
});

export const commentsConfigMutator: ConfigMutator = (config) => {
  mutateExtends(config, (v) => [...v, "plugin:eslint-comments/recommended"]);
  mutateOverrides(config, (v) => {
    const [typeScriptOverride] = targetOverride(typeScriptOverrideFiles, v);

    mutateOverrides(typeScriptOverride, (w) => {
      const [typeScriptGeneratedOverride] = targetOverride(
        typeScriptGeneratedFiles,
        w,
      );
      mutateRules(typeScriptGeneratedOverride, (rules) => ({
        ...rules,
        "eslint-comments/disable-enable-pair": "off",
        "eslint-comments/no-unlimited-disable": "off",
      }));
      return w;
    });

    return [
      ...v,
      {
        files: javaScriptGeneratedFiles,
        rules: {
          "eslint-comments/disable-enable-pair": "off",
          "eslint-comments/no-unlimited-disable": "off",
        },
      },
    ];
  });
};
