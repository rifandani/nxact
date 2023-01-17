import { act, renderHook } from '@testing-library/react';
import useDynamicList from './useDynamicList';

describe('useDynamicList', () => {
  it('getKey should work', () => {
    const hook = renderHook(() => useDynamicList([1, 2, 3]));
    expect(hook.result.current.list[0]).toEqual(1);
    expect(hook.result.current.getKey(0)).toEqual(0);
    expect(hook.result.current.getKey(1)).toEqual(1);
    expect(hook.result.current.getKey(2)).toEqual(2);
  });

  it('methods should work', () => {
    const hook = renderHook(() =>
      useDynamicList([
        { name: 'aaa', age: 18 },
        { name: 'bbb', age: 19 },
        { name: 'ccc', age: 20 },
      ])
    );

    expect(hook.result.current.list[0].age).toEqual(18);
    expect(hook.result.current.list[1].age).toEqual(19);
    expect(hook.result.current.list[2].age).toEqual(20);
    expect(hook.result.current.getKey(0)).toEqual(0);
    expect(hook.result.current.getKey(1)).toEqual(1);
    expect(hook.result.current.getKey(2)).toEqual(2);
    expect(hook.result.current.list.length).toEqual(3);

    // unshift
    act(() => {
      hook.result.current.unshift({ name: 'ddd', age: 21 });
    });
    expect(hook.result.current.list[0].name).toEqual('ddd');
    expect(hook.result.current.getKey(0)).toEqual(3);
    expect(hook.result.current.list.length).toEqual(4);

    // push
    act(() => {
      hook.result.current.push({ name: 'eee', age: 22 });
    });
    expect(hook.result.current.list[4].name).toEqual('eee');
    expect(hook.result.current.getKey(0)).toEqual(3);
    expect(hook.result.current.getKey(4)).toEqual(4);
    expect(hook.result.current.list.length).toEqual(5);

    // insert
    act(() => {
      hook.result.current.insert(1, { name: 'fff', age: 23 });
    });
    expect(hook.result.current.list[1].name).toEqual('fff');
    expect(hook.result.current.getKey(1)).toEqual(5);
    expect(hook.result.current.list.length).toEqual(6);

    // merge
    act(() => {
      hook.result.current.merge(0, [
        { name: 'ggg', age: 24 },
        { name: 'hhh', age: 25 },
        { name: 'iii', age: 26 },
      ]);
    });
    expect(hook.result.current.list[0].name).toEqual('ggg');
    expect(hook.result.current.list[1].name).toEqual('hhh');
    expect(hook.result.current.list[2].name).toEqual('iii');
    expect(hook.result.current.getKey(0)).toEqual(6);
    expect(hook.result.current.getKey(1)).toEqual(7);
    expect(hook.result.current.getKey(2)).toEqual(8);
    expect(hook.result.current.list.length).toEqual(9);

    // move
    act(() => {
      hook.result.current.move(0, 1);
    });
    expect(hook.result.current.list[0].name).toEqual('hhh');
    expect(hook.result.current.list[1].name).toEqual('ggg');
    expect(hook.result.current.getKey(0)).toEqual(7);
    expect(hook.result.current.getKey(1)).toEqual(6);
    expect(hook.result.current.list.length).toEqual(9);

    // move without changes
    act(() => {
      hook.result.current.move(2, 2);
    });
    expect(hook.result.current.list[2].name).toEqual('iii');
    expect(hook.result.current.getKey(2)).toEqual(8);
    expect(hook.result.current.list.length).toEqual(9);

    // shift
    act(() => {
      hook.result.current.shift();
    });
    expect(hook.result.current.list[0].name).toEqual('ggg');
    expect(hook.result.current.getKey(0)).toEqual(6);
    expect(hook.result.current.list.length).toEqual(8);

    // pop
    act(() => {
      hook.result.current.pop();
    });
    expect(hook.result.current.list.length).toEqual(7);

    // replace
    act(() => {
      hook.result.current.replace(7, { name: 'jjj', age: 27 });
    });
    expect(hook.result.current.list[7].name).toEqual('jjj');
    expect(hook.result.current.list.length).toEqual(8);

    // remove
    act(() => {
      hook.result.current.remove(7);
    });
    expect(hook.result.current.list.length).toEqual(7);
  });

  it('same items should have different keys', () => {
    const hook = renderHook(() =>
      useDynamicList([
        { name: 'aaa', age: 10 },
        { name: 'aaa', age: 10 },
        { name: 'aaa', age: 10 },
        { name: 'aaa', age: 10 },
      ])
    );
    expect(hook.result.current.getKey(0)).toEqual(0);
    expect(hook.result.current.getKey(1)).toEqual(1);
    expect(hook.result.current.getKey(2)).toEqual(2);
    expect(hook.result.current.getKey(3)).toEqual(3);

    act(() => {
      hook.result.current.push({ name: 'bbb', age: 11 });
    });
    expect(hook.result.current.getKey(4)).toEqual(4);

    const testObj = { name: 'ccc', age: 12 };
    act(() => {
      hook.result.current.push(testObj);
      hook.result.current.push(testObj);
      hook.result.current.push(testObj);
    });
    expect(hook.result.current.getKey(5)).toEqual(5);
    expect(hook.result.current.getKey(6)).toEqual(6);
    expect(hook.result.current.getKey(7)).toEqual(7);
  });

  it('initialValue changes', () => {
    const hook = renderHook(
      ({ initialValue }) => useDynamicList(initialValue),
      {
        initialProps: {
          initialValue: [1],
        },
      }
    );
    expect(hook.result.current.list[0]).toEqual(1);
    expect(hook.result.current.getKey(0)).toEqual(0);

    act(() => {
      hook.result.current.resetList([2]);
    });

    expect(hook.result.current.list[0]).toEqual(2);
    expect(hook.result.current.getKey(0)).toEqual(1);

    act(() => {
      hook.result.current.resetList([3]);
    });

    expect(hook.result.current.list[0]).toEqual(3);
    expect(hook.result.current.getKey(0)).toEqual(2);
  });
});
