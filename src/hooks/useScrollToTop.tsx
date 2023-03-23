import { useCallback } from 'react';

const useScrollToTop = (): ((behavior?: ScrollOptions['behavior']) => void) => {
  const scrollToTop = useCallback((behavior?: ScrollOptions['behavior']) => {
    window.scrollTo({
      top: 0,
      behavior: behavior,
    });
  }, []);

  return scrollToTop;
};

export default useScrollToTop;