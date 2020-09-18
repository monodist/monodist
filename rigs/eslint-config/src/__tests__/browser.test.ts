import yaml from "yaml";

import browserConfig from "../browser";

describe("browserConfig", () => {
  it("should match snapshot", () => {
    expect(yaml.stringify(browserConfig)).toMatchSnapshot();
  });
});
