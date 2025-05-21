import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
<<<<<<< HEAD
  base: '/PortfolioReact/', // Corrigido para "PortfolioReact"
=======
  base: './PortifolioReact/', // ⚠️ Use o nome CERTO do repositório!
>>>>>>> 349bd7784a46f33ce453c36c551bb2092a3ff5be
  plugins: [react()],
});