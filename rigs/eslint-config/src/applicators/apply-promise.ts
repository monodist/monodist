import { applicator } from "../applicator";

export const applyPromise = applicator({
  extends: (_extends) => [..._extends, "plugin:promise/recommended"],
  plugins: (plugins) => [...plugins, "promise"],
});
