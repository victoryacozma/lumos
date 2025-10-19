import { useCallback, useRef } from "react";

// Global refetch mechanism for energy entries
let globalRefetchCallbacks: (() => void)[] = [];

export function useGlobalRefetch() {
  const callbackRef = useRef<(() => void) | null>(null);

  const registerRefetch = useCallback((refetchCallback: () => void) => {
    callbackRef.current = refetchCallback;
    globalRefetchCallbacks.push(refetchCallback);

    // Cleanup function
    return () => {
      const index = globalRefetchCallbacks.indexOf(refetchCallback);
      if (index > -1) {
        globalRefetchCallbacks.splice(index, 1);
      }
    };
  }, []);

  const triggerGlobalRefetch = useCallback(() => {
    console.log("🌍 Triggering global refetch for all energy entry hooks");
    globalRefetchCallbacks.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.error("Error in global refetch callback:", error);
      }
    });
  }, []);

  return {
    registerRefetch,
    triggerGlobalRefetch,
  };
}
