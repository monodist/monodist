import { typedLinterConfig } from "../utils";

export const jsonFormatConfig = typedLinterConfig({
  ignorePatterns: ["**/*.json", "!package.json"],
  plugins: ["json-format"],
});
