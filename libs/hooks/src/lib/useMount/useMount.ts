import { useEffect } from 'react';

/**
 * A hook that executes a function ONCE after the component is mounted.
 *
 * @example
 *
 * ```tsx
 * // if you ever do something like this
 * const [init, setInit] = useState(true);
 *
 * useEffect(() => {
 *   if (init) {
 *     someFunction();
 *     setInit(false);
 *   }
 * }, [init]);
 *
 * // or like this a lot of times
 * useEffect(() => {
 *   if(someState) {
 *     someFunction();
 *   }
 *   // eslint-disable-next-line react-hooks/exhaustive-deps
 * }, []);
 *
 * // maybe you should consider using `useMount` instead
 * useMount(() => {
 *   if(someState) {
 *     someFunction();
 *   }
 * });
 * ```
 */
export default function useMount(fn: () => void) {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
