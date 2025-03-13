import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Aumenta o limite para 1000 KB
    rollupOptions: {
      external: ["react-syntax-highlighter/dist/esm/styles/prism"], // Adiciona aqui
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["lodash", "moment"],
        },
      },
    },
  },
});