import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/v1/api": {
        target: "http://localhost:3300",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/api/, ""),
      },
    },
  },
});
