import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
