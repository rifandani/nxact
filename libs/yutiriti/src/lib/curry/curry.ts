/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DebounceFunction,
  Func,
  ThrottledFunction,
} from '../../types/common.type';

type Cache<T> = Record<string, { exp: number | null; value: T }>;

const memoize = <T>(
  cache: Cache<T>,
  func: Func<any, T>,
  keyFunc: Func<string> | null,
  ttl: number | null
) => {
  return function callWithMemo(...args: any): T {
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args });
    const existing = cache[key];

    if (existing !== undefined) {
      if (!existing.exp) return existing.value;
      if (existing.exp > new Date().getTime()) {
        return existing.value;
      }
    }

    const result = func(...args);

    cache[key] = {
      exp: ttl ? new Date().getTime() + ttl : null,
      value: result,
    };

    return result;
  };
};

/**
 * Chaining functions will cause them to execute one after another,
 * passing the output from each function as the input to the next,
 * returning the final output at the end of the chain.
 *
 * @example
 *
 * ```ts
 * const genesis = () => 0
 * const addFive = (num: number) => num + 5
 * const twoX = (num: number) => num * 2
 *
 * const chained = chain(genesis, addFive, twoX)
 *
 * chained() // => 10
 * ```
 */
export const chain =
  (...funcs: Func[]) =>
  (...args: any[]) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args));
  };

/**
 * In a composition of functions,
 * each function is given the next function as an argument and must call it to continue executing.
 *
 * @example
 *
 * ```ts
 * const useZero = (fn: any) => () => fn(0)
 * const objectize = (fn: any) => (num: any) => fn({ num })
 * const increment = (fn: any) => ({ num }: any) => fn({ num: num + 1 })
 * const returnArg = (arg: any) => (args: any) => args[arg]
 *
 * const composed = compose(
 *   useZero,
 *   objectize,
 *   increment,
 *   increment,
 *   returnArg('num')
 * )
 *
 * composed() // => 2
 * ```
 *
 * This can be a little jarring if you haven’t seen it before.
 * Here’s a broken down composition. It’s equivelent to the code above.
 *
 * ```ts
 * const decomposed = (
 *   useZero(
 *     objectize(
 *       increment(
 *         increment(
 *           returnArg('num')))))
 * )
 *
 * decomposed() // => 2
 * ```
 */
export const compose = (...funcs: Func[]) => {
  return funcs.reverse().reduce((acc, fn) => fn(acc));
};

/**
 * Create a partial function by providing some — or all — of the arguments the given function needs.
 *
 * @example
 *
 * ```ts
 * const add = (a: number, b: number) => a + b
 *
 * const addFive = partial(add, 5)
 *
 * addFive(2) // => 7
 * ```
 */
export const partial = (fn: Func, ...args: any[]) => {
  return (...rest: any[]) => fn(...args, ...rest);
};

/**
 * Like partial but for unary functions that accept
 * a single object argument
 *
 * @example
 *
 * ```ts
 * const add = (props: { a: number; b: number }) => props.a + props.b
 *
 * const addFive = partob(add, { a: 5 })
 *
 * addFive({ b: 2 }) // => 7
 * ```
 */
export const partob = <T, K, PartialArgs extends Partial<T>>(
  fn: (args: T) => K,
  argobj: PartialArgs
) => {
  return (restobj: Omit<T, keyof PartialArgs>): K =>
    fn({
      ...(argobj as Partial<T>),
      ...(restobj as Partial<T>),
    } as T);
};

/**
 * Creates a Proxy object that will dynamically
 * call the handler argument when attributes are
 * accessed
 *
 * @example
 *
 * ```ts
 * type Property = 'name' | 'size' | 'getLocation'
 *
 * const person = proxied((prop: Property) => {
 *   switch (prop) {
 *     case 'name':
 *       return 'Joe'
 *     case 'size':
 *       return 20
 *     case 'getLocation'
 *       return () => 'here'
 *   }
 * })
 *
 * person.name // => Joe
 * person.size // => 20
 * person.getLocation() // => here
 * ```
 */
export const proxied = <T, K>(
  handler: (propertyName: T) => K
): Record<string, K> => {
  return new Proxy(
    {},
    {
      get: (target, propertyName: any) => handler(propertyName),
    }
  );
};

