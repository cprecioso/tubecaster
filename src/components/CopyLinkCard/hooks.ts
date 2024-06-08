import { useCallback, useEffect, useState } from "react";

export const useTimeout = (ms: number) => {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const handle = setTimeout(() => setRunning(false), ms);
    return () => clearTimeout(handle);
  }, [running, ms]);

  const startTimeout = useCallback(() => setRunning(true), []);

  return [running, startTimeout] as const;
};
