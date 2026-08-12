'use client';

import { useEffect, useState, useRef } from 'react';
import { animate } from 'framer-motion';

interface NumberCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  as?: React.ElementType;
}

export function NumberCounter({ from = 0, to, duration = 2, suffix = '', as: Component = 'span' }: NumberCounterProps) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(from, to, {
            duration,
            ease: 'easeOut',
            onUpdate(val) {
              const isFloat = to % 1 !== 0;
              const formatted = isFloat ? val.toFixed(1) : Math.floor(val);
              setValue(formatted as any);
            },
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [from, to, duration]);

  return <Component ref={ref}>{value}{suffix}</Component>;
}
