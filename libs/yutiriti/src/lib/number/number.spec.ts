import * as _ from './number';

describe('number module', () => {
  describe('toFloat function', () => {
    test('handles null', () => {
      const result = _.toFloat(null);
      expect(result).toBe(0.0);
    });
    test('handles undefined', () => {
      const result = _.toFloat(undefined);
      expect(result).toBe(0.0);
    });
    test('uses null default', () => {
      const result = _.toFloat('x', null);
      expect(result).toBe(null);
    });
    test('handles bad input', () => {
      const result = _.toFloat({});
      expect(result).toBe(0.0);
    });
    test('converts 20.00 correctly', () => {
      const result = _.toFloat('20.00');
      expect(result).toBe(20.0);
    });
  });

  describe('toInt function', () => {
    test('handles null', () => {
      const result = _.toInt(null);
      expect(result).toBe(0);
    });
    test('uses null default', () => {
      const result = _.toInt('x', null);
      expect(result).toBe(null);
    });
    test('handles undefined', () => {
      const result = _.toInt(undefined);
      expect(result).toBe(0);
    });
    test('handles bad input', () => {
      const result = _.toInt({});
      expect(result).toBe(0);
    });
    test('converts 20 correctly', () => {
      const result = _.toInt('20');
      expect(result).toBe(20);
    });
  });
});
