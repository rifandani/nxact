import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn/useMemoizedFn';

/**
 * A hook that can manage the state of `Map`.
 *
 * @example
 *
 * ```tsx
 * const [map, { set, setAll, remove, reset, get }] = useMap<string | number, string>([
 *   ['msg', 'hello world'],
 *   [123, 'number type'],
 * ]);
 *
 * return (
 *   <div>
 *     <button onClick={() => set(String(Date.now()), new Date().toJSON())}>
 *       Add
 *     </button>
 *     <button onClick={() => setAll([['text', 'this is a new Map']])}>
 *       Set new Map
 *     </button>
 *     <button onClick={() => remove('msg')} disabled={!get('msg')}>
 *       Remove 'msg'
 *     </button>
 *     <button onClick={() => reset()}>
 *       Reset
 *     </button>
 *
 *     <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
 *   </div>
 * );
 * ```
 */
export default function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const getInitValue = () =>
    initialValue === undefined ? new Map() : new Map(initialValue);

  // Map object
  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  // Add item
  const set = (key: K, entry: T) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  };

  // Set a new Map
  const setAll = (newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  };

  // Remove key
  const remove = (key: K) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  };

  // Reset to default
  const reset = () => setMap(getInitValue());

  // Get item
  const get = (key: K) => map.get(key);

  return [
    map,
    {
      set: useMemoizedFn(set),
      setAll: useMemoizedFn(setAll),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
      get: useMemoizedFn(get),
    },
  ] as const;
}
