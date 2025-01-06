'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CursorContextType = {
  forceTheme: 'dark' | 'light' | null;
  setForceTheme: (theme: 'dark' | 'light' | null) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [forceTheme, setForceTheme] = useState<'dark' | 'light' | null>(null);

  return (
    <CursorContext.Provider value={{ forceTheme, setForceTheme }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
} 