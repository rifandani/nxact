import { useCallback, useRef, useState } from 'react';

/**
 * A hook that helps you manage dynamic list and generate unique key for each item.
 *
 * @example
 *
 * ```tsx
 * const { list, remove, getKey, insert, replace } = useDynamicList(['David', 'Jack']);
 *
 * return (
 *   <div>
 *     {list.map((elem, index) => (
 *       <div key={getKey(index)} style={{ marginBottom: 16 }}>
 *         <Input
 *           placeholder="Please enter name"
 *           onChange={(e) => replace(index, e.target.value)}
 *           value={item}
 *         />
 *         {list.length > 1 && (
 *           <MinusCircleOutlined
 *             onClick={() => {
 *               remove(index);
 *             }}
 *           />
 *         )}
 *
 *         <PlusCircleOutlined
 *           onClick={() => {
 *             insert(index + 1, '');
 *           }}
 *         />
 *       </div>
 *     ))}
 *
 *     <pre>{JSON.stringify([list], null, 2)}</pre>
 *   </div>
 * );
 * ```
 */
export default function useDynamicList<T>(initialList: T[] = []) {
  const counterRef = useRef(-1);

  const keyList = useRef<number[]>([]);

  const setKey = useCallback((index: number) => {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  // Current list
  const [list, setList] = useState(() => {
    initialList.forEach((_, index) => {
      setKey(index);
    });
    return initialList;
  });

  // Reset list current data
  const resetList = useCallback(
    (newList: T[]) => {
      keyList.current = [];
      setList(() => {
        newList.forEach((_, index) => {
          setKey(index);
        });
        return newList;
      });
    },
    [setKey]
  );

  // Add item at specific position
  const insert = useCallback(
    (index: number, item: T) => {
      setList((l) => {
        const temp = [...l];
        temp.splice(index, 0, item);
        setKey(index);
        return temp;
      });
    },
    [setKey]
  );

  // Get the uuid of specific item
  const getKey = useCallback((index: number) => keyList.current[index], []);

  // Retrieve index from uuid
  const getIndex = useCallback(
    (key: number) => keyList.current.findIndex((ele) => ele === key),
    []
  );

  // Merge items into specific position
  const merge = useCallback(
    (index: number, items: T[]) => {
      setList((l) => {
        const temp = [...l];
        items.forEach((_, i) => {
          setKey(index + i);
        });
        temp.splice(index, 0, ...items);
        return temp;
      });
    },
    [setKey]
  );

  // Replace item at specific position
  const replace = useCallback((index: number, item: T) => {
    setList((l) => {
      const temp = [...l];
      temp[index] = item;
      return temp;
    });
  }, []);

  // Delete specific item
  const remove = useCallback((index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);

      // remove keys if necessary
      keyList.current.splice(index, 1);
      return temp;
    });
  }, []);

  // Move item from old index to new index
  const move = useCallback((oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return;

    setList((l) => {
      const newList = [...l];
      const temp = newList.filter((_, index: number) => index !== oldIndex);
      temp.splice(newIndex, 0, newList[oldIndex]);

      // move keys if necessary
      const keyTemp = keyList.current.filter(
        (_, index: number) => index !== oldIndex
      );
      keyTemp.splice(newIndex, 0, keyList.current[oldIndex]);
      keyList.current = keyTemp;

      return temp;
    });
  }, []);

  // Push new item at the end of list
  const push = useCallback(
    (item: T) => {
      setList((l) => {
        setKey(l.length);
        return l.concat([item]);
      });
    },
    [setKey]
  );

  // Remove the last item from the list
  const pop = useCallback(() => {
    // remove keys if necessary
    keyList.current = keyList.current.slice(0, keyList.current.length - 1);
    setList((l) => l.slice(0, l.length - 1));
  }, []);

  // Add new item at the front of the list
  const unshift = useCallback(
    (item: T) => {
      setList((l) => {
        setKey(0);
        return [item].concat(l);
      });
    },
    [setKey]
  );

  // Remove the first item from the list
  const shift = useCallback(() => {
    // remove keys if necessary
    keyList.current = keyList.current.slice(1, keyList.current.length);
    setList((l) => l.slice(1, l.length));
  }, []);

  return {
    list,
    insert,
    merge,
    replace,
    remove,
    getKey,
    getIndex,
    move,
    push,
    pop,
    unshift,
    shift,
    resetList,
  } as const;
}
