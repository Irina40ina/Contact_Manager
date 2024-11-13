import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    t
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  
  test: {
    globals: true,  // позволяет использовать глобальные функции like `describe`, `it`, etc.
    environment: 'node',  // для тестов в Node.js, можно использовать и 'jsdom' для браузера
    coverage: {
      provider: 'c8',  // для покрытия тестами
    },
    setupFiles: './src/setupTests.ts'  // если нужно, указывайте свой файл настроек
  },
})
