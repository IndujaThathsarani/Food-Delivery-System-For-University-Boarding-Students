/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        admin: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        'admin-accent': '#177a3f',
        'admin-accent-hover': '#115a2f',
        'admin-hover': '#edf8f0',
        'admin-ink': '#314d3b',
        'admin-surface': '#f7fbf7',
      },
    },
  },
};

export default config;
