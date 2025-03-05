import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // host: '0.0.0.0', // Thêm dòng này để cho phép truy cập từ bên ngoài
    port: 3002,
    proxy: {
      "/api": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      'c325-58-186-47-166.ngrok-free.app', // Host cụ thể của Ngrok
      '.ngrok-free.app'                    // Tất cả subdomains của ngrok-free.app
    ]
  },
});