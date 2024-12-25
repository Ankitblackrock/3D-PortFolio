// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        watch: null, // Set to null to disable file watching
    },
});
