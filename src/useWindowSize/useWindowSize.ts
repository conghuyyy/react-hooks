import { useSyncExternalStore } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener('resize', onStoreChange);

  return () => window.removeEventListener('resize', onStoreChange);
};

const getSnapshot = (): WindowSize => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowSize = () => useSyncExternalStore(subscribe, getSnapshot);

export default useWindowSize;
