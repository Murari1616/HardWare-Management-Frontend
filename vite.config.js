import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // this is required to make it work on network
    port: 5173, // optional, use default or change if needed
    strictPort: true, // optional, fail if port is in use
    allowedHosts: ['.ngrok-free.app'],
  },
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
