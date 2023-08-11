import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// https://cn.vitejs.dev/config/server-options.html#server-hmr
export default defineConfig({
  server: {
    host: true
  },
  plugins:[
    vue()
  ]
})
