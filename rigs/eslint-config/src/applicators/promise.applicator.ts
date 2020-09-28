import { applicator } from "../applicator";

export const promiseApplicator = applicator({
  extends: (_extends) => [..._extends, "plugin:promise/recommended"],
  plugins: (plugins) => [...plugins, "promise"],
});
