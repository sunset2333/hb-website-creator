import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  publicDir: 'huoban',
  server: { port: 3000 },
  resolve: {
    alias: {
      '@huoban/page-client-toolkit': path.resolve(__dirname, './mock/page-client-toolkit.jsx')
    }
  }
});
