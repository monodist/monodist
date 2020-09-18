import { applyAll } from "./applicator";
import {
  applyBase,
  applyComments,
  applyImport,
  applyJest,
  applyPrettier,
  applyPromise,
  applyTypeScript,
} from "./applicators";

export default applyAll(
  { env: { node: true } },
  applyBase,
  applyTypeScript,
  applyComments,
  applyImport,
  applyJest,
  applyPromise,
  applyPrettier,
);
