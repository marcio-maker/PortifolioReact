import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/PortifolioReact/', // Changed to match repository name
  plugins: [react()],
});