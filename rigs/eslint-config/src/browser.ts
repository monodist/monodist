import {
  applyBase,
  applyComments,
  applyImport,
  applyJest,
  applyPrettier,
  applyPromise,
  applyReact,
  applyTypeScript,
} from "./applicators";
import { applyAll } from "./utils";

export = applyAll(
  { env: { browser: true } },
  applyBase,
  applyTypeScript,
  applyComments,
  applyImport,
  applyJest,
  applyPromise,
  applyReact,
  applyPrettier,
);
