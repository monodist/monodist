module.exports = {
  extends: ["./dist/index.js"],
  ignorePatterns: [".eslintrc.js"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
  },
};
