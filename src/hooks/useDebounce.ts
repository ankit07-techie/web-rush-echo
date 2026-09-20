import { useState, useEffect } from 'react';

/**
 * Custom hook that delays updating value until specified delay has elapsed.
 * Useful for real-time search queries and heavy filter computations.
 *
 * @param value Current raw input value
 * @param delay Milliseconds to wait before updating debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
