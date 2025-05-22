import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use exatamente o mesmo nome do seu repositório GitHub
export default defineConfig({
  base: '/PortfolioReact/', // Ou '/PortifolioReact/' se for o nome correto
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
