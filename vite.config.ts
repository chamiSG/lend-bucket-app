import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react(), vercel()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VITE_API_HOST || 'http://95.216.84.201:8000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api'),
  //     },
  //   },
  // },
})
