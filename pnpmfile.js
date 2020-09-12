module.exports = {
  hooks: {
    readPackage,
  },
};

function readPackage(pkg, _context) {
  // `eslint` is in the top-level package.json
  if (
    [
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/experimental-utils",
      "@typescript-eslint/parser",
      "eslint-config-prettier",
      "eslint-plugin-eslint-comments",
      "eslint-plugin-import",
      "eslint-plugin-jest",
      "eslint-plugin-json-format",
      "eslint-plugin-jsx-a11y",
      "eslint-plugin-prettier",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
    ].includes(pkg.name)
  ) {
    pkg.peerDependenciesMeta = {
      ...pkg.peerDependenciesMeta,
      eslint: { optional: true },
    };
  }

  // `prettier` is in the top-level package.json
  if (["eslint-plugin-prettier"].includes(pkg.name)) {
    pkg.peerDependenciesMeta = {
      ...pkg.peerDependenciesMeta,
      prettier: { optional: true },
    };
  }

  // `typescript` is in the top-level package.json
  if (["tsutils"].includes(pkg.name)) {
    pkg.peerDependenciesMeta = {
      ...pkg.peerDependenciesMeta,
      typescript: { optional: true },
    };
  }

  return pkg;
}
