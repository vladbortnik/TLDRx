import { useState, useEffect, useRef } from 'react';

export function useScrollBehavior() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');

  const lastScrollY = useRef(0);
  const headerHeight = useRef(0);

  useEffect(() => {
    // Calculate header height on mount
    const header = document.querySelector('[data-header]');
    if (header) {
      headerHeight.current = header.offsetHeight;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scroll position
      setScrollY(currentScrollY);

      // Update scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      // Calculate sticky threshold (when header disappears + 6px)
      const stickyThreshold = Math.max(0, headerHeight.current - 6);


      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  // Get header visibility styles
  const getHeaderStyles = () => {
    const headerOffset = Math.min(scrollY, headerHeight.current);
    return {
      transform: `translateY(-${headerOffset}px)`,
      transition: scrollDirection === 'up' ? 'transform 0.3s ease-out' : 'none',
      opacity: scrollY > headerHeight.current ? 0 : 1,
    };
  };

  return {
    scrollY,
    scrollDirection,
    getHeaderStyles,
  };
}