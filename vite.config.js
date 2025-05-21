import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/PortifolioReact/', // ⚠️ Use o nome CERTO do repositório!
  plugins: [react()],
});