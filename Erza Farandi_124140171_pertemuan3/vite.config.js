import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Konfigurasi Vite + Vitest (jsdom untuk RTL)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    css: false,
  },
});
