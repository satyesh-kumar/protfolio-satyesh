'use client';

import React, { useState, useEffect } from 'react';

export function InteractiveGrid() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-20 select-none"
    >
      {/* 1. Ultra-Subtle Uniform Aligned Production Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-70" />

      {/* 2. Soft Elegant Mouse Aura Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: isHovered ? 1 : 0.3,
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.07), rgba(6, 182, 212, 0.03) 50%, transparent 80%)`,
        }}
      />

      {/* 3. Soft Ambient Color Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-indigo-500/10 via-blue-500/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