/**
 * Creates a memoized function. The returned function
 * will only execute the source function when no value
 * has previously been computed. If a ttl (milliseconds)
 * is given previously computed values will be checked
 * for expiration before being returned.
 *
 * @example
 *
 * ```ts
 * const timestamp = memo(() => Date.now())
 *
 * const now = timestamp()
 * const later = timestamp()
 *
 * now === later // => true
 * ```
 *
 * You can optionally pass a ttl (time to live) that will expire memoized results.
 *
 * ```ts
 * const timestamp = memo(() => Date.now(), {
 *   ttl: 1000 // milliseconds
 * })
 *
 * const now = timestamp()
 * const later = timestamp()
 *
 * await sleep(2000)
 *
 * const muchLater = timestamp()
 *
 * now === later // => true
 * now === muchLater // => false
 * ```
 *
 * You can optionally customize how values are stored when memoized.
 *
 * ```ts
 * const timestamp = memo(({ group }: { group: string }) => {
 *   const ts = Date.now()
 *   return `${ts}::${group}`
 * }, {
 *   key: ({ group }: { group: string }) => group
 * })
 *
 * const now = timestamp({ group: 'alpha' })
 * const later = timestamp({ group: 'alpha' })
 * const beta = timestamp({ group: 'beta' })
 *
 * now === later // => true
 * beta === now // => false
 * ```
 */
export const memo = <TFunc extends Function>(
  func: TFunc,
  options: {
    key?: Func<any, string>;
    ttl?: number;
  } = {}
) => {
  return memoize(
    {},
    func as any,
    options.key ?? null,
    options.ttl ?? null
  ) as any as TFunc;
};

/**
 * Given a delay and a function returns a new function
 * that will only call the source function after delay
 * milliseconds have passed without any invocations.
 *
 * The debounce function comes with a `cancel` method
 * to cancel delayed `func` invocations and a `flush`
 * method to invoke them immediately
 *
 * has a `isPending` method that when called will return if there is any pending invocation the source function.
 *
 * @example
 *
 * ```ts
 * const makeSearchRequest = (event) => {
 *   api.movies.search(event.target.value)
 * }
 * const debounced = debounce({ delay: 100 }, makeSearchRequest)
 *
 * input.addEventListener('change', debounced)
 *
 * // ... sometime later
 * debounced.cancel() // will permanently stop the source function from being debounced.
 * debounced.flush(event) // will directly invoke the source function.
 * debounced.isPending()
 * ```
 */
export const debounce = <TArgs extends any[]>(
  { delay }: { delay: number },
  func: (...args: TArgs) => any
) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  let active = true;

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    if (active) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        active && func(...args);
        timer = undefined;
      }, delay);
    } else {
      func(...args);
    }
  };

  debounced.isPending = () => {
    return timer !== undefined;
  };
  debounced.cancel = () => {
    active = false;
  };
  debounced.flush = (...args: TArgs) => func(...args);

  return debounced;
};

/**
 * Given an interval and a function returns a new function
 * that will only call the source function if interval milliseconds
 * have passed since the last invocation
 *
 * @example
 *
 * ```ts
 * const onMouseMove = () => {
 *   rerender()
 * }
 *
 * addEventListener('mousemove', throttle({ interval: 200 }, onMouseMove))
 * ```
 */
export const throttle = <TArgs extends any[]>(
  { interval }: { interval: number },
  func: (...args: TArgs) => any
) => {
  let ready = true;
  let timer: NodeJS.Timeout | undefined = undefined;

  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    if (!ready) return;

    func(...args);

    ready = false;

    timer = setTimeout(() => {
      ready = true;
      timer = undefined;
    }, interval);
  };

  throttled.isThrottled = () => {
    return timer !== undefined;
  };

  return throttled;
};

/**
 * Make an object callable. Given an object and a function
 * the returned object will be a function with all the
 * objects properties.
 *
 * @example
 * ```ts
 * const car = callable({
 *   wheels: 2
 * }, self => () => {
 *   return 'driving'
 * })
 *
 * car.wheels // => 2
 * car() // => 'driving'
 * ```
 */
export const callable = <
  TValue,
  TObj extends Record<string | number | symbol, TValue>,
  TFunc extends Function
>(
  obj: TObj,
  fn: (self: TObj) => TFunc
): TObj & TFunc => {
  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const FUNC = () => {};

  return new Proxy(Object.assign(FUNC, obj), {
    get: (target, key: string) => target[key],
    set: (target, key: string, value: any) => {
      (target as any)[key] = value;
      return true;
    },
    apply: (target, self, args) => fn(Object.assign({}, target))(...args),
  }) as unknown as TObj & TFunc;
};
