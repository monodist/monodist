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

export const browserConfig = applyAll(
  { env: { browser: true } },
  baseApplicator,
  typeScriptApplicator,
  commentsApplicator,
  importApplicator,
  jestApplicator,
  promiseApplicator,
  reactApplicator,
  prettierApplicator,
);
