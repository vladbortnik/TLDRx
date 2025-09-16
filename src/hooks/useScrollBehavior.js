import { useState, useEffect, useRef } from 'react';

export function useScrollBehavior() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [shouldCollapseFilter, setShouldCollapseFilter] = useState(false);

  const lastScrollY = useRef(0);
  const headerHeight = useRef(0);
  const searchInterfaceRef = useRef(null);

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

      // Update sticky state
      const shouldBeSticky = currentScrollY >= stickyThreshold;
      setIsSearchSticky(shouldBeSticky);

      // Auto-collapse filter when search becomes sticky
      if (shouldBeSticky && !shouldCollapseFilter) {
        setShouldCollapseFilter(true);
      } else if (!shouldBeSticky && shouldCollapseFilter) {
        setShouldCollapseFilter(false);
      }

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
  }, [shouldCollapseFilter]);

  // Get styles for sticky positioning - removed backdrop styles for proper layering
  const getStickyStyles = () => {
    return {
      // Styles are now handled directly in App.jsx for better control
    };
  };

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
    isSearchSticky,
    shouldCollapseFilter,
    searchInterfaceRef,
    getStickyStyles,
    getHeaderStyles,
  };
}