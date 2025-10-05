import { useEffect } from 'react';

/**
 * Custom hook for parallax scroll effect
 * Applies transform based on scroll position to elements with 'parallax' class
 */
export const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
