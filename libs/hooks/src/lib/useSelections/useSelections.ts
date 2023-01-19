import { useMemo, useState } from 'react';
import { useMemoizedFn } from '../useMemoizedFn/useMemoizedFn';

/**
 * This hook is used for Checkbox group, supports multiple selection, single selection, select-all, select-none and semi-selected etc.
 *
 * @example
 *
 * ```tsx
 * const list = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9], []);
 *
 * const { selected, allSelected, isSelected, toggle, toggleAll, partiallySelected } = useSelections(
 *   list,
 *   [1],
 * );
 *
 * return (
 *   <Container>
 *     <h3>Selected : {selected.join(', ')}</h3>
 *     <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
 *       {allSelected ? 'Uncheck All' : 'Check all'}
 *     </Checkbox>
 *     <Row>
 *       {list.map((val) => (
 *         <Col span={12} key={val}>
 *           <Checkbox checked={isSelected(val)} onClick={() => toggle(val)}>
 *             {val}
 *           </Checkbox>
 *         </Col>
 *       ))}
 *     </Row>
 *   </Container>
 * );
 * ```
 */
export function useSelections<T>(items: T[], defaultSelected: T[] = []) {
  // Selected Items, Set selected items
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  // Whether item is selected
  const isSelected = (item: T) => selectedSet.has(item);

  // Select item
  const select = (item: T) => {
    selectedSet.add(item);
    return setSelected(Array.from(selectedSet));
  };

  // UnSelect item
  const unSelect = (item: T) => {
    selectedSet.delete(item);
    return setSelected(Array.from(selectedSet));
  };

  // Toggle item select status
  const toggle = (item: T) => {
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item);
    }
  };

  // Select all items
  const selectAll = () => {
    items.forEach((o) => {
      selectedSet.add(o);
    });
    setSelected(Array.from(selectedSet));
  };

  // UnSelect all items
  const unSelectAll = () => {
    items.forEach((o) => {
      selectedSet.delete(o);
    });
    setSelected(Array.from(selectedSet));
  };

  // Is no item selected
  const noneSelected = useMemo(
    () => items.every((o) => !selectedSet.has(o)),
    [items, selectedSet]
  );

  // Is all items selected
  const allSelected = useMemo(
    () => items.every((o) => selectedSet.has(o)) && !noneSelected,
    [items, selectedSet, noneSelected]
  );

  // Is partially items selected
  const partiallySelected = useMemo(
    () => !noneSelected && !allSelected,
    [noneSelected, allSelected]
  );

  // Toggle select all items
  const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

  return {
    selected,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    isSelected,
    select: useMemoizedFn(select),
    unSelect: useMemoizedFn(unSelect),
    toggle: useMemoizedFn(toggle),
    selectAll: useMemoizedFn(selectAll),
    unSelectAll: useMemoizedFn(unSelectAll),
    toggleAll: useMemoizedFn(toggleAll),
  } as const;
}
