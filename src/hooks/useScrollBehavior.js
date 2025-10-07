import { useState, useEffect, useRef } from 'react';

export function useScrollBehavior() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');

  const lastScrollY = useRef(0);
  const lastScrollYState = useRef(0); // Track previous scrollY state
  const lastScrollDirectionState = useRef('down'); // Track previous direction state
  const headerHeight = useRef(0);

  useEffect(() => {
    // Calculate header height on mount
    const header = document.querySelector('[data-header]');
    if (header) {
      headerHeight.current = header.offsetHeight;
    }
  }, []);

  useEffect(() => {
    // Initialize refs with current values to prevent initial setState
    const initialScrollY = window.scrollY;
    lastScrollYState.current = initialScrollY;
    lastScrollY.current = initialScrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only update scrollY state if value changed (use Math.round to avoid floating-point issues)
      const roundedScrollY = Math.round(currentScrollY);
      const roundedLastScrollY = Math.round(lastScrollYState.current);

      if (roundedLastScrollY !== roundedScrollY) {
        lastScrollYState.current = currentScrollY;
        setScrollY(currentScrollY);
      }

      // Calculate new direction
      let newDirection;
      if (currentScrollY > lastScrollY.current) {
        newDirection = 'down';
      } else {
        newDirection = 'up';
      }

      // Only update direction state if value changed
      if (lastScrollDirectionState.current !== newDirection) {
        lastScrollDirectionState.current = newDirection;
        setScrollDirection(newDirection);
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