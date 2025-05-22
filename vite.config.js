import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/PortfolioReact/', // Corrigido para manter consistência (com "o")
  plugins: [react()],
});
