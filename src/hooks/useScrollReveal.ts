import { useEffect, useRef, useState } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export const useScrollReveal = (options: RevealOptions = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (options.delay) {
            setTimeout(() => setIsVisible(true), options.delay);
          } else {
            setIsVisible(true);
          }
          // Once revealed, we don't need to observe anymore
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.delay]);

  return { elementRef, isVisible };
};

// CSS for reveal animations
export const REVEAL_STYLES = `
  .reveal {
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: opacity, transform;
  }

  .reveal-visible {
    opacity: 1;
    transform: translate(0, 0) scale(1) !important;
  }

  .reveal-fade-up {
    transform: translateY(30px);
  }

  .reveal-fade-left {
    transform: translateX(-40px);
  }

  .reveal-fade-right {
    transform: translateX(40px);
  }

  .reveal-scale {
    transform: scale(0.96);
  }
`;
