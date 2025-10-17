import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Remove invalid esbuild.minify, use build.minify instead.
  server: {
    host: "::",
    allowedHosts: [
      "981ba238e65a.ngrok-free.app",
      "cesshp-ip-151-84-208-157.tunnelmole.net",
      "localhost",
    ],
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: "esbuild",
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": [
            "react",
            "react-dom",
            "react-router-dom"
          ],
          "mui-vendor": [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled"
          ],
          "animation-vendor": ["gsap"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (disable in production if not needed)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Target modern browsers for better optimization
    target: "es2015",
    // Asset inline limit (smaller assets will be inlined as base64)
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@mui/material",
      "gsap"
    ],
    exclude: [],
  },
});
