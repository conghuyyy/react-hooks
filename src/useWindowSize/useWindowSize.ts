import { useSyncExternalStore } from 'react';

interface WindowSize {
  readonly width: number;
  readonly height: number;
}

type CleanupFn = () => void;

// Initialize with the current window dimensions
let cachedSize: WindowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const subscribe = (onStoreChange: () => void): CleanupFn => {
  // Define a stable resize handler
  const handleResize = () => {
    const newSize = { width: window.innerWidth, height: window.innerHeight };
    // Only update and notify if the size has really changed
    if (
      cachedSize.width !== newSize.width ||
      cachedSize.height !== newSize.height
    ) {
      cachedSize = newSize;
      onStoreChange();
    }
  };

  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
};

const getSnapshot = (): WindowSize => cachedSize;

const useWindowSize = () => useSyncExternalStore(subscribe, getSnapshot);

export default useWindowSize;
