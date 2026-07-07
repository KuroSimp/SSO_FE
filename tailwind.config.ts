import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./apps/**/*.{ts,tsx}', './libs/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.10)'
      }
    }
  },
  plugins: []
};

export default config;
