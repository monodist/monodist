import { wrapString } from "@monodist/lib-a";

/**
 * Wraps a text
 * @param s the text that will be wrapped
 * @param wrap the characters that will wrap the text
 */
export const rewrapString = (s: string, wrap = "^"): string =>
  `${wrap}${wrapString(s)}${wrap}`;
