import { applyAll } from "./applicator";
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

export default applyAll(
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
