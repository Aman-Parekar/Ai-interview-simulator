import { useEffect, useState } from 'react';

export function useCountdown(totalSeconds, onExpire) {
  const [seconds, setSeconds] = useState(totalSeconds);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    if (seconds <= 0) {
      setActive(false);
      onExpire?.();
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, active, onExpire]);

  const pause = () => setActive(false);
  const resume = () => setActive(true);
  const reset = (newTotal) => {
    setSeconds(newTotal ?? totalSeconds);
    setActive(true);
  };

  return { seconds, active, pause, resume, reset, setSeconds };
}

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
