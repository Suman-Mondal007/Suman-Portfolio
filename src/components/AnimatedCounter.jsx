import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Extract the numeric part
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;
  const prefix = target.match(/^[^0-9]*/)?.[0] || '';
  const textSuffix = target.match(/[^0-9]*$/)?.[0] || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericTarget));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericTarget, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{count}{textSuffix}{suffix}
    </span>
  );
};

export default AnimatedCounter;
