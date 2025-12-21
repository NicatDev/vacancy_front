import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.octopus.com.az",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
});
