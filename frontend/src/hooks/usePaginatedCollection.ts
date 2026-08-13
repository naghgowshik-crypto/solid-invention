import { useState, useMemo, useCallback } from 'react';

interface UsePaginatedOptions<T> {
  pageSize?: number;
  initialCategory?: string;
  filterFn?: (item: T, category: string) => boolean;
}

export function usePaginatedCollection<T>(
  collection: T[],
  options: UsePaginatedOptions<T> = {}
) {
  const { pageSize = 9, initialCategory = 'ALL', filterFn } = options;
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL' || !activeCategory) {
      return collection;
    }
    if (filterFn) {
      return collection.filter(item => filterFn(item, activeCategory));
    }
    // Default matching check on category field if present
    return collection.filter((item: any) => 
      item.category?.toUpperCase() === activeCategory.toUpperCase() ||
      item.category === activeCategory
    );
  }, [collection, activeCategory, filterFn]);

  // Total pages calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  // Slice items for current page to prevent massive DOM node count
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  // Category change handler resets page to 1
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  return {
    activeCategory,
    setActiveCategory: handleCategoryChange,
    currentPage,
    totalPages,
    totalItems: filteredItems.length,
    paginatedItems,
    filteredItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
