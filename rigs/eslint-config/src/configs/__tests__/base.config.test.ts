import yaml from "yaml";

import { baseConfig } from "../base.config";

describe("baseConfig", () => {
  it("should match snapshot", () => {
    expect(yaml.stringify(baseConfig)).toMatchSnapshot();
  });
});
