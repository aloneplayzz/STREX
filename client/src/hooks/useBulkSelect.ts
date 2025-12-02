import { useState } from 'react';

export function useBulkSelect<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(item => item.id)));
    }
  };

  const getSelected = () => items.filter(item => selectedIds.has(item.id));

  const clearSelection = () => setSelectedIds(new Set());

  const isSelected = (id: string) => selectedIds.has(id);

  return {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    getSelected,
    clearSelection,
    isSelected,
    selectCount: selectedIds.size,
    isAllSelected: selectedIds.size === items.length && items.length > 0,
  };
}
