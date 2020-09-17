import { overrideFilesEqual } from "../utils";

describe("overrideFilesEqual", () => {
  it("should be true on same string", () => {
    const files = "*.ts";
    expect(overrideFilesEqual(files, files)).toBeTruthy();
  });

  it("should be false on different string", () => {
    const left = "*.ts";
    const right = "*.js";
    expect(overrideFilesEqual(left, right)).toBeFalsy();
  });

  it("should be true on same array", () => {
    const left = ["*.ts", "*.tsx"];
    const right = [...left];
    expect(overrideFilesEqual(left, right)).toBeTruthy();
  });

  it("should be false on different array", () => {
    const left = ["*.ts", "*.tsx"];
    const right = ["*.js", "*.jsx"];
    expect(overrideFilesEqual(left, right)).toBeFalsy();
  });
});
