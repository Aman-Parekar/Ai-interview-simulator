import { useEffect } from 'react';

export function useKeyboardShortcut(key, handler, deps = []) {
  useEffect(() => {
    const onKey = (e) => {
      const target = e.target;
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (typing) return;
      if (e.key.toLowerCase() === key.toLowerCase()) {
        handler(e);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
