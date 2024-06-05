// TODO remove, this demo shouldn't need to reset the theme.
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export const defaultTheme = createTheme();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#170B12', // Light cyan
      light: '#DE0B7B',  // Lighter shade of cyan
      dark: '#612344',   // Darker shade of cyan
      grey: '#CAD2C5',   // Light gray for contrast
    },
    secondary: {
      main: '#A3085B', // Red for contrast
    },
    background: {
      default: '#fff', // White backgrouand
    },
    text: {
      primary: '#000',  // Black text
      secondary: '#757575', // Gray text for less important elements
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#795545', // Deep orange for dark mode
    },
    secondary: {
      main: '#FFCC80', // Lighter orange for contrast
    },
    background: {
      default: '#212121', // Dark background
    },
    text: {
      primary: '#fff',  // White text
      secondary: '#e0e0e0', // Lighter gray text for less important elements
    },
  },
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const useThemeMode = (pmode) => {
  const [mode, setMode] = useState(pmode || 'light');

  const toggleThemeMode = () => {
    setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', newMode);
        return newMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? setMode(savedTheme || 'dark')
      : setMode(savedTheme || 'light');
  }, []);

  return { mode, toggleThemeMode };
};
