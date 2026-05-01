import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dark');
  const [loadingTheme, setLoadingTheme] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/public/settings");
        if (res.data && res.data.themeMode) {
          setThemeMode(res.data.themeMode);
        }
      } catch (error) {
        console.error("Failed to fetch public theme settings:", error);
      } finally {
        setLoadingTheme(false);
      }
    };
    
    fetchTheme();
  }, []);

  useEffect(() => {
    if (loadingTheme) return;

    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (themeMode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [themeMode, loadingTheme]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, loadingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
