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
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHoveringImage(
        target.tagName === 'IMG' || 
        target.closest('[data-image-container="true"]') !== null
      );
      setIsHoveringButton(
        target.tagName === 'BUTTON' ||
        target.closest('button') !== null
      );
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }
  }, [isTouchDevice]);

  if (!mounted || isTouchDevice) return null;

  const cursorStyles = {
    position: 'fixed',
    left: position.x,
    top: position.y,
    zIndex: 9999,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    willChange: 'transform',
    mixBlendMode: isHoveringImage ? 'difference' : 'normal',
    opacity: isHoveringButton ? 0.2 : 1,
    transition: 'opacity 0.2s ease-out',
  } as const;

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