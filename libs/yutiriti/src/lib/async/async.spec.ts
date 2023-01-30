/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from 'chai';
import * as _array from '../array/array';
import * as _ from './async';
import { AggregateError } from './async';

describe('async module', () => {
  beforeEach(() => jest.useFakeTimers({ advanceTimers: true }));

  describe('asyncReduce function', () => {
    test('returns result of reducer', async () => {
      const numbers = [
        0,
        1,
        2,
        3,
        4, // => 10
      ];
      const asyncSum = async (a: number, b: number): Promise<number> => {
        return new Promise((res) => res(a + b));
      };
      const result = await _.reduce<number, number>(numbers, asyncSum, 0);
      assert.equal(result, 10);
    });
  });

  describe('asyncMap function', () => {
    test('returns result of mapper', async () => {
      const numbers = [1, 2, 3, 4];
      const asyncSquare = async (a: number): Promise<number> => {
        return new Promise((res) => res(a * a));
      };
      const result = await _.map<number, number>(numbers, asyncSquare);
      assert.deepEqual(result, [1, 4, 9, 16]);
    });

    test('handles null input', async () => {
      const result = await _.map(null as unknown as unknown[], async () => '');
      assert.deepEqual(result, []);
    });

    test('passes correct indexes', async () => {
      const array = ['a', 'b', 'c', 'd'];
      const mapper = async (l: string, index: number) => `${l}${index}`;
      const result = await _.map(array, mapper);
      assert.deepEqual(result, ['a0', 'b1', 'c2', 'd3']);
    });
  });

  describe('reduce/asyncReduceV2 function', () => {
    const numbers = [0, 1, 2, 3, 4];
    const reducer = async (a: number, b: number): Promise<number> => {
      return new Promise((res) => res(a + b));
    };

    test('calls asyncReduce', async () => {
      const result = await _.reduce<number, number>(numbers, reducer, 0);
      assert.equal(result, 10);
    });

    test('uses first item in array when no init provided', async () => {
      const result = await _.reduce(numbers, reducer);
      assert.equal(result, 10);
    });

    test('throws on no init value and an empty array', async () => {
      try {
        await _.reduce([], reducer);
      } catch (err) {
        assert.isNotNull(err);
        return;
      }
      assert.fail('Expected error to be thrown');
    });

    test('throws on no init value and a null array input', async () => {
      try {
        await _.reduce(null as unknown as number[], reducer);
      } catch (err) {
        assert.isNotNull(err);
        return;
      }
      assert.fail('Expected error to be thrown');
    });
  });

  describe('defer function', () => {
    test('calls registered defer function', async () => {
      let val = 0;
      await _.defer(async (defer) => {
        defer(() => {
          val = 1;
        });
      });
      assert.equal(val, 1);
    });

    test('returns the resulting value of the given function', async () => {
      let val = 0;
      const result = await _.defer(async (defer) => {
        defer(() => {
          val = 1;
        });
        return 'x';
      });
      assert.equal(val, 1);
      assert.equal(result, 'x');
    });

    test('calls all registered defer functions', async () => {
      let one = 0;
      let two = 0;
      let three = 0;
      const result = await _.defer(async (defer) => {
        defer(async () => {
          one = 1;
        });
        defer(async () => {
          two = 2;
        });
        defer(async () => {
          three = 3;
        });
        return 'x';
      });
      assert.equal(one, 1);
      assert.equal(two, 2);
      assert.equal(three, 3);
      assert.equal(result, 'x');
    });

    test('calls all registered defer functions when error is thrown', async () => {
      let one = 0;
      let two = 0;
      let three = 0;
      const isTruthy = true;
      try {
        await _.defer(async (defer) => {
          defer(async () => {
            one = 1;
          });
          defer(async () => {
            two = 2;
          });
          defer(async () => {
            three = 3;
          });
          if (isTruthy) throw new Error('soooo broken');
          return 'x';
        });
      } catch (err) {
        console.error('FIXME: unexpected error');
      }
      assert.equal(one, 1);
      assert.equal(two, 2);
      assert.equal(three, 3);
    });

    test('throws the error', async () => {
      let error: Error | null = null;
      try {
        await _.defer(async () => {
          throw new Error('soooo broken');
        });
      } catch (err: any) {
        error = err;
      }
      assert.isNotNull(error);
      assert.equal(error?.message, 'soooo broken');
    });

    test('rethrows the rethrown error when rethrow is true', async () => {
      let error: Error | null = null;
      try {
        await _.defer(async (register) => {
          register(
            async () => {
              throw new Error('soooo broken');
            },
            { rethrow: true }
          );
        });
      } catch (err: any) {
        error = err;
      }
      assert.isNotNull(error);
      assert.equal(error?.message, 'soooo broken');
    });

    test('does not rethrow the rethrown error when rethrow is false', async () => {
      let error: Error | null = null;
      try {
        await _.defer(async (register) => {
          register(
            async () => {
              throw new Error('soooo broken');
            },
            { rethrow: false }
          );
        });
      } catch (err: any) {
        error = err;
      }
      assert.isNull(error);
    });

    test('does not rethrow the rethrown error by default', async () => {
      let error: Error | null = null;
      try {
        await _.defer(async (register) => {
          register(async () => {
            throw new Error('soooo broken');
          });
        });
      } catch (err: any) {
        error = err;
      }
      assert.isNull(error);
    });

    test('returns awaited async results', async () => {
      const result = await _.defer(() => {
        return new Promise<string>((res) => res('x'));
      });
      assert.equal(result, 'x');
    });
  });

  describe('_.try function', () => {
    test('returns error when error is thrown', async () => {
      const [err, result] = await _.tryit(async () => {
        throw new Error('not good enough');
      })();
      assert.isUndefined(result);
      assert.isNotNull(err);
      assert.equal(err?.message, 'not good enough');
    });

    test('returns result when no error is thrown', async () => {
      const [err, result] = await _.tryit(async () => {
        return 'hello';
      })();
      assert.isUndefined(err);
      assert.isNotNull(result);
      assert.equal(result, 'hello');
    });

    test('alias exists', () => {
      assert.isNotNull(_.tryit);
    });
  });

  describe('_.sleep function', () => {
    test('suspends a thread for a specified number of milliseconds', async () => {
      const ONE_SECOND = 1000;
      const before = Date.now();
      await _.sleep(ONE_SECOND);
      const after = Date.now();
      assert.isAtLeast(after, before + ONE_SECOND);
    });
  });

  describe('AggregateError error', () => {
    const fakeWork = (name?: string) => {
      const fakeJob = () => {
        const fakeTask = () => {
          const fakeMicrotask = () => {
            const err = new Error();
            err.name = name ?? 'MicrotaskError';
            throw err;
          };
          return fakeMicrotask();
        };
        return fakeTask();
      };
      return fakeJob();
    };

    test('uses stack from the first given error', () => {
      const errors: Error[] = [];
      try {
        fakeWork();
      } catch (e) {
        errors.push(e as Error);
      }
      const aggregate = new AggregateError(errors);
      assert.include(aggregate.stack, 'at fakeMicrotask');
      assert.include(aggregate.message, 'with 1');
    });

    test('uses stack from first error with a stack', () => {
      const errors: Error[] = [{} as Error];
      try {
        fakeWork();
      } catch (e) {
        errors.push(e as Error);
      }
      const aggregate = new AggregateError(errors);
      assert.equal(aggregate.name, 'AggregateError(MicrotaskError...)');
      assert.include(aggregate.stack, 'at fakeMicrotask');
      assert.include(aggregate.message, 'with 2');
    });

    test('does not fail if no errors given', () => {
      new AggregateError([]);
      new AggregateError(undefined as unknown as Error[]);
    });
  });

  describe('_.parallel function', () => {
    test('returns all results from all functions', async () => {
      const [errors, results] = await _.tryit(async () => {
        return _.parallel(1, _array.list(1, 3), async (num) => {
          await _.sleep(1000);
          return `hi_${num}`;
        });
      })();
      assert.isUndefined(errors);
      assert.deepEqual(results, ['hi_1', 'hi_2', 'hi_3']);
    });

    test('throws erros as array of all errors', async () => {
      const [error, results] = await _.tryit(async () => {
        return _.parallel(1, _array.list(1, 3), async (num) => {
          await _.sleep(1000);
          if (num === 2) throw new Error('number is 2');
          return `hi_${num}`;
        });
      })();
      const err = error as AggregateError;
      assert.isUndefined(results);
      assert.equal(err.errors.length, 1);
      assert.equal(err.errors[0].message, 'number is 2');
    });

    test('does not run more than the limit at once', async () => {
      let numInProgress = 0;
      const tracking: number[] = [];
      await _.parallel(3, _array.list(1, 14), async () => {
        numInProgress++;
        tracking.push(numInProgress);
        await _.sleep(300);
        numInProgress--;
      });
      assert.deepEqual(Math.max(...tracking), 3);
    });
  });

  describe('_.retry', () => {
    type Options = {
      times?: number;
      delay?: number | null;
      backoff?: (count: number) => number;
    };

    const NULL = null as unknown as Options;

    test('returns result of given function', async () => {
      const result = await _.retry(NULL, async () => {
        return 'hello';
      });
      assert.equal(result, 'hello');
    });

    test('simple + quick + happy path', async () => {
      const result = await _.retry(NULL, async () => {
        return 'hello';
      });
      assert.equal(result, 'hello');
    });

    test('retries on failure', async () => {
      let failedOnce = false;
      const result = await _.retry(NULL, async () => {
        if (!failedOnce) {
          failedOnce = true;
          throw 'Failing for test';
        }
        return 'hello';
      });
      assert.equal(result, 'hello');
    });

    test('quits on bail', async () => {
      try {
        await _.retry({}, async (bail) => {
          bail('iquit');
        });
      } catch (err) {
        assert.equal(err, 'iquit');
        return;
      }
      assert.fail('error should have been thrown');
    });

    test('quits after max retries', async () => {
      try {
        await _.retry({}, async () => {
          throw 'quitagain';
        });
      } catch (err) {
        assert.equal(err, 'quitagain');
        return;
      }
      assert.fail('error should have been thrown');
    });

    test('quits after max retries without delay', async () => {
      try {
        const func = async () => {
          throw 'quitagain';
        };
        await _.retry({ times: 3 }, func);
      } catch (err) {
        assert.equal(err, 'quitagain');
        return;
      }
      assert.fail('error should have been thrown');
    });

    test('quits after max retries with delay', async () => {
      try {
        const func = async () => {
          throw 'quitagain';
        };
        await _.retry({ delay: 100 }, func);
      } catch (err) {
        assert.equal(err, 'quitagain');
        return;
      }
      assert.fail('error should have been thrown');
    });

    test('uses backoff between retries', async () => {
      let count = 0;
      let backoffs = 0;
      const start = Date.now();
      await _.retry(
        {
          times: 3,
          backoff: (i) => {
            backoffs += i ** 10;
            return i ** 10;
          },
        },
        async () => {
          count++;
          if (count < 3) throw 'error';
        }
      );
      const diff = Date.now() - start;
      assert.equal(count, 3);
      // Time taken should at least be the
      // total ms backed off. Using exponential
      // backoff (above) 3 times (passing on
      // the third try) that is:
      //   - 10**1 + 10**2 = 1025
      // The performance typically comes in 1
      // or 2 milliseconds after.
      assert.isAtLeast(diff, backoffs);
    });
  });
});
