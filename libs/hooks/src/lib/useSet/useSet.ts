import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn/useMemoizedFn';

/**
 * A hook that can manage the state of `Set`.
 *
 * @example
 *
 * ```tsx
 *  const [set, { add, remove, reset }] = useSet(['Hello']);
 *
 *  return (
 *    <div>
 *      <button onClick={() => add(String(Date.now()))}>
 *        Add Timestamp
 *      </button>
 *      <button
 *        onClick={() => remove('Hello')}
 *        disabled={!set.has('Hello')}
 *      >
 *        Remove Hello
 *      </button>
 *      <button onClick={() => reset()}>
 *        Reset
 *      </button>
 *
 *      <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
 *    </div>
 *  );
 * ```
 */
export default function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () =>
    initialValue === undefined ? new Set<K>() : new Set(initialValue);

  // Set object
  const [set, setSet] = useState<Set<K>>(() => getInitValue());

  // Add item
  const add = (key: K) => {
    if (set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  };

  // Remove item
  const remove = (key: K) => {
    if (!set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.delete(key);
      return temp;
    });
  };

  // Reset to default
  const reset = () => setSet(getInitValue());

  return [
    set,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}
