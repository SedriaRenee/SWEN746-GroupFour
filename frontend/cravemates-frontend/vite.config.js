import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Adjust to your Django server's URL
        changeOrigin: true, // Ensures the host header is updated
        secure: false, // Disable SSL verification for local development
      },
    },
  },
})