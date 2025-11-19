import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    hmr: false, // Отключаем HMR для мобильных устройств
    allowedHosts: [
      '.trycloudflare.com',
      '192.168.110.97',
      'localhost',
      '0.0.0.0'
    ],
    cors: true
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'windows': [
            './src/components/windows/AboutWindow',
            './src/components/windows/ProjectsWindow',
            './src/components/windows/ContactFormWindow',
            './src/components/windows/GamesWindow',
            './src/components/windows/SearchWindow',
            './src/components/windows/RecycleBinWindow',
          ],
          'games': [
            './src/components/windows/MinesweeperGame',
            './src/components/windows/SnakeGame',
          ],
          'settings': [
            './src/components/settings/SettingsWindow',
            './src/components/settings/DisplaySettingsContent',
            './src/components/settings/SoundsSettingsContent',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
