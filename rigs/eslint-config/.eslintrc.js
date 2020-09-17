module.exports = {
  extends: ["./dist/node.js"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
      rules: {
        "@typescript-eslint/naming-convention": "off",
      },
    },
  ],
};
