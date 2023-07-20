/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DebounceFunction } from '../../types/common.type';
import * as _async from '../async/async';
import * as _ from './curry';

describe('curry module', () => {
  describe('compose function', () => {
    test('composes functions', () => {
      const useZero = (fn: any) => () => fn(0);
      const objectize = (fn: any) => (num: any) => fn({ num });
      const increment =
        (fn: any) =>
        ({ num }: any) =>
          fn({ num: num + 1 });
      const returnArg = (arg: any) => (args: any) => args[arg];

      const composed = _.compose(
        useZero,
        objectize,
        increment,
        increment,
        returnArg('num')
      );

      const decomposed = useZero(
        objectize(increment(increment(returnArg('num'))))
      );

      const expected = decomposed();
      const result = composed();

      expect(result).toEqual(expected);
    });
    test('composes async function', async () => {
      const useZero = (fn: any) => async () => await fn(0);
      const objectize = (fn: any) => async (num: any) => await fn({ num });
      const increment =
        (fn: any) =>
        async ({ num }: any) =>
          await fn({ num: num + 1 });
      const returnArg = (arg: any) => async (args: any) => await args[arg];

      const composed = _.compose(
        useZero,
        objectize,
        increment,
        increment,
        returnArg('num')
      );

      const decomposed = useZero(
        objectize(increment(increment(returnArg('num'))))
      );

      const expected = await decomposed();
      const result = await composed();

      expect(result).toEqual(expected);
    });
  });

  describe('partial function', () => {
    test('passes single args', () => {
      const add = (a: number, b: number) => a + b;
      const expected = 20;
      const result = _.partial(add, 10)(10);
      expect(result).toEqual(expected);
    });
    test('passes many args', () => {
      const add = (...nums: number[]) => nums.reduce((a, b) => a + b, 0);
      const expected = 10;
      const result = _.partial(add, 2, 2, 2)(2, 2);
      expect(result).toEqual(expected);
    });
  });

  describe('partob function', () => {
    test('partob passes single args', () => {
      const add = ({ a, b }: { a: number; b: number }) => a + b;
      const expected = 20;
      const result = _.partob(add, { a: 10 })({ b: 10 });
      expect(result).toEqual(expected);
    });
    test('partob overrides inital with later', () => {
      const add = ({ a, b }: { a: number; b: number }) => a + b;
      const expected = 15;
      const result = _.partob(add, { a: 10 })({ a: 5, b: 10 } as any);
      expect(result).toEqual(expected);
    });
  });

  describe('chain function', () => {
    test('calls all given functions', () => {
      const genesis = () => 0;
      const addFive = (num: number) => num + 5;
      const twoX = (num: number) => num * 2;
      const func = _.chain(genesis, addFive, twoX);
      const result = func();
      expect(result).toEqual(10);
    });
  });

  describe('proxied function', () => {
    test('returns proxy that calls callback function', () => {
      const handler = (propertyName: string) => {
        if (propertyName === 'x') return 2;
        if (propertyName === 'getName') return () => 'radash';
        return undefined;
      };
      const proxy = _.proxied(handler) as any;
      expect(proxy.x).toEqual(2);
      expect(proxy.getName()).toEqual('radash');
      expect(proxy.nil).not.toBeDefined();
    });
  });

  describe('memo function', () => {
    test('only executes function once', () => {
      const func = _.memo(() => new Date().getTime());
      const resultA = func();
      const resultB = func();
      expect(resultA).toEqual(resultB);
    });
    test('uses key to identify unique calls', () => {
      const func = _.memo(
        ({ id }: { id: string }) => {
          const ts = new Date().getTime();
          return `${ts}::${id}`;
        },
        {
          key: ({ id }: { id: string }) => id,
        }
      );
      const resultA = func({ id: 'alpha' });
      const resultB = func({ id: 'beta' });
      const resultA2 = func({ id: 'alpha' });
      expect(resultA).toEqual(resultA2);
      expect(resultB).not.toEqual(resultA);
    });
    test('calls function again when first value expires', async () => {
      const func = _.memo(() => new Date().getTime(), {
        ttl: 1,
      });
      const resultA = func();
      await new Promise((res) => setTimeout(res, 100));
      const resultB = func();
      expect(resultA).not.toEqual(resultB);
    });
    test('does not call function again when first value has not expired', async () => {
      const func = _.memo(() => new Date().getTime(), {
        ttl: 1000,
      });
      const resultA = func();
      await new Promise((res) => setTimeout(res, 100));
      const resultB = func();
      expect(resultA).toEqual(resultB);
    });
  });

  describe('debounce function', () => {
    let func: DebounceFunction<any>;
    const mockFunc = jest.fn();
    const runFunc3Times = () => {
      func();
      func();
      func();
    };

    beforeEach(() => {
      func = _.debounce({ delay: 600 }, mockFunc);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('only executes once when called rapidly', async () => {
      runFunc3Times();
      expect(mockFunc).toHaveBeenCalledTimes(0);
      await _async.sleep(610);
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    test('does not debounce after cancel is called', () => {
      runFunc3Times();
      expect(mockFunc).toHaveBeenCalledTimes(0);
      func.cancel();
      runFunc3Times();
      expect(mockFunc).toHaveBeenCalledTimes(3);
      runFunc3Times();
      expect(mockFunc).toHaveBeenCalledTimes(6);
    });

    test('executes the function immediately when the flush method is called', () => {
      func.flush();
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    test('continues to debounce after flush is called', async () => {
      runFunc3Times();
      expect(mockFunc).toHaveBeenCalledTimes(0);
      func.flush();
      expect(mockFunc).toHaveBeenCalledTimes(1);
      func();
      expect(mockFunc).toHaveBeenCalledTimes(1);
      await _async.sleep(610);
      expect(mockFunc).toHaveBeenCalledTimes(2);
      func.flush();
      expect(mockFunc).toHaveBeenCalledTimes(3);
    });

    test('cancels all pending invocations when the cancel method is called', async () => {
      const results: boolean[] = [];
      func();
      results.push(func.isPending());
      results.push(func.isPending());
      await _async.sleep(610);
      results.push(func.isPending());
      func();
      results.push(func.isPending());
      await _async.sleep(610);
      results.push(func.isPending());
      expect(results).toEqual([true, true, false, true, false]);
    });

    test('cancels all pending invocations when cancel is called', async () => {
      func();
      func.cancel();
      await _async.sleep(610);
      expect(mockFunc).toHaveBeenCalledTimes(0);
    });
  });

  describe('throttle function', () => {
    test('basic throttle', async () => {
      let calls = 0;
      const func = _.throttle({ interval: 600 }, () => calls++);
      func();
      func();
      func();
      expect(calls).toEqual(1);
      await _async.sleep(610);
      func();
      func();
      func();
      expect(calls).toEqual(2);
    });
  });

  test('returns if the throttle is active', async () => {
    const results = [];
    const func = _.throttle({ interval: 600 }, () => {});
    results.push(func.isThrottled());
    func();
    results.push(func.isThrottled());
    func();
    results.push(func.isThrottled());
    func();
    results.push(func.isThrottled());
    await _async.sleep(610);
    results.push(func.isThrottled());
    expect(results).toEqual([false, true, true, true, false]);
  });
});

describe('callable function', () => {
  test('makes object callable', async () => {
    const request = {
      source: 'client',
      body: 'ford',
      doors: 2,
    };

    const call = _.callable(request, (self) => (id: string) => ({
      ...self,
      id,
    }));

    expect(call.source).toBe('client');
    expect(call.body).toBe('ford');
    expect(call.doors).toBe(2);
    const s = call('23');
    expect(s.doors).toBe(2);
    expect(s.id).toBe('23');

    call.doors = 4;
    expect(call.doors).toBe(4);
    const x = call('9');
    expect(x.doors).toBe(4);
    expect(x.id).toBe('9');
  });
});
