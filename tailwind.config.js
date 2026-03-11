/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0a0a0a",
        midnight: "#020617",
        cyan: {
          500: "#00ffff",
          glow: "rgba(0, 255, 255, 0.5)",
        },
        gold: {
          500: "#ffd700",
          glow: "rgba(255, 215, 0, 0.4)",
        },
        crimson: {
          500: "#dc143c",
          glow: "rgba(220, 20, 60, 0.4)",
        }
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        widest: "0.25em",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
