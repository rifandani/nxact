import { renderHook } from '@testing-library/react';
import { useUnmount } from './useUnmount';

describe('useUnmount', () => {
  it('useUnmount should work', () => {
    const fn = jest.fn();
    const hook = renderHook(() => useUnmount(fn));
    expect(fn).toBeCalledTimes(0);

    hook.rerender();
    expect(fn).toBeCalledTimes(0);

    hook.unmount();
    expect(fn).toBeCalledTimes(1);
  });
});
