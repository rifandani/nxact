/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a function with `data-first` and `data-last` signatures.
 * `purry` is a dynamic function and it's not type safe. It should be wrapped by a function that have proper typings.
 * Refer to the example below for correct usage.
 *
 * @example
 *
 * ```ts
 * function _findIndex(array, fn) {
 *   for (let i = 0; i < array.length; i++) {
 *     if (fn(array[i])) {
 *       return i;
 *     }
 *   }
 *   return -1;
 * }
 *
 * // data-first
 * function findIndex<T>(array: T[], fn: (item: T) => boolean): number;
 *
 * // data-last
 * function findIndex<T>(fn: (item: T) => boolean): (array: T[]) => number;
 *
 * function findIndex() {
 *   return R.purry(_findIndex, arguments);
 * }
 * ```
 */
export function purry(fn: any, args: IArguments | readonly any[], lazy?: any) {
  const diff = fn.length - args.length;
  const arrayArgs = Array.from(args);

  if (diff === 0) {
    return fn(...arrayArgs);
  }

  if (diff === 1) {
    const ret: any = (data: any) => fn(data, ...arrayArgs);

    if (lazy || fn.lazy) {
      ret.lazy = lazy || fn.lazy;
      ret.lazyArgs = args;
    }

    return ret;
  }

  throw new Error('Wrong number of arguments');
}

/**
 * Determines whether all predicates returns true for the input data.
 *
 * @param data The input data for predicates.
 * @param fns The list of predicates.
 * @example
 *
 * ```ts
 * const isDivisibleBy3 = (x: number) => x % 3 === 0
 * const isDivisibleBy4 = (x: number) => x % 4 === 0
 * const fns = [isDivisibleBy3, isDivisibleBy4]
 *
 * R.allPass(12, fns) // => true
 * R.allPass(8, fns) // => false
 * ```
 */
export function allPass<T>(
  data: T,
  fns: ReadonlyArray<(data: T) => boolean>
): boolean;

export function allPass(...args: any[]) {
  return purry(_allPass, args);
}

function _allPass(data: any, fns: Array<(data: any) => boolean>) {
  return fns.every((fn) => fn(data));
}

/**
 * Determines whether any predicate returns true for the input data.
 *
 * @param data The input data for predicates.
 * @param fns The list of predicates.
 * @example
 *
 * ```ts
 * const isDivisibleBy3 = (x: number) => x % 3 === 0
 * const isDivisibleBy4 = (x: number) => x % 4 === 0
 * const fns = [isDivisibleBy3, isDivisibleBy4]
 *
 * R.anyPass(8, fns) // => true
 * R.anyPass(11, fns) // => false
 * ```
 */
export function anyPass<T>(
  data: T,
  fns: ReadonlyArray<(data: T) => boolean>
): boolean;

export function anyPass(...args: any[]) {
  return purry(_anyPass, args);
}

function _anyPass(data: any, fns: Array<(data: any) => boolean>) {
  return fns.some((fn) => fn(data));
}

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.
 *
 * @param fn the function to wrap
 * @example
 *
 * ```ts
 * const initialize = R.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 * ```
 */
export function once<T>(fn: () => T): () => T {
  let called = false;
  let ret: T;

  return () => {
    if (!called) {
      ret = fn();
      called = true;
    }

    return ret;
  };
}
