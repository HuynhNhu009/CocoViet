import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Cần import path

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
