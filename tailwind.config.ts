import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lima: {
          50: "#f3fce8",
          100: "#e4f8c8",
          200: "#c9f094",
          300: "#a7e256",
          400: "#8ed42e",
          500: "#72b81a", // verde lima / pasto principal
          600: "#589112",
          700: "#436e12",
          800: "#385714",
          900: "#324a15",
        },
        ink: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          400: "#525252",
          700: "#262626",
          900: "#141414", // negro de marca
          950: "#0a0a0a",
        },
        cream: {
          50: "#fffdf7",
          100: "#fdf6d8", // amarillo/crema principal (fondo de marca)
          200: "#f7ecb8",
        },
        naranja: {
          400: "#ee8f52",
          500: "#e8804a", // naranja principal del logo
          600: "#c1591f",
        },
        violeta: {
          100: "#efe7fb",
          300: "#d9c8f2",
          400: "#c9b6e8", // violeta del logo ("TRAMB")
          500: "#a98bd6",
          600: "#8a67ba",
        },
        acento: {
          500: "#e8402c", // rojo de acento
          600: "#c92f1d",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        blob: "40% 60% 55% 45% / 45% 40% 60% 55%",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(20, 20, 20, 0.15)",
        "soft-lg": "0 20px 45px -15px rgba(20, 20, 20, 0.25)",
        glow: "0 0 0 4px rgba(114, 184, 26, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.92) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pop-in": "pop-in 0.35s ease-out",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
