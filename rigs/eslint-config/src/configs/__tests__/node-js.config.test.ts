import yaml from "yaml";

import { nodeJsConfig } from "../node-js.config";

describe("nodeJsConfig", () => {
  it("should match snapshot", () => {
    expect(yaml.stringify(nodeJsConfig)).toMatchSnapshot();
  });
});
