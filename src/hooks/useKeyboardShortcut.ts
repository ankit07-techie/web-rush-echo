import { useEffect, useRef } from 'react';

interface KeyboardShortcutOptions {
  metaOrCtrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
  disabled?: boolean;
}

/**
 * Custom hook for registering keyboard shortcuts with cross-platform meta/ctrl support.
 *
 * @param key Target keyboard key (e.g. 'k', 'Escape')
 * @param callback Handler callback triggered when key is pressed
 * @param options Key modifier options and condition checks
 */
export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {}
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (options.disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isTargetKey = event.key.toLowerCase() === key.toLowerCase();
      if (!isTargetKey) return;

      if (options.metaOrCtrl) {
        const hasModifier = event.metaKey || event.ctrlKey;
        if (!hasModifier) return;
      }

      if (options.shift && !event.shiftKey) return;
      if (options.alt && !event.altKey) return;

      if (options.preventDefault) {
        event.preventDefault();
      }

      callbackRef.current(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, options.metaOrCtrl, options.shift, options.alt, options.preventDefault, options.disabled]);
}
