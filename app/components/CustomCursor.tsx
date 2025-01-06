'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useCursor } from './CursorContext';

export function CustomCursor() {
  const { theme } = useTheme();
  const { forceTheme } = useCursor();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [mounted, setMounted] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over an image
      const target = e.target as HTMLElement;
      setIsHoveringImage(
        target.tagName === 'IMG' || 
        target.closest('[data-image-container="true"]') !== null
      );
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  if (!mounted) return null;

  const cursorStyles = {
    position: 'fixed',
    left: position.x,
    top: position.y,
    zIndex: 9999,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    willChange: 'transform',
    mixBlendMode: isHoveringImage ? 'difference' : 'normal',
  } as const;

  // Use forced theme if available, otherwise use the regular theme
  const effectiveTheme = forceTheme || theme;
  const cursorColor = isHoveringImage ? '#FFFFFF' : (effectiveTheme === 'dark' ? '#FFFFFF' : '#000000');

  const innerCircleStyles = {
    position: 'absolute',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: cursorColor,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  } as const;

  const outerCircleStyles = {
    position: 'absolute',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: `1px solid ${cursorColor}`,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  } as const;

  return (
    <div style={cursorStyles}>
      <div style={innerCircleStyles} />
      <div style={outerCircleStyles} />
    </div>
  );
} 