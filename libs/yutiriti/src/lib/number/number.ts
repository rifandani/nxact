/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Convert a value to a float if possible
 *
 * @example
 *
 * ```ts
 * toFloat(0) // => 0.0
 * toFloat(null) // => 0.0
 * toFloat(null, 3.33) // => 3.33
 * ```
 */
export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0.0 : defaultValue;

  if (value === null || value === undefined) {
    return def;
  }

  const result = parseFloat(value);

  return isNaN(result) ? def : result;
};

/**
 * Convert a value to an int if possible
 *
 * @example
 *
 * ```ts
 * toInt(0) // => 0
 * toInt(null) // => 0
 * toInt(null, 3) // => 3
 * ```
 */
export const toInt = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0 : defaultValue;

  if (value === null || value === undefined) {
    return def;
  }

  const result = parseInt(value);

  return isNaN(result) ? def : result;
};
