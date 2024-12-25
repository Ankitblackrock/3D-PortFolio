import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Ensure relative paths for assets during build
  build: {
    // Disable file watching when running a build (as you mentioned in your code)
    watch: null,

    // Customize the file name and location for static assets
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]", // Images and other assets go into the 'assets' folder with a hash
        chunkFileNames: "assets/[name].[hash].js", // Ensure JS files are also properly hashed
        entryFileNames: "assets/[name].[hash].js", // Ensure the main JS entry file is also hashed
      },
    },
  },
});
