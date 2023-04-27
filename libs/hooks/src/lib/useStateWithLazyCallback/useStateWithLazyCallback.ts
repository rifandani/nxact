import { useCallback, useEffect, useRef, useState } from 'react';

export type LazyCallback<S> = (state: S) => void | undefined;
export type DispatchWithLazyCallback<A, S> = (
  value: A,
  callback: LazyCallback<S>
) => void;

/**
 * A Hook similar to `useState`, but with optional lazy callback function.
 * The lazy callback function will be called on the next render after it actually did `setState`.
 * The passed value to lazy callback function is always up to date with the `state`.
 *
 * @example
 *
 * ```tsx
 * const [count, setCount] = useStateWithLazyCallback(0);
 * const doubleCount = useRef(count * 2)
 *
 * const onClick = () => {
 *   setCount(count + 1, (_count) => {
 *     doubleCount.current = _count * 2 // => _count === 1
 *   })
 * }
 *
 * return (
 *   <div>
 *     <p>count: {count}</p>
 *     <button onClick={onClick}>increment with side effect</button>
 *   </div>
 * );
 * ```
 */
export function useStateWithLazyCallback<S>(initialValue: S) {
  const callbackRef = useRef<LazyCallback<S>>();
  // the actual state
  const [state, setState] = useState<S>(initialValue);

  // state setter with lazy callback
  const setValueWithCallback = useCallback(
    (newValue: S, callback: LazyCallback<S>) => {
      // store the lazy callback function in ref
      callbackRef.current = callback;
      // set the actual state to trigger rerender
      setState(newValue);
    },
    []
  );

  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      // call the callback function after the rerender happens
      callbackRef.current(state);
      // set it back to `undefined`
      callbackRef.current = undefined;
    }
  }, [state]);

  return [state, setValueWithCallback] as const;
}
