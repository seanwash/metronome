import { useEffect, useCallback, useRef } from 'react';

export type KeyboardShortcut = {
  key: string;
  action: () => void;
  preventDefault?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
};

export type KeyboardShortcutsConfig = KeyboardShortcut[];

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcutsConfig) => {
  const shortcutsRef = useRef(shortcuts);
  
  // Update ref when shortcuts change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when user is interacting with form controls
    const target = event.target as HTMLElement;
    
    // Check for standard form inputs
    const isInputElement = target.tagName === 'INPUT' || 
                          target.tagName === 'TEXTAREA' || 
                          target.tagName === 'SELECT' ||
                          target.contentEditable === 'true' ||
                          target.hasAttribute('contenteditable');
    
    // Check for Radix UI Select components (they use role attributes)
    const isRadixSelect = target.getAttribute('role') === 'combobox' ||
                         target.getAttribute('aria-haspopup') === 'listbox' ||
                         target.hasAttribute('aria-expanded') ||
                         target.closest('[role="combobox"]') !== null ||
                         target.closest('[data-radix-select-trigger]') !== null;
    
    // Check if we're inside any focusable interactive element
    const isFocusableElement = target.closest('button, input, textarea, select, [tabindex]') !== null;
    
    if (isInputElement || isRadixSelect || isFocusableElement) {
      return;
    }

    const matchingShortcut = shortcutsRef.current.find(shortcut => {
      const keyMatches = event.code === shortcut.key || event.key === shortcut.key;
      const ctrlMatches = (shortcut.ctrlKey ?? false) === event.ctrlKey;
      const metaMatches = (shortcut.metaKey ?? false) === event.metaKey;
      const shiftMatches = (shortcut.shiftKey ?? false) === event.shiftKey;
      
      return keyMatches && ctrlMatches && metaMatches && shiftMatches;
    });

    if (matchingShortcut) {
      if (matchingShortcut.preventDefault !== false) {
        event.preventDefault();
      }
      matchingShortcut.action();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};