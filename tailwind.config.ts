import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-secondary': '#f7f7f7',
        'dark-secondary': '#202020',
        'light-200': '#e0e0e0',
        'dark-200': '#2d2d2d',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;