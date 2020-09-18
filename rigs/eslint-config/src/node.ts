import {
  applyBase,
  applyComments,
  applyImport,
  applyJest,
  applyPrettier,
  applyPromise,
  applyTypeScript,
} from "./applicators";
import { applyAll } from "./utils";

export = applyAll(
  { env: { node: true } },
  applyBase,
  applyTypeScript,
  applyComments,
  applyImport,
  applyJest,
  applyPromise,
  applyPrettier,
);
