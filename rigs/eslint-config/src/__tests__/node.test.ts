import yaml from "yaml";

import nodeConfig from "../node";

describe("nodeConfig", () => {
  it("should match snapshot", () => {
    expect(yaml.stringify(nodeConfig)).toMatchSnapshot();
  });
});
