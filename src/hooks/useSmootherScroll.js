// hooks/useSmootherScroll.js
import { useEffect, useRef } from 'react';

export const useSmootherScroll = () => {
  const frameRef = useRef(0);
  const lastScrollTop = useRef(0);
  const targetScrollTop = useRef(0);

  useEffect(() => {
    const html = document.documentElement;
    let ticking = false;

    const smoothScrollAnimation = () => {
      const currentScroll = window.scrollY;
      const diff = targetScrollTop.current - currentScroll;
      
      // Apply easing
      const step = diff * 0.1;
      
      if (Math.abs(step) > 0.5) {
        window.scrollTo(0, currentScroll + step);
        frameRef.current = requestAnimationFrame(smoothScrollAnimation);
      } else {
        window.scrollTo(0, targetScrollTop.current);
        ticking = false;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        frameRef.current = requestAnimationFrame(() => {
          targetScrollTop.current = window.scrollY;
          ticking = true;
          smoothScrollAnimation();
        });
      }
    };

    // Apply the virtual scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimization: Use Intersection Observer for lazy loading
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          // Remove blur and transform when element comes into view
          element.style.filter = 'none';
          element.style.transform = 'none';
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Find all scrollable content
    const scrollableElements = document.querySelectorAll('.scroll-content');
    scrollableElements.forEach(el => {
      // Apply initial styles
      el.style.filter = 'blur(2px)';
      el.style.transform = 'translateZ(0)';
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, []);
};

