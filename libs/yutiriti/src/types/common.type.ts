/* eslint-disable @typescript-eslint/no-explicit-any */

export type Func<TArgs = any, KReturn = any | void> = (
  ...args: TArgs[]
) => KReturn;

export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void;
  /**
   * Cancels the debounced function
   */
  cancel(): void;
  /**
   * Checks if there is any invocation debounced
   */
  isPending(): boolean;
  /**
   * Runs the debounced function immediately
   */
  flush(...args: TArgs): void;
};

export type AssertEqual<Type, Expected> = Array<Type> extends Array<Expected>
  ? Array<Expected> extends Array<Type>
    ? true
    : never
  : never;

export type ThrottledFunction<TArgs extends any[]> = {
  (...args: TArgs): void;
  /**
   * Checks if there is any invocation throttled
   */
  isThrottled(): boolean;
};
