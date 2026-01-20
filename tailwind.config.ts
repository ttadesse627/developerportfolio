import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#1F2937',
          dark: '#374151',
        },
        accent: {
          DEFAULT: '#10B981',
          dark: '#34D399',
        },
        background: {
          light: '#F9FAFB',
          dark: '#111827',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          dark: {
            primary: '#F9FAFB',
            secondary: '#D1D5DB',
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;



