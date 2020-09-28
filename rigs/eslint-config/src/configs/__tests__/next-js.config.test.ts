import yaml from "yaml";

import { nextJsConfig } from "../next-js.config";

describe("nextJsConfig", () => {
  it("should match snapshot", () => {
    expect(yaml.stringify(nextJsConfig)).toMatchSnapshot();
  });
});
