import { useRef } from 'react';

/**
 * A Hook that returns the latest value, effectively avoiding the closure problem.
 *
 * @example
 *
 * ```tsx
 * const [count, setCount] = useState(0);
 * const latestCountRef = useLatest(count);
 *
 * useEffect(() => {
 *   const interval = setInterval(() => {
 *     setCount(latestCountRef.current + 1);
 *   }, 1000);
 *
 *   return () => clearInterval(interval);
 * }, []);
 *
 * return (
 *   <div>
 *     <p>count: {count}</p>
 *   </div>
 * );
 * ```
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}
