/* eslint-disable @typescript-eslint/no-explicit-any */

export const isSymbol = (value: any): value is symbol => {
  return !!value && value.constructor === Symbol;
};

/**
 * Determine if a value is an Array
 *
 * @example
 *
 * ```ts
 * isArray('hello') // => false
 * isArray(['hello']) // => true
 * ```
 */
export const isArray = (value: any): value is unknown[] => {
  return !!value && value.constructor === Array;
};

/**
 * Determine if a value is an Array
 *
 * @example
 *
 * ```ts

 * ```
 */
export const isObject = (value: any): value is object => {
  return !!value && value.constructor === Object;
};

/**
 * Checks if the given value is primitive.
 *
 * Primitive Types: number , string , boolean , symbol, bigint, undefined, null
 *
 * @param {*} value value to check
 * @returns {boolean} result
 */
export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  );
};

/**
 * Determine if a value is a function
 *
 * @example
 *
 * ```ts
 * isFunction('hello') // => false
 * isFunction(['hello']) // => false
 * isFunction(() => 'hello') // => true
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: any): value is Function => {
  return !!(value && value.constructor && value.call && value.apply);
};

export const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String;
};

/**
 * Determine if a value is an integer
 *
 * @example
 *
 * ```ts
 * isInt(12) // => true
 * isInt(12.233) // => false
 * isInt('hello') // => false
 * ```
 */
export const isInt = (value: any): value is number => {
  return isNumber(value) && value % 1 === 0;
};

/**
 * Determine if a value is a float
 *
 * @example
 *
 * ```ts
 * isFloat(12.233)  // => true
 * isFloat(12)      // => false
 * isFloat('hello') // => false
 * ```
 */
export const isFloat = (value: any): value is number => {
  return isNumber(value) && value % 1 !== 0;
};

export const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value;
  } catch {
    return false;
  }
};

/**
 * Determine if a value is a Date
 *
 * @example
 *
 * ```ts
 * isDate(new Date()) // => true
 * isDate(12)         // => false
 * isDate('hello')    // => false
 * ```
 */
export const isDate = (value: any): value is Date => {
  return Object.prototype.toString.call(value) === '[object Date]';
};

/**
 * Determine if a value is empty
 *
 * @example
 *
 * ```ts
 * isEmpty([]) // => true
 * isEmpty('') // => true
 *
 * isEmpty('hello')   // => false
 * isEmpty(['hello']) // => false
 * ```
 */
export const isEmpty = (value: any) => {
  if (value === true || value === false) return true;
  if (value === null || value === undefined) return true;
  if (isNumber(value)) return value === 0;
  if (isDate(value)) return isNaN(value.getTime());
  if (isFunction(value)) return false;
  if (isSymbol(value)) return false;

  const length = (value as any).length;
  if (isNumber(length)) return length === 0;

  const size = (value as any).size;
  if (isNumber(size)) return size === 0;

  const keys = Object.keys(value).length;
  return keys === 0;
};

/**
 * Determine if two values are equal
 *
 * @example
 *
 * ```ts
 * isEqual(null, null) // => true
 * isEqual([], [])     // => true
 *
 * isEqual('hello', 'world') // => false
 * isEqual(22, 'abc')        // => false
 * ```
 */
export const isEqual = <TType>(x: TType, y: TType): boolean => {
  if (Object.is(x, y)) return true;
  if (x instanceof Date && y instanceof Date)
    return x.getTime() === y.getTime();

  if (x instanceof RegExp && y instanceof RegExp)
    return x.toString() === y.toString();
  if (
    typeof x !== 'object' ||
    x === null ||
    typeof y !== 'object' ||
    y === null
  )
    return false;

  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[];
  const keysY = Reflect.ownKeys(y as unknown as object);

  if (keysX.length !== keysY.length) return false;

  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false;
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false;
  }

  return true;
};

/**
 * A function that checks if the passed parameter is a Promise and narrows its type accordingly
 *
 * @param data the variable to check
 * @example
 *
 * ```ts
 * isPromise(Promise.resolve(5)) // => true
 * isPromise(Promise.reject(5)) // => true
 * isPromise('somethingElse') // => false
 * ```
 */
export function isPromise<T, S>(data: Promise<T> | S): data is Promise<T> {
  return data instanceof Promise;
}
