module.exports = {
  extends: ["./dist/node.js"],
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
  },
};
