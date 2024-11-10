import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy all requests starting with "/api" to the backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,  // Ensures the Origin header is set to the target URL
        secure: false,       // Set to true if using HTTPS
        //rewrite: (path) => path.replace(/^\/api/, '') // Optional: removes "/api" prefix
      },
    },
  },
  
})
