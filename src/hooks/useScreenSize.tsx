import { useState, useEffect, useCallback } from 'react';

interface ScreenSize {
  isMobile: boolean;
}

const useScreenSize = (): ScreenSize => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = useCallback(() => {
    const isMobile = window.matchMedia('(max-width: 1240px)').matches;
    setIsMobile(isMobile);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return { isMobile };
};

export default useScreenSize;
