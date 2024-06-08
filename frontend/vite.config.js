import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/auth': 'https://auth-crud-weld.vercel.app',
    },
  },
  plugins: [react()],
});
