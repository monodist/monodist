/**
 * Wraps a text
 * @param s the text that will be wrapped
 * @param wrap the characters that will wrap the text
 */
export const wrapString = (s: string, wrap = "$"): string =>
  `${wrap}${s}${wrap}`;
