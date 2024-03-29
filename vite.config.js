import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [  // 配置所需要的插件列表
    vue()
  ],  
  base: './',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    open: true,  // 自动打开默认浏览器
    proxy:{}    // 代理服务器
  }
})
