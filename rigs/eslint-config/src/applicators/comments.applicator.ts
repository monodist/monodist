import { applicator, applyToOverride } from "../applicator";
import {
  javaScriptExtensions,
  javaScriptOverrideFiles,
  typeScriptExtensions,
  typeScriptOverrideFiles,
} from "../constants";
import { makeGlobsWithExtension } from "../utils";

const overrideGlobsWithoutExtension = ["*.generated"];
const [javaScriptGeneratedFiles, typeScriptGeneratedFiles] = [
  javaScriptExtensions,
  typeScriptExtensions,
].map((languageExtensions) =>
  makeGlobsWithExtension(overrideGlobsWithoutExtension, languageExtensions),
);

export const commentsApplicator = applicator({
  extends: (_extends) => [..._extends, "plugin:eslint-comments/recommended"],
  overrides: (overrides) => {
    applyToOverride(
      overrides,
      javaScriptOverrideFiles,
      applicator({
        overrides: (overrideJsOverrides) => {
          applyToOverride(
            overrideJsOverrides,
            javaScriptGeneratedFiles,
            applicator({
              rules: (rules) => ({
                ...rules,
                "eslint-comments/disable-enable-pair": "off",
                "eslint-comments/no-unlimited-disable": "off",
              }),
            }),
          );
          return overrideJsOverrides;
        },
      }),
    );

    applyToOverride(
      overrides,
      typeScriptOverrideFiles,
      applicator({
        overrides: (overrideTsOverrides) => {
          applyToOverride(
            overrideTsOverrides,
            typeScriptGeneratedFiles,
            applicator({
              rules: (x) => ({
                ...x,
                "eslint-comments/disable-enable-pair": "off",
                "eslint-comments/no-unlimited-disable": "off",
              }),
            }),
          );
          return overrideTsOverrides;
        },
      }),
    );

    return overrides;
  },
});
