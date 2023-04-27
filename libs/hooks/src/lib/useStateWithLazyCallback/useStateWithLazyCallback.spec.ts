import { act, renderHook } from '@testing-library/react';
import { useStateWithLazyCallback } from './useStateWithLazyCallback';

const setUp = <T>(val: T) =>
  renderHook((state) => useStateWithLazyCallback(state), { initialProps: val });

describe('useStateWithLazyCallback', () => {
  it('useStateWithLazyCallback with basic variable should work', () => {
    const { result } = setUp(0);
    const [state, setState] = result.current;
    let ref = 0;

    expect(state).toEqual(0);
    expect(ref).toEqual(0);

    act(() => {
      setState(1, (num) => {
        ref = num * 2;
      });
    });
    expect(state).toEqual(1);
    expect(ref).toEqual(2);
  });
});
