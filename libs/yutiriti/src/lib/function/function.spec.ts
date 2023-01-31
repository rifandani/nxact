/* eslint-disable @typescript-eslint/no-explicit-any */
import * as _ from './function';

describe('function module', () => {
  describe('purry function', () => {
    function sub(a: number, b: number) {
      return a - b;
    }

    test('all arguments', () => {
      function fn(...args: any[]) {
        return _.purry(sub, args);
      }
      expect(fn(10, 5)).toEqual(5);
    });

    test('1 missing', () => {
      function fn(...args: any[]) {
        return _.purry(sub, args);
      }
      expect(fn(5)(10)).toEqual(5);
    });

    test('wrong number of arguments', () => {
      function fn(...args: any[]) {
        return _.purry(sub, args);
      }
      expect(() => fn(5, 10, 40)).toThrowError('Wrong number of arguments');
    });
  });

  describe('allPass function', () => {
    const fns = [
      (x: number) => x % 3 === 0,
      (x: number) => x % 4 === 0,
    ] as const;

    test('data first should be correct', () => {
      expect(_.allPass(12, fns)).toEqual(true);
      expect(_.allPass(4, fns)).toEqual(false);
      expect(_.allPass(3, fns)).toEqual(false);
    });
  });

  describe('anyPass function', () => {
    const fns = [(x: number) => x === 3, (x: number) => x === 4] as const;

    test('data first should be correct', () => {
      expect(_.anyPass(3, fns)).toEqual(true);
      expect(_.anyPass(4, fns)).toEqual(true);
      expect(_.anyPass(1, fns)).toEqual(false);
    });
  });

  describe('once function', () => {
    test('should call only once', () => {
      const mock = jest.fn(() => ({}));
      const wrapped = _.once(mock as () => object);

      const ret1 = wrapped();
      expect(mock).toHaveBeenCalledTimes(1);
      const ret2 = wrapped();
      expect(mock).toHaveBeenCalledTimes(1);
      expect(ret1).toBe(ret2);
    });
  });
});
