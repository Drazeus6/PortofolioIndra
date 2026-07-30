import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#0A0A0B',
          surface: '#111113',
          card: '#161619',
          border: '#232328',
        },
        electric: {
          500: '#0066ff',
          400: '#3b82f6',
          300: '#60a5fa',
        },
        legal: {
          gold: '#f59e0b',
          amber: '#d97706',
          seal: '#b45309',
          border: '#78350f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '10px',
      },
    },
  },
  plugins: [],
};

export default config;
