'use client'

import { m, LazyMotion, domAnimation } from 'framer-motion'
import { ReactNode } from 'react'

export type AnimationDirection =
  | 'left' | 'right' | 'up' | 'down'
  | 'fade-up' | 'fade-down' | 'fade-right' | 'fade-left'
  | 'fade-up-right' | 'fade-up-left' | 'fade-down-right' | 'fade-down-left'
  | 'flip-left' | 'flip-right' | 'flip-up' | 'flip-down'
  | 'zoom-in' | 'zoom-in-up' | 'zoom-in-down' | 'zoom-in-left' | 'zoom-in-right'
  | 'zoom-out' | 'zoom-out-up' | 'zoom-out-down' | 'zoom-out-right' | 'zoom-out-left';

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 1,
  className = '',
  style,
  as = 'div'
}: {
  children: ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: any;
}) {
  const getVariants = () => {
    switch (direction) {
      case 'left': return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }
      case 'right': return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }
      case 'up': return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
      case 'down': return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } }

      case 'fade-up': return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
      case 'fade-down': return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } }
      case 'fade-right': return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }
      case 'fade-left': return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }
      case 'fade-up-right': return { hidden: { opacity: 0, x: -40, y: 40 }, visible: { opacity: 1, x: 0, y: 0 } }
      case 'fade-up-left': return { hidden: { opacity: 0, x: 40, y: 40 }, visible: { opacity: 1, x: 0, y: 0 } }
      case 'fade-down-right': return { hidden: { opacity: 0, x: -40, y: -40 }, visible: { opacity: 1, x: 0, y: 0 } }
      case 'fade-down-left': return { hidden: { opacity: 0, x: 40, y: -40 }, visible: { opacity: 1, x: 0, y: 0 } }

      case 'flip-left': return { hidden: { opacity: 0, rotateY: -100, transformPerspective: 2500 }, visible: { opacity: 1, rotateY: 0, transformPerspective: 2500 } }
      case 'flip-right': return { hidden: { opacity: 0, rotateY: 100, transformPerspective: 2500 }, visible: { opacity: 1, rotateY: 0, transformPerspective: 2500 } }
      case 'flip-up': return { hidden: { opacity: 0, rotateX: -100, transformPerspective: 2500 }, visible: { opacity: 1, rotateX: 0, transformPerspective: 2500 } }
      case 'flip-down': return { hidden: { opacity: 0, rotateX: 100, transformPerspective: 2500 }, visible: { opacity: 1, rotateX: 0, transformPerspective: 2500 } }

      case 'zoom-in': return { hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }
      case 'zoom-in-up': return { hidden: { opacity: 0, scale: 0.6, y: 40 }, visible: { opacity: 1, scale: 1, y: 0 } }
      case 'zoom-in-down': return { hidden: { opacity: 0, scale: 0.6, y: -40 }, visible: { opacity: 1, scale: 1, y: 0 } }
      case 'zoom-in-left': return { hidden: { opacity: 0, scale: 0.6, x: 40 }, visible: { opacity: 1, scale: 1, x: 0 } }
      case 'zoom-in-right': return { hidden: { opacity: 0, scale: 0.6, x: -40 }, visible: { opacity: 1, scale: 1, x: 0 } }

      case 'zoom-out': return { hidden: { opacity: 0, scale: 1.2 }, visible: { opacity: 1, scale: 1 } }
      case 'zoom-out-up': return { hidden: { opacity: 0, scale: 1.2, y: 40 }, visible: { opacity: 1, scale: 1, y: 0 } }
      case 'zoom-out-down': return { hidden: { opacity: 0, scale: 1.2, y: -40 }, visible: { opacity: 1, scale: 1, y: 0 } }
      case 'zoom-out-left': return { hidden: { opacity: 0, scale: 1.2, x: 40 }, visible: { opacity: 1, scale: 1, x: 0 } }
      case 'zoom-out-right': return { hidden: { opacity: 0, scale: 1.2, x: -40 }, visible: { opacity: 1, scale: 1, x: 0 } }

      default: return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }
    }
  }

  const Component = (m as any)[as] || m.div;

  return (
    <LazyMotion features={domAnimation}>
      <Component
        className={className}
        style={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        variants={getVariants()}
      >
        {children}
      </Component>
    </LazyMotion>
  )
}
