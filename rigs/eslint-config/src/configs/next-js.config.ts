import { applyAll } from "../applicator";
import {
  baseApplicator,
  commentsApplicator,
  importApplicator,
  jestApplicator,
  prettierApplicator,
  promiseApplicator,
  reactApplicator,
  typeScriptApplicator,
} from "../applicators";

export const nextJsConfig = applyAll(
  { env: { browser: true, node: true } },
  baseApplicator,
  typeScriptApplicator,
  commentsApplicator,
  importApplicator,
  jestApplicator,
  promiseApplicator,
  reactApplicator,
  prettierApplicator,
);
