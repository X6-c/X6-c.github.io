import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    // 确保资源被正确处理
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // 分离chunk
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'marked-vendor': ['marked'],
          'highlight-vendor': ['highlight.js']
        }
      }
    }
  }
})
