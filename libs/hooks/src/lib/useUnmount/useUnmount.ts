import { useEffect } from 'react';
import useLatest from '../useLatest/useLatest';

/**
 * A hook that executes the function right before the component is unmounted.
 *
 * @example
 *
 * ```tsx
 * useUnmount(() => {
 *   console.info('I run before unmount');
 * });
 * ```
 */
export default function useUnmount(fn: () => void) {
  const ref = useLatest(fn);

  useEffect(
    () => () => {
      ref.current();
    },
    // cleanup effect should only be called ONCE
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
