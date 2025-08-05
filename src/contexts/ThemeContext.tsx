import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorMode } from '@chakra-ui/react';

type ColorModeOption = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colorModeOption: ColorModeOption;
  setColorModeOption: (mode: ColorModeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setColorMode } = useColorMode();
  const [colorModeOption, setColorModeOptionState] = useState<ColorModeOption>(() => {
    // Cargar desde localStorage o usar 'system' por defecto
    const saved = localStorage.getItem('flota-admin-color-mode');
    return (saved as ColorModeOption) || 'system';
  });

  const setColorModeOption = (mode: ColorModeOption) => {
    setColorModeOptionState(mode);
    localStorage.setItem('flota-admin-color-mode', mode);
    
    if (mode === 'system') {
      // Detectar preferencia del sistema
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColorMode(systemPrefersDark ? 'dark' : 'light');
    } else {
      setColorMode(mode);
    }
  };

  useEffect(() => {
    // Aplicar el modo guardado al cargar
    if (colorModeOption === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColorMode(systemPrefersDark ? 'dark' : 'light');
      
      // Escuchar cambios en la preferencia del sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (colorModeOption === 'system') {
          setColorMode(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setColorMode(colorModeOption);
    }
  }, [colorModeOption, setColorMode]);

  return (
    <ThemeContext.Provider value={{ colorModeOption, setColorModeOption }}>
      {children}
    </ThemeContext.Provider>
  );
};
