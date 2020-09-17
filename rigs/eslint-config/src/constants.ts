export const javaScriptExtension = ".js";
export const typeScriptExtension = ".ts";
export const javaScriptReactExtension = ".jsx";
export const typeScriptReactExtension = ".tsx";

export const javaScriptExtensions = [
  javaScriptExtension,
  javaScriptReactExtension,
];
export const typeScriptExtensions = [
  typeScriptExtension,
  typeScriptReactExtension,
];

export const javaScriptOverrideFiles = javaScriptExtensions.map(
  (ext) => `*${ext}`,
);
export const typeScriptOverrideFiles = typeScriptExtensions.map(
  (ext) => `*${ext}`,
);
