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

export const baseConfig = applyAll(
  {},
  baseApplicator,
  typeScriptApplicator,
  commentsApplicator,
  importApplicator,
  jestApplicator,
  promiseApplicator,
  prettierApplicator,
);
