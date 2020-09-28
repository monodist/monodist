import { applyAll } from "../applicator";
import {
  baseApplicator,
  commentsApplicator,
  importApplicator,
  jestApplicator,
  prettierApplicator,
  promiseApplicator,
  typeScriptApplicator,
} from "../applicators";

export const nodeJsConfig = applyAll(
  { env: { node: true } },
  baseApplicator,
  typeScriptApplicator,
  commentsApplicator,
  importApplicator,
  jestApplicator,
  promiseApplicator,
  prettierApplicator,
);
