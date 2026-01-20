'use client';

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// type Theme = 'light' | 'dark';

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [theme, setTheme] = useState<Theme>('light');

//   // Sync state with current DOM class on mount
//   useEffect(() => {
//     const current = document.documentElement.classList.contains('dark')
//       ? 'dark'
//       : 'light';
//     setTheme(current);
//   }, []);

//   // When theme changes, update DOM and localStorage
//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//       document.body.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.body.classList.remove('dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//     document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// }


import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
