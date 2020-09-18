module.exports = {
  coverageDirectory: "./coverage",
  globals: {
    "ts-jest": {
      packageJson: "package.json",
    },
  },
  preset: "ts-jest",
  reporters: ["jest-standard-reporter"],
  rootDir: "src",
  setupFiles: ["./__tests__/jest.setup.ts"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
};
