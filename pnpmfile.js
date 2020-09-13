module.exports = {
  hooks: {
    readPackage,
  },
};

const peerDependencyMetaOverrides = new Map([
  // eslint is a root dependency
  [
    "eslint",
    new Set([
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
    ]),
  ],
  // prettier is a root dependency
  ["prettier", new Set(["eslint-plugin-prettier"])],
  // typescript is a root dependency
  ["typescript", new Set(["tsutils"])],
]);

function readPackage(pkg, _context) {
  peerDependencyMetaOverrides.forEach((dependingPackages, dependsOn) => {
    if (dependingPackages.has(pkg.name))
      pkg.peerDependenciesMeta = {
        ...pkg.peerDependenciesMeta,
        [dependsOn]: { optional: true },
      };
  });

  return pkg;
}
