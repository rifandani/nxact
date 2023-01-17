import { useMemo, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends Noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

/**
 * Hooks for persistent functions. In theory, `useMemoizedFn` can be used instead of useCallback.
 * In some scenarios, we need to use useCallback to cache a function, but when the second parameter deps changes, the function will be regenerated, causing the function reference to change.
 * Using `useMemoizedFn`, you can omit the second parameter deps, and ensure that the function reference never change.
 *
 * @example
 *
 * ```tsx
 * // When the state changes, the func reference will change
 * const func = useCallback(() => {
 *   console.log(state);
 * }, [state]);
 *
 * // func reference never change
 * const func = useMemoizedFn(() => {
 *   console.log(state);
 * });
 * ```
 */
export default function useMemoizedFn<T extends Noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();

  if (!memoizedFn.current) {
    memoizedFn.current = function newMemoizedFn(this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  // `fn` the reference address never changes
  return memoizedFn.current as T;
}
