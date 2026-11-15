import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070d18',
          900: '#0b1528',
          800: '#112240',
          700: '#1b3258',
          600: '#264673'
        },
        electric: {
          500: '#0284c7',
          400: '#38bdf8',
          300: '#7dd3fc'
        },
        industrial: {
          surface: '#0d1527',
          card: '#111c35',
          border: '#1e2e54',
          subtle: '#2a3f70'
        },
        health: {
          normal: '#10b981',
          warning: '#f59e0b',
          critical: '#ef4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace']
      }
    }
  },
  plugins: []
} satisfies Config;
