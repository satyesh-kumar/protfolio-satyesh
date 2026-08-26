'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialY = () => {
    if (shouldReduceMotion) return 0;
    if (direction === 'up') return 24;
    if (direction === 'down') return -24;
    return 0;
  };

  const getInitialX = () => {
    if (shouldReduceMotion) return 0;
    if (direction === 'left') return 24;
    if (direction === 'right') return -24;
    return 0;
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: getInitialY(),
        x: getInitialX(),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
